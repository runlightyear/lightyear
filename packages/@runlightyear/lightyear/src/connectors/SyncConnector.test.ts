import { SyncConnector } from "./SyncConnector";
import { ModelConnector, ModelConnectorProps } from "./ModelConnector";
import { AuthData } from "../base/auth";

// Mock classes for testing
class TestModelConnector extends ModelConnector {
  constructor(props: ModelConnectorProps) {
    super(props);
  }
}

class UserModel extends TestModelConnector {}
class ContactModel extends TestModelConnector {}
class AccountModel extends TestModelConnector {}

describe("SyncConnector", () => {
  // Mock auth data
  const mockAuth: AuthData = {
    appName: "test",
    customAppName: null,
    managedUser: { externalId: "test-user" },
    authName: "test-auth",
    username: null,
    password: null,
    apiKey: null,
    tokenType: null,
    state: null,
    codeVerifier: null,
    accessToken: "test-token",
    refreshToken: null,
    expiresAt: null,
    refreshedAt: null,
    extraData: null,
    customAppData: undefined,
  };

  describe("getModels with mixed classes and instances", () => {
    it("should support returning both ModelConnector classes and instances", () => {
      class TestSyncConnector extends SyncConnector {
        getBaseUrl(): string {
          return "https://api.example.com";
        }

        getModels() {
          // Return a mix of classes and instances
          return {
            // Class constructors
            user: UserModel,
            contact: ContactModel,

            // Already instantiated model
            account: new AccountModel({
              connector: this,
              collectionName: this.collectionName,
              modelName: "account",
            }),
          };
        }
      }

      const syncConnector = new TestSyncConnector({
        auth: mockAuth,
        collectionName: "test-collection",
      });

      const models = syncConnector.getModels();

      // Verify that we can return both classes and instances
      expect(typeof models.user).toBe("function");
      expect(models.user.prototype).toBeInstanceOf(ModelConnector);

      expect(typeof models.contact).toBe("function");
      expect(models.contact.prototype).toBeInstanceOf(ModelConnector);

      expect(models.account).toBeInstanceOf(ModelConnector);
    });

    it("should use getModelProps to instantiate model classes", () => {
      class TestSyncConnector extends SyncConnector {
        getBaseUrl(): string {
          return "https://api.example.com";
        }

        getModels() {
          return {
            user: UserModel,
          };
        }

        // Override to provide custom props
        getModelProps(modelName: string): ModelConnectorProps {
          const baseProps = super.getModelProps(modelName);

          // Add custom logic if needed
          if (modelName === "user") {
            return {
              ...baseProps,
              // Could add custom props here
            };
          }

          return baseProps;
        }
      }

      const syncConnector = new TestSyncConnector({
        auth: mockAuth,
        collectionName: "test-collection",
      });

      // Get the default props that would be used
      const userProps = syncConnector.getModelProps("user");

      expect(userProps).toEqual({
        connector: syncConnector,
        collectionName: "test-collection",
        modelName: "user",
      });
    });
  });
});
