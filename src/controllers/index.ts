import { Request, Response } from "express";

const index = (req: Request, res: Response) =>
    res.status(200).send({
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

export { index };
