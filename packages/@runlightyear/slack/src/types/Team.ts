/**
 * {
 *     "ok": true,
 *     "team": {
 *         "id": "T12345",
 *         "name": "My Team",
 *         "domain": "example",
 *         "email_domain": "example.com",
 *         "icon": {
 *             "image_34": "https://...",
 *             "image_44": "https://...",
 *             "image_68": "https://...",
 *             "image_88": "https://...",
 *             "image_102": "https://...",
 *             "image_132": "https://...",
 *             "image_default": true
 *         },
 *         "enterprise_id": "E1234A12AB",
 *         "enterprise_name": "Umbrella Corporation"
 *     }
 * }
 */

export interface Team {
  id: string;
  name: string;
  domain: string;
  emailDomain: string;
  icon: {
    image34: string;
    image44: string;
    image68: string;
    image88: string;
    image102: string;
    image132: string;
    imageDefault: boolean;
  };
  enterpriseId: string;
  enterpriseName: string;
}
