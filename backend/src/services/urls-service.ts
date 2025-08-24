import * as urlsModel from "../models/urls-model.js"
import * as clickStatsModel from "../models/clickstats-model.js";
import * as clickStatsService from "./clickstats-service.js";

export const getAllUrls = () => {
    return urlsModel.getAllUrls();
}

export const addUrl = (shortUrl: string, longUrl: string, groupId: number) => {
    const urlId = urlsModel.addUrl(shortUrl, longUrl, groupId) as number;

    return clickStatsModel.createClickStats(urlId);
}

export const updateUrl = (shortUrl: string, longUrl: string, groupId: number, id: number) => {
    return urlsModel.updateUrl(shortUrl, longUrl, groupId, id);
}

export const deleteUrl = (id: number) => {
    clickStatsService.deleteClickStats(id);

    return urlsModel.deleteUrl(id);
}

export const getCountUrlsPerGroup = () => {
    return urlsModel.getCountUrlsPerGroup();
}

export const shortUrlExists = (name: string): boolean => {
    return Object.values(urlsModel.shortUrlExists(name) as Record<string, number>)[0] === 1;
}

export const shortUrlExistsById = (id: number, name: string) => {
    return Object.values(urlsModel.shortUrlExistsById(id, name) as Record<string, number>)[0] === 1;
}

export const getUrlByName = (name: string) => {
    return urlsModel.getUrlByName(name);
}