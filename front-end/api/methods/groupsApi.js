import { GROUPS } from "../endpoints.js";
import * as requests from "../requests.js";


export const getAllGroups = async () => {
    return await requests.getRequest(GROUPS);
}

export const deleteGroup = async (id) => {
    return await requests.deleteRequest(`${GROUPS}/${id}`);
}

export const renameGroup = async (name, id) => {
    return await requests.putRequest(`${GROUPS}/${id}`, {name});
}

export const addGroup = async (name) => {
    return await requests.postRequest(`${GROUPS}`, {name});
}