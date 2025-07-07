import * as urlsModel from "../models/urls-model.js"
import * as clickStatsModel from "../models/clickstats-model.js";
import * as clickStatsService from "./clickstats-service.js";

export const getAllUrls = () => {
    return urlsModel.getAllUrls();
}

export const addUrl = (shortUrl, longUrl, groupId) => {
    const urlId = urlsModel.addUrl(shortUrl, longUrl, groupId);

    return clickStatsModel.createClickStats(urlId);
}

export const updateUrl = (shortUrl, longUrl, groupId, id) => {
    return urlsModel.updateUrl(shortUrl, longUrl, groupId, id);
}

export const deleteUrl = (id) => {
    clickStatsService.deleteClickStats(id);

    return urlsModel.deleteUrl(id);
}

export const getCountUrlsPerGroup = () => {
    return urlsModel.getCountUrlsPerGroup();
}

export const shortUrlExists = (name) => {
    return Object.values(urlsModel.shortUrlExists(name))[0] === 1;
}

export const getUrlByName = (name) => {
    return urlsModel.getUrlByName(name);
}