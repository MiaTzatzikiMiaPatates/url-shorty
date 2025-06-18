import statusCodes from "http-status-codes";
import * as groupsService from "../services/groups-service.js";
import { validateRequest } from "../utils/validator.js";

export const getAllGroups = (req, res) => {
    const groups = groupsService.getAllGroups();

    res
        .status(statusCodes.OK)
        .json(groups);
}


export const addGroup = (req, res) => {
    const { name }  = req.body;

    if (validateRequest(res, { name }, "string")) {
        return;
    }

    for (const value of Object.values(groupsService.getAllGroups())) {
        if (value.name === name) {
            return res
                .status(statusCodes.CONFLICT)
                .json({ error: "Group name already exists." });
        }
    }

    groupsService.addGroup(name)

    res
        .status(statusCodes.CREATED)
        .json({name: name});
}


export const renameGroup = (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    if (validateRequest(res, { name }, "string") || validateRequest(res, { id }, "number")) {
        return;
    }
    for (const value of Object.values(groupsService.getAllGroups())) {
        if (value.name === name) {
            return res
                .status(statusCodes.CONFLICT)
                .json({ error: "Group name already exists." });
        }
    }

    groupsService.renameGroup(name, id);

    res.sendStatus(statusCodes.NO_CONTENT);
}


export const deleteGroup = (req, res) => {
    const { id } = req.params;

    if (validateRequest(res, { id }, "number")) {
        return;
    }

    try {
        groupsService.deleteGroup(id);
    } catch (SqliteError) {
        return res
            .status(statusCodes.CONFLICT)
            .json({error: "Cannot delete group. Group is referenced to URLs"});
    }

    res.sendStatus(statusCodes.NO_CONTENT);
}