import * as urlsModel from "../models/urls-model.js"

export const getAllUrls = () => {
    return urlsModel.getAllUrls();
}

export const addUrl = (shortUrl, longUrl, groupId) => {
    return urlsModel.addUrl(shortUrl, longUrl, groupId);
}

export const updateUrl = (shortUrl, longUrl, groupId, id) => {
    return urlsModel.updateUrl(shortUrl, longUrl, groupId, id);
}

export const deleteUrl = (id) => {
    return urlsModel.deleteUrl(id);
}