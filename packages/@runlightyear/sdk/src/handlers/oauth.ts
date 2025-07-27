import type { InternalResponse } from "./types";
import { OAuthConnector } from "../connectors/OAuthConnector";

export interface HandleGetAuthRequestUrlProps {
  customAppName: string;
  authName: string;
  // These would typically come from a registry/global index
  oauthConfigData?: any;
  authData?: any;
  oauthConnector?: OAuthConnector;
}

export interface HandleRequestAccessTokenProps {
  customAppName: string;
  authName: string;
  code: string;
  // These would typically come from a registry/global index
  oauthConfigData?: any;
  authData?: any;
  oauthConnector?: OAuthConnector;
}

export interface HandleRefreshAccessTokenProps {
  customAppName: string;
  authName: string;
  // These would typically come from a registry/global index
  oauthConfigData?: any;
  authData?: any;
  oauthConnector?: OAuthConnector;
}

/**
 * Handle getting OAuth authorization request URL
 */
export async function handleGetAuthRequestUrl(
  props: HandleGetAuthRequestUrlProps
): Promise<InternalResponse> {
  console.debug("Getting auth request url");

  const { customAppName, authName, oauthConfigData, authData, oauthConnector } =
    props;

  if (!customAppName) {
    return {
      success: false,
      error: "Missing customAppName",
      logs: ["[ERROR] Missing customAppName"],
    };
  }

  if (!authName) {
    return {
      success: false,
      error: "Missing authName",
      logs: ["[ERROR] Missing authName"],
    };
  }

  try {
    // In a real implementation, this would come from a global registry
    // For now, we'll expect it to be passed in
    if (!oauthConnector) {
      return {
        success: false,
        error: "No OAuth connector configured for this custom app",
        logs: ["[ERROR] No OAuth connector configured"],
      };
    }

    if (!oauthConfigData) {
      return {
        success: false,
        error: "Missing OAuth config data",
        logs: ["[ERROR] Missing OAuth config data"],
      };
    }

    if (!authData) {
      return {
        success: false,
        error: "Missing auth data",
        logs: ["[ERROR] Missing auth data"],
      };
    }

    const connector = oauthConnector;

    console.debug("connector", connector);

    const authRequestUrl = connector.getAuthRequestUrl();

    return {
      success: true,
      data: { authRequestUrl },
      logs: ["[INFO] Generated auth request URL successfully"],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Failed to get auth request url", errorMessage);
    return {
      success: false,
      error: errorMessage,
      logs: [`[ERROR] Failed to get auth request url: ${errorMessage}`],
    };
  }
}

/**
 * Handle OAuth access token request (code exchange)
 */
export async function handleRequestAccessToken(
  props: HandleRequestAccessTokenProps
): Promise<InternalResponse> {
  console.debug("Requesting access token");

  const {
    customAppName,
    authName,
    code,
    oauthConfigData,
    authData,
    oauthConnector,
  } = props;

  if (!customAppName) {
    return {
      success: false,
      error: "Missing customAppName",
      logs: ["[ERROR] Missing customAppName"],
    };
  }

  if (!authName) {
    return {
      success: false,
      error: "Missing authName",
      logs: ["[ERROR] Missing authName"],
    };
  }

  if (!code) {
    return {
      success: false,
      error: "Missing code",
      logs: ["[ERROR] Missing code"],
    };
  }

  try {
    if (!oauthConnector) {
      return {
        success: false,
        error: "No OAuth connector configured for this custom app",
        logs: ["[ERROR] No OAuth connector configured"],
      };
    }

    if (!oauthConfigData) {
      return {
        success: false,
        error: "Missing OAuth config data",
        logs: ["[ERROR] Missing OAuth config data"],
      };
    }

    if (!authData) {
      return {
        success: false,
        error: "Missing auth data",
        logs: ["[ERROR] Missing auth data"],
      };
    }

    const connector = oauthConnector;

    const newAuthData = await connector.requestAccessToken(code);

    console.info("Requested access token successfully");

    return {
      success: true,
      data: { authData: newAuthData },
      logs: ["[INFO] Requested access token successfully"],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Failed to request access token", errorMessage);
    return {
      success: false,
      error: errorMessage,
      logs: [`[ERROR] Failed to request access token: ${errorMessage}`],
    };
  }
}

/**
 * Handle OAuth access token refresh
 */
export async function handleRefreshAccessToken(
  props: HandleRefreshAccessTokenProps
): Promise<InternalResponse> {
  console.debug("Refreshing access token");

  const { customAppName, authName, oauthConfigData, authData, oauthConnector } =
    props;

  if (!customAppName) {
    return {
      success: false,
      error: "Missing customAppName",
      logs: ["[ERROR] Missing customAppName"],
    };
  }

  if (!authName) {
    return {
      success: false,
      error: "Missing authName",
      logs: ["[ERROR] Missing authName"],
    };
  }

  try {
    if (!oauthConnector) {
      return {
        success: false,
        error: "No OAuth connector configured for this custom app",
        logs: ["[ERROR] No OAuth connector configured"],
      };
    }

    if (!oauthConfigData) {
      return {
        success: false,
        error: "Missing OAuth config data",
        logs: ["[ERROR] Missing OAuth config data"],
      };
    }

    if (!authData) {
      return {
        success: false,
        error: "Missing auth data",
        logs: ["[ERROR] Missing auth data"],
      };
    }

    const connector = oauthConnector;

    const newAuthData = await connector.refreshAccessToken();

    console.info("Refreshed access token");

    return {
      success: true,
      data: { authData: newAuthData },
      logs: ["[INFO] Refreshed access token successfully"],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Failed to refresh access token", errorMessage);
    return {
      success: false,
      error: errorMessage,
      logs: [`[ERROR] Failed to refresh access token: ${errorMessage}`],
    };
  }
}
