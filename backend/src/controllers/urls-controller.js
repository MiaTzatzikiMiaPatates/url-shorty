import * as urlsService from "../services/urls-service.js";
import statusCodes from "http-status-codes";


export const getAllUrls = (req, res) => {
    const data = urlsService.getAllUrls();

    res
        .status(statusCodes.OK)
        .json(data);
}

export const addUrl = (req, res) => {
    const { shortUrl, longUrl, groupId } = req.body;

    if (typeof shortUrl !== "string" || shortUrl.trim() === "" || longUrl !== "string") {
        res
            .status(statusCodes.BAD_REQUEST)
            .json({error: });
    }
}