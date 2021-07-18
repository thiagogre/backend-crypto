import { ErrorResponse } from "../types";

export const error = (
    title: string,
    status: number,
    detail: string,
): ErrorResponse => {
    return {
        type: "https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html",
        title,
        status,
        detail,
    };
};
