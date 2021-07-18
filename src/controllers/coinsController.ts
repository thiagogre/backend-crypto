import { Request, Response } from "express";

import { api, url } from "../api/config";

const coins = (req: Request, res: Response) =>
    res.status(200).send({
        endpoints: {
            all: {
                method: "GET",
                params: "type",
                example: "type=SPOT",
            },
        },
    });

const coinsAll = async (req: Request, res: Response) => {
    try {
        const { queryTotalParams } = req;

        if (queryTotalParams.includes("type=SPOT")) {
            const { data: coinsAll } = await api.get(
                `${url.API_SAPI}/accountSnapshot?${queryTotalParams}`,
            );
            const { data: prices } = await api.get(
                `${url.API_APIV3}/ticker/price`,
            );

            const isFiat = (asset: string): boolean => {
                return [
                    "BRL",
                    "BIDR",
                    "BVND",
                    "DAI",
                    "IDRT",
                    "NGN",
                    "RUB",
                    "TRY",
                    "UAH",
                ].includes(asset);
            };

            const totalAssetOfUSD = (coinPairPrice: any) => {
                return coinPairPrice.reduce(
                    (accumulator: number, pair: any) =>
                        accumulator + pair.value,
                    0,
                );
            };

            const coinPairPrices = (balances: any) => {
                return balances
                    .filter((coin: any) => coin.free > 0 && coin)
                    .map((coin: any) => {
                        const obj = coin.asset.includes("USD")
                            ? { price: "1" }
                            : prices.find(
                                  (pairPrice: any) =>
                                      coin.free > 0 &&
                                      pairPrice.symbol.includes(
                                          `${coin.asset}`,
                                      ) &&
                                      pairPrice.symbol.includes("USD"),
                              );
                        return {
                            asset: coin.asset,
                            price: parseFloat(obj.price),
                            free: parseFloat(coin.free),
                            value: isFiat(coin.asset)
                                ? coin.free / obj.price
                                : obj.price * coin.free,
                            locked: parseFloat(coin.locked),
                        };
                    });
            };

            const getCoinsPrice = (coinsAll: any): any => {
                const arrPerDay = coinsAll.snapshotVos;
                const coins = arrPerDay[arrPerDay.length - 1];
                const balances = coins.data.balances;

                const coinPairPrice = coinPairPrices(balances);
                const totalAssetUSD = totalAssetOfUSD(coinPairPrice);

                return {
                    totalAssetUSD,
                    coinPrices: coinPairPrice,
                };
            };

            const coinsData = getCoinsPrice(coinsAll);

            return res.json({ prices: coinsData }).status(200);
        } else {
            return res.status(400).json({
                error: "Request param 'type' wrong, should be 'SPOT'",
            });
        }
    } catch (error) {
        return res.status(400).json({
            error: error.message || error,
        });
    }
};

export { coins, coinsAll };
