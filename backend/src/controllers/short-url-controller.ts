import * as urlsService from "../services/urls-service.js";
import statusCodes from "http-status-codes";
import {incrementClickStats} from "../services/clickstats-service.js";
import {Request, Response} from 'express';
import {ShortUrlSchema} from "../schemas/short-url-schema.js";
import {errorHandler} from "../utils/error-handler.js";


export const redirectShortUrl = (req: Request<{ shortUrl: string }>, res: Response) => {
    try {
        const {shortUrl} = ShortUrlSchema.parse(req.params);

        if (urlsService.shortUrlExists(shortUrl)) {
            const {id, longUrl} = urlsService.getUrlByName(shortUrl) as { id: number, longUrl: string };

            if (!longUrl) {
                res
                    .status(statusCodes.NOT_FOUND)
                    .json({error: `Couldn't find URL associated to ${shortUrl}.`});
            }

            incrementClickStats(id);

            res
                .status(statusCodes.PERMANENT_REDIRECT)
                .redirect(longUrl);
        } else {
            res
                .status(statusCodes.NOT_FOUND)
                .json({error: "Short URL doesn't exist."});
        }
    } catch (error) {
        errorHandler(error, res);
    }
}