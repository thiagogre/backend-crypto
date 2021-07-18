import * as crypto from "crypto";
import querystring from "querystring";
import { NextFunction, Request, Response } from "express";

import { Credentials } from "../types";
import { api } from "../api/config";
import { error } from "../utils/error";

export const credentials = (headers: any): Credentials => {
    const { "api-secret": apiSecret, "api-key": apiKey } = headers;
    return { apiSecret, apiKey };
};

export const validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { apiSecret, apiKey } = credentials(req.headers);

    api.defaults.headers["X-MBX-APIKEY"] = apiKey;

    if (apiSecret && apiKey) {
        const query = querystring.stringify({
            ...req.query,
            timestamp: Date.now(),
        });

        const signature: string = crypto
            .createHmac("sha256", apiSecret)
            .update(query)
            .digest("hex");

        req.queryTotalParams = query + `&signature=${signature}`;
        req.apiKey = String(apiKey);

        next();
    } else {
        res.status(401).json(
            error(
                "Unauthorized",
                401,
                "Invalid credentials(API-key and/or API-secret)",
            ),
        );
    }
};
