import { Request, Response } from "express";

import { api, url } from "../api/config";

const price = (req: Request, res: Response) =>
    res.status(200).send({
        endpoints: {
            ticker: {
                method: "GET",
                params: "symbol",
                example: "symbol=BTCUSDT",
            },
        },
    });

const priceTicker = async (req: Request, res: Response) => {
    try {
        const { symbol } = req.query;

        const { data } = await api.get(
            symbol
                ? `${url.API_APIV3}/ticker/price?symbol=${symbol}`
                : `${url.API_APIV3}/ticker/price`,
        );

        return res.json({ data }).status(200);
    } catch (error) {
        return res.status(400).json({
            error: error.message || error,
        });
    }
};

export { price, priceTicker };
