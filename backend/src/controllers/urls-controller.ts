import * as urlsService from "../services/urls-service.js";
import statusCodes from "http-status-codes";
import {generateShortUrl} from "../utils/generate-url.js";
import {Request, Response} from 'express';
import {BaseUrlSchema, IdUrlSchema} from "../schemas/urls-schema.js";
import {errorHandler} from "../utils/error-handler.js";


export const getAllUrls = (req: Request, res: Response) => {
    try {
        const data = urlsService.getAllUrls();

        res
            .status(statusCodes.OK)
            .json(data);
    } catch (error) {
        errorHandler(error, res);
    }
}

export const addUrl = (req: Request, res: Response) => {
    try {
        let {shortUrl, longUrl, groupId} = BaseUrlSchema.parse(req.body);

        if (shortUrl.trim() === "") {
            shortUrl = generateShortUrl();
        } else {
            if (urlsService.shortUrlExists(shortUrl)) {
                return res
                    .status(statusCodes.CONFLICT)
                    .json({error: "Short URL already exists."});
            }
        }

        urlsService.addUrl(shortUrl, longUrl, groupId);

        res
            .status(statusCodes.CREATED)
            .json({shortUrl: shortUrl});

    } catch (error) {
        errorHandler(error, res);
    }
}

export const updateUrl = (req: Request, res: Response) => {
    try {
        const {shortUrl, longUrl, groupId} = BaseUrlSchema.parse(req.body);
        const {id} = IdUrlSchema.parse(req.params);

        if (urlsService.shortUrlExistsById(id, shortUrl)) {
            return res
                .status(statusCodes.CONFLICT)
                .json({error: "Short URL already exists."});
        }

        urlsService.updateUrl(shortUrl, longUrl, groupId, id);

        res.sendStatus(statusCodes.NO_CONTENT);
    } catch (error) {
        errorHandler(error, res);
    }
}

export const deleteUrl = (req: Request<{ id: number }>, res: Response) => {
    try {
        const {id} = IdUrlSchema.parse(req.params);

        urlsService.deleteUrl(id);

        res.sendStatus(statusCodes.NO_CONTENT);
    } catch (error) {
        errorHandler(error, res);
    }
}

export const getCountUrlsPerGroup = (req: Request, res: Response) => {
    try {
        const data = urlsService.getCountUrlsPerGroup();

        res
            .status(statusCodes.OK)
            .json(data);
    } catch (error) {
        errorHandler(error, res)
    }
}