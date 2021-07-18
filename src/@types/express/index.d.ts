declare namespace Express {
    interface Request {
        queryTotalParams: string;
        apiKey: string;
        symbol: string;
    }
}
