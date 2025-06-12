import * as urlsService from "../services/urls-service.js";
import statusCodes from "http-status-codes";
import {validate} from "../utils/validator.js";

export const getAllUrls = (req, res) => {
    const data = urlsService.getAllUrls();

    res
        .status(statusCodes.OK)
        .json(data);
}

export const addUrl = (req, res) => {
    const { shortUrl, longUrl, groupId } = req.body;

    validate(res, {shortUrl, longUrl}, "string");
    validate(res, { groupId }, "number")

    // if (typeof shortUrl !== "string" || shortUrl.trim() === "") {
    //     res
    //         .status(statusCodes.BAD_REQUEST)
    //         .json({error: "Missing field shortUrl. Field has to be of type string."});
    // } else if(typeof longUrl !== "string" || longUrl.trim() === "") {
    //     res
    //         .status(statusCodes.BAD_REQUEST)
    //         .json({error: "Missing field longUrl. Field has to be of type string."});
    // } else if (isNaN(groupId)) {
    //     res
    //         .status(statusCodes.BAD_REQUEST)
    //         .json({error: "Missing field groupId. Field has to be of type int."});
    // }

    urlsService.addUrl(shortUrl, longUrl, groupId);

    res
        .status(statusCodes.CREATED)
        .json({shortUrl: shortUrl, longUrl: longUrl, groupId: groupId});
}

export const updateUrl = (req, res) => {
    const { shortUrl, longUrl, groupId } = req.body;
    const { id } = req.params;

    validate(res, {shortUrl, longUrl}, "string");
    validate(res, {groupId, id}, "number");

    urlsService.updateUrl(shortUrl, longUrl, groupId, id);

    res.status(statusCodes.NO_CONTENT);
}

export const deleteUrl = (req, res) => {
    const { id } = req.params;

    validate(res, {id}, "number");

    urlsService.deleteUrl(id);

    res.status(statusCodes.NO_CONTENT);
}