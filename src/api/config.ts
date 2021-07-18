import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.binance.com",
});

export const url = {
    API_SAPI: "/sapi/v1",
    API_APIV3: "/api/v3",
};
