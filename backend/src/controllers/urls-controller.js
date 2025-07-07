import * as urlsService from "../services/urls-service.js";
import statusCodes from "http-status-codes";
import {validateRequest, validateShortUrl} from "../utils/validator.js";
import { generateShortUrl } from "../utils/generate-url.js";

export const getAllUrls = (req, res) => {
    const data = urlsService.getAllUrls();

    res
        .status(statusCodes.OK)
        .json(data);
}

export const addUrl = (req, res) => {
    let { shortUrl, longUrl, groupId } = req.body;

    if (validateRequest(res, { longUrl }, "string") || validateRequest(res, { groupId }, "number") || validateShortUrl(res, shortUrl)) {
        return;
    }

    if (shortUrl.trim() === "") {
        shortUrl = generateShortUrl();
    } else {
        if (urlsService.shortUrlExists(shortUrl)) {
            return res
                .status(statusCodes.CONFLICT)
                .json({error: "Short URL already exists."});
        } else {
            urlsService.shortUrlExists(shortUrl);
        }
    }

    urlsService.addUrl(shortUrl, longUrl, groupId);

    res
        .status(statusCodes.CREATED)
        .json({shortUrl: shortUrl});
}

export const updateUrl = (req, res) => {
    const { shortUrl, longUrl, groupId } = req.body;
    const { id } = req.params;

    if (validateRequest(res, { shortUrl, longUrl }, "string") || validateRequest(res, { groupId, id }, "number") || validateShortUrl(res, shortUrl)) {
        return;
    }

    urlsService.updateUrl(shortUrl, longUrl, groupId, id);

    res.sendStatus(statusCodes.NO_CONTENT);
}

export const deleteUrl = (req, res) => {
    const {id} = req.params;

    if (validateRequest(res, {id}, "number")) {
        return;
    }

    urlsService.deleteUrl(id);

    res.sendStatus(statusCodes.NO_CONTENT);
}

export const getCountUrlsPerGroup = (req, res) => {
    const data = urlsService.getCountUrlsPerGroup();

    res
        .status(statusCodes.OK)
        .json(data);
}