import { URLS } from "../endpoints.js";
import * as requests from "../requests.js";

export const getUrlsCountPerGroup = async () => {
    return await requests.getRequest(`${URLS}/groups-count`);
}

export const getAllUrls = async () => {
    return await requests.getRequest(`${URLS}`);
}

export const editUrl = async (id, data) => {
    return await requests.putRequest(`${URLS}/${id}`, data)
}

export const deleteUrl = async (id) => {
    return await requests.deleteRequest(`${URLS}/${id}`);
}

export const addUrl = async (data) => {
    return await requests.postRequest(`${URLS}`, data);
}