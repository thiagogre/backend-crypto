import app from "../../src/app";
import request from "supertest";
import dotenv from "dotenv";

dotenv.config();

describe("app", () => {
    it("should response return 200", async () => {
        const response = await request(app).get("/").set({});
        expect(response.body).toStrictEqual({
            title: "Dashboard Crypto API",
            version: "0.0.1",
            endpoints: {
                coins: {
                    all: {
                        method: "GET",
                        params: "type",
                        example: "type=SPOT",
                    },
                },
                price: {
                    ticker: {
                        method: "GET",
                        params: "symbol",
                        example: "symbol=BTCUSDT",
                    },
                },
            },
        });
        expect(response.status).toBe(200);
    });

    it("should response return 200 if credentials is valid", async () => {
        const response = await request(app).get("/price").set({
            "api-key": process.env.API_KEY,
            "api-secret": process.env.API_SECRET,
        });
        expect(response.body.endpoints.ticker.method).toBe("GET");
        expect(response.status).toBe(200);
    });
    it("should response return 200 if credentials dont exists", async () => {
        const response = await request(app).get("/price").set({});
        expect(response.body.endpoints.ticker.method).toBe("GET");
        expect(response.status).toBe(200);
    });
    it("should response return 200 even if not api-secret exist", async () => {
        const response = await request(app).get("/price/ticker").set({});
        expect(response.status).toBe(200);
    });

    it("should response return 400 if 'type' query dont exists or invalid", async () => {
        const response = await request(app).get("/coins/all").set({
            "api-key": process.env.API_KEY,
            "api-secret": process.env.API_SECRET,
        });
        expect(response.body.error).toBe(
            "Request param 'type' wrong, should be 'SPOT'",
        );
        expect(response.status).toBe(400);
    });
    it("should response return 200", async () => {
        const response = await request(app).get("/coins/all?type=SPOT").set({
            "api-key": process.env.API_KEY,
            "api-secret": process.env.API_SECRET,
        });
        expect(response.status).toBe(200);
    });
    it("should response return 401 if api-secret dont exist", async () => {
        const response = await request(app).get("/coins/all?type=SPOT").set({
            "api-key": process.env.API_KEY,
            "api-secret": "",
        });
        expect(response.body).toStrictEqual({
            type: "https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html",
            title: "Unauthorized",
            status: 401,
            detail: "Invalid credentials(API-key and/or API-secret)",
        });
        expect(response.status).toBe(401);
    });
    it("should response return 401 if api-key dont exist", async () => {
        const response = await request(app).get("/coins/all?type=SPOT").set({
            "api-key": "",
            "api-secret": process.env.API_SECRET,
        });
        expect(response.body).toStrictEqual({
            type: "https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html",
            title: "Unauthorized",
            status: 401,
            detail: "Invalid credentials(API-key and/or API-secret)",
        });
        expect(response.status).toBe(401);
    });
});
