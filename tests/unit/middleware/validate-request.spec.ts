import { credentials } from "../../../src/middleware/validate-request";

describe("credentials", () => {
    it("should return of apiKey and apiSecret is undefined", () => {
        expect(credentials({})).toStrictEqual({
            apiKey: undefined,
            apiSecret: undefined,
        });
    });

    it("should return of apiKey is correct and apiSecret is undefined", () => {
        expect(credentials({ "api-key": "valid_api_key" })).toStrictEqual({
            apiKey: "valid_api_key",
            apiSecret: undefined,
        });
    });

    it("should return of apiKey is undefined and apiSecret is correct", () => {
        expect(credentials({ "api-secret": "valid_api_secret" })).toStrictEqual(
            {
                apiKey: undefined,
                apiSecret: "valid_api_secret",
            },
        );
    });

    it("should return of apiKey and apiSecret is correct", () => {
        expect(
            credentials({
                "api-key": "valid_api_key",
                "api-secret": "valid_api_secret",
            }),
        ).toStrictEqual({
            apiKey: "valid_api_key",
            apiSecret: "valid_api_secret",
        });
    });
});
