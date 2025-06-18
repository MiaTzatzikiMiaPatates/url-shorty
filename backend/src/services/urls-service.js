import * as urlsModel from "../models/urls-model.js"
import * as clickStatsModel from "../models/clickstats-model.js";

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
    clickStatsModel.deleteClickStats(id);

    return urlsModel.deleteUrl(id);
}

export const getCountUrlsPerGroup = () => {
    return urlsModel.getCountUrlsPerGroup();
}

export const shortUrlExists = (name) => {
    return urlsModel.shortUrlExists(name);
}