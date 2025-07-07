import {MAX_SHORT_URL_LENGTH} from "../config/config.js";

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';


export const generateShortUrl = () => {
    let result = "";

    for (let i = 0; i < MAX_SHORT_URL_LENGTH; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
}