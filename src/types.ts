export type Credentials = {
    apiKey: string;
    apiSecret: string;
};

export type ErrorResponse = {
    type: string;
    title: string;
    status: number;
    detail: string;
};
