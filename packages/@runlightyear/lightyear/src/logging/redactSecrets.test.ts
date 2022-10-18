import redactSecrets from "./redactSecrets";

describe("redactSecrets", () => {
  test("redacts a single secret", () => {
    const secrets = ["d8pKoKshNEUeBmbJbq7v45PqKVofI2Lz"];
    const text = "Authorization: Bearer d8pKoKshNEUeBmbJbq7v45PqKVofI2Lz";

    expect(redactSecrets(secrets, text)).toEqual(
      "Authorization: Bearer *****2Lz"
    );
  });

  test("redacts multiple secrets", () => {
    const secrets = [
      "d8pKoKshNEUeBmbJbq7v45PqKVofI2Lz",
      "RGad4SDHQ2KqaaUofkyIWX3RcVMKw0yj",
      '7#8\\\'2y=uIC_]X^i""b-~WBpkV50leg2T#Gig?3@Y`%3L_;koPBu~1@N).LQiYG3',
    ];
    const text = `Authorization: Bearer d8pKoKshNEUeBmbJbq7v45PqKVofI2Lz
Authorization: Bearer RGad4SDHQ2KqaaUofkyIWX3RcVMKw0yj
Authorization: Bearer 7#8\\'2y=uIC_]X^i""b-~WBpkV50leg2T#Gig?3@Y\`%3L_;koPBu~1@N).LQiYG3`;

    expect(redactSecrets(secrets, text)).toEqual(
      `Authorization: Bearer *****2Lz
Authorization: Bearer *****0yj
Authorization: Bearer *****YG3`
    );
  });

  test("handles null", () => {
    const secrets = [null];
    const text = "Authorization: Bearer d8pKoKshNEUeBmbJbq7v45PqKVofI2Lz";

    expect(redactSecrets(secrets, text)).toEqual(
      "Authorization: Bearer d8pKoKshNEUeBmbJbq7v45PqKVofI2Lz"
    );
  });
});
