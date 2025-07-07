import statusCodes from "http-status-codes";
import {MAX_SHORT_URL_LENGTH} from "../config/config.js";

export const validateRequest = (res, fields, type) => {
    for (const [key, value] of Object.entries(fields)) {
        if (type === "string") {
            if (typeof value !== "string" || value.trim() === "") {
                res.status(statusCodes.BAD_REQUEST)
                    .json({ error: `Missing or empty field '${key}'. Must be a non-empty string.` });
                return true;
            }
        } else if (type === "number") {
            if (isNaN(value)) {
                res.status(statusCodes.BAD_REQUEST)
                    .json({ error: `Field '${key}' must be a valid number.` });
                return true;
            }
        }
    }
    return false;
}

export const validateShortUrl = (res, name) => {
    if (name.length > MAX_SHORT_URL_LENGTH) {
        res
            .status(statusCodes.REQUEST_URI_TOO_LONG)
            .json({error: `Short URL length can't exceed ${MAX_SHORT_URL_LENGTH}.`});
        return true;
    }
}