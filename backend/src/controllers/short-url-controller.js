import {shortUrlExists} from "../services/urls-service.js";
import {getUrlByName} from "../services/urls-service.js";
import statusCodes from "http-status-codes";
import {incrementClickStats} from "../services/clickstats-service.js";


export const redirectShortUrl = (req, res) => {
    const {shortUrl} = req.params;

    if (shortUrlExists(shortUrl)) {
        const {id, longUrl} = getUrlByName(shortUrl);

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
}