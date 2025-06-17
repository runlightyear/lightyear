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
import runAction from "../../shared/runAction";
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
      
      for (const user of managedUsers) {
        terminal.gray(`Triggering for ${user.name} (${user.id})...\n`);
        
        const runId = crypto.randomUUID();
        await runAction({
          actionName: selectedAction,
          runId,
          data: {
            managedUserId: user.id,
          },
        });
        
        terminal.green(`✓ Completed for ${user.name}\n\n`);
      }
      
      terminal.green(`\n✓ Action triggered for all managed users\n`);
    } else {
      const runId = crypto.randomUUID();
      const data = managedUserId ? { managedUserId } : undefined;
      
      await runAction({
        actionName: selectedAction,
        runId,
        data,
      });
      
      terminal.green(`\n✓ Action triggered successfully\n`);
    }
  });