import { Command } from "commander";
import { prompt } from "enquirer";
import { terminal } from "terminal-kit";
import fs from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";
import getCompiledCode from "../../shared/getCompiledCode";
import readPackage from "../../shared/readPackage";
import runInContext from "../../shared/runInContext";
import { getApiKey, getBaseUrl, getEnvName } from "@runlightyear/lightyear";

export const trigger = new Command("t");

interface TriggerPreferences {
  lastAction?: string;
  lastManagedUser?: string;
  triggerForAllManagedUsers?: boolean;
}

const PREFS_FILE = path.join(process.cwd(), ".lightyear", "trigger-preferences.json");

function loadPreferences(): TriggerPreferences {
  try {
    if (fs.existsSync(PREFS_FILE)) {
      return JSON.parse(fs.readFileSync(PREFS_FILE, "utf-8"));
    }
  } catch (error) {
    console.debug("Failed to load preferences:", error);
  }
  return {};
}

function savePreferences(prefs: TriggerPreferences) {
  try {
    const dir = path.dirname(PREFS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(PREFS_FILE, JSON.stringify(prefs, null, 2));
  } catch (error) {
    console.debug("Failed to save preferences:", error);
  }
}

async function getManagedUsers(): Promise<Array<{ id: string; name: string }>> {
  const baseUrl = getBaseUrl();
  const envName = getEnvName();
  const apiKey = getApiKey();
  
  try {
    const response = await fetch(
      `${baseUrl}/api/v1/envs/${envName}/managed-users`,
      {
        headers: {
          Authorization: `apiKey ${apiKey}`,
        },
      }
    );
    
    if (!response.ok) {
      console.debug("Failed to fetch managed users:", response.status);
      return [];
    }
    
    const data = await response.json();
    return data.managedUsers || [];
  } catch (error) {
    console.debug("Error fetching managed users:", error);
    return [];
  }
}

async function triggerAction(actionName: string, managedUserId?: string): Promise<{ runId: string; success: boolean }> {
  const baseUrl = getBaseUrl();
  const envName = getEnvName();
  const apiKey = getApiKey();
  
  try {
    // Create a new run
    const runId = crypto.randomUUID();
    
    // First, create the run
    const createResponse = await fetch(
      `${baseUrl}/api/v1/envs/${envName}/runs`,
      {
        method: "POST",
        headers: {
          Authorization: `apiKey ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: runId,
          actionName,
          managedUserId,
          status: "PENDING",
        }),
      }
    );
    
    if (!createResponse.ok) {
      console.error(`Failed to create run: ${createResponse.status} ${createResponse.statusText}`);
      const errorText = await createResponse.text();
      console.debug("Error response:", errorText);
      return { runId, success: false };
    }
    
    // Then trigger the run
    const triggerResponse = await fetch(
      `${baseUrl}/api/v1/envs/${envName}/runs/${runId}/trigger`,
      {
        method: "POST",
        headers: {
          Authorization: `apiKey ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          actionName,
          data: managedUserId ? { managedUserId } : {},
        }),
      }
    );
    
    if (!triggerResponse.ok) {
      console.error(`Failed to trigger run: ${triggerResponse.status} ${triggerResponse.statusText}`);
      const errorText = await triggerResponse.text();
      console.debug("Error response:", errorText);
      return { runId, success: false };
    }
    
    return { runId, success: true };
  } catch (error) {
    console.error("Error triggering action:", error);
    return { runId: "", success: false };
  }
}

trigger
  .description("Trigger an action interactively")
  .action(async () => {
    const pkg = readPackage();
    const compiledCode = getCompiledCode(pkg.main);
    
    let getDeployList;
    try {
      const runInContextResult = runInContext(compiledCode);
      getDeployList = runInContextResult.getDeployList;
    } catch (error) {
      terminal.red("Failed to load compiled code: ");
      terminal(`${error}\n`);
      return;
    }
    
    if (!getDeployList) {
      terminal.red("No deploy list found. Please build your project first.\n");
      return;
    }
    
    const deployList = getDeployList();
    const actions = deployList
      .filter((item: any) => item.type === "action")
      .map((item: any) => item.actionProps?.name)
      .filter(Boolean);
    
    if (actions.length === 0) {
      terminal.yellow("No actions found in your project.\n");
      return;
    }
    
    // Load preferences
    const prefs = loadPreferences();
    
    // Select action
    const actionChoices = actions.map((action: string) => ({
      name: action,
      message: action === prefs.lastAction ? `${action} (last triggered)` : action,
      hint: action === prefs.lastAction ? "↵ to select" : undefined,
    }));
    
    const { selectedAction } = await prompt<{ selectedAction: string }>({
      type: "select",
      name: "selectedAction",
      message: "Select an action to trigger:",
      choices: actionChoices,
      initial: prefs.lastAction ? actions.indexOf(prefs.lastAction) : 0,
    });
    
    // Check for managed users
    const managedUsers = await getManagedUsers();
    let managedUserId: string | undefined;
    let triggerForAllManagedUsers = false;
    
    if (managedUsers.length > 0) {
      // Ask if triggering for all or specific managed user
      const { managedUserChoice } = await prompt<{ managedUserChoice: string }>({
        type: "select",
        name: "managedUserChoice",
        message: "Trigger for:",
        choices: [
          { name: "all", message: "All managed users" },
          { name: "specific", message: "Specific managed user" },
        ],
        initial: prefs.triggerForAllManagedUsers ? 0 : 1,
      });
      
      if (managedUserChoice === "all") {
        triggerForAllManagedUsers = true;
      } else {
        // Select specific managed user
        const userChoices = managedUsers.map((user) => ({
          name: user.id,
          message: user.id === prefs.lastManagedUser 
            ? `${user.name} (${user.id}) (last triggered)` 
            : `${user.name} (${user.id})`,
        }));
        
        const { selectedUser } = await prompt<{ selectedUser: string }>({
          type: "select",
          name: "selectedUser",
          message: "Select a managed user:",
          choices: userChoices,
          initial: prefs.lastManagedUser 
            ? managedUsers.findIndex(u => u.id === prefs.lastManagedUser) 
            : 0,
        });
        
        managedUserId = selectedUser;
      }
    }
    
    // Save preferences
    savePreferences({
      lastAction: selectedAction,
      lastManagedUser: managedUserId,
      triggerForAllManagedUsers,
    });
    
    // Trigger the action
    terminal.cyan(`\nTriggering action: ${selectedAction}\n`);
    
    if (triggerForAllManagedUsers && managedUsers.length > 0) {
      terminal(`Triggering for all ${managedUsers.length} managed users...\n\n`);
      
      let successCount = 0;
      let failureCount = 0;
      
      for (const user of managedUsers) {
        terminal.gray(`Triggering for ${user.name} (${user.id})...\n`);
        
        const { runId, success } = await triggerAction(selectedAction, user.id);
        
        if (success) {
          terminal.green(`✓ Triggered successfully for ${user.name} (Run ID: ${runId})\n\n`);
          successCount++;
        } else {
          terminal.red(`✗ Failed to trigger for ${user.name}\n\n`);
          failureCount++;
        }
      }
      
      terminal.cyan(`\nSummary:\n`);
      terminal.green(`✓ Successful: ${successCount}\n`);
      if (failureCount > 0) {
        terminal.red(`✗ Failed: ${failureCount}\n`);
      }
      terminal(`\nAction trigger completed for all managed users\n`);
    } else {
      const { runId, success } = await triggerAction(selectedAction, managedUserId);
      
      if (success) {
        terminal.green(`\n✓ Action triggered successfully (Run ID: ${runId})\n`);
      } else {
        terminal.red(`\n✗ Failed to trigger action\n`);
      }
    }
  });