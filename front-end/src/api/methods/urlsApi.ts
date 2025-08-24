import { URLS } from "../endpoints.js";
import * as requests from "../requests.js";
import {Url} from "../../models/url";
import {UrlsGroupCount} from "../../models/urls-group-count";

export const getUrlsCountPerGroup = async (): Promise<UrlsGroupCount[]> => {
    return await requests.getRequest(`${URLS}/groups-count`);
}

export const getAllUrls = async (): Promise<Url[]> => {
    return await requests.getRequest(`${URLS}`);
}

export const editUrl = async (id: number, data: Url) => {
    return await requests.putRequest(`${URLS}/${id}`, data)
}

export const deleteUrl = async (id: number) => {
    return await requests.deleteRequest(`${URLS}/${id}`);
}

export const addUrl = async (data: Url) => {
    return await requests.postRequest(`${URLS}`, data);
}