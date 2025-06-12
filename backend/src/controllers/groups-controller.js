import statusCodes from "http-status-codes";
import * as groupsService from "../services/groups-service.js";
import { validate } from "../utils/validator.js";

export const getAllGroups = (req, res) => {
    const groups = groupsService.getAllGroups();

    res
        .status(statusCodes.OK)
        .json(groups);
}


export const addGroup = (req, res) => {
    const { name }  = req.body;

    validate(res, {name}, "string");
    // if (typeof name !== "string" || name === "") {
    //     res
    //         .status(statusCodes.BAD_REQUEST)
    //         .json({error: "Missing required field: name"});
    // }

    groupsService.addGroup(name)

    res
        .status(statusCodes.CREATED)
        .json({name: name});
}


export const renameGroup = (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    validate(res, { name }, "string");
    validate(res, { id }, "number");

    // if (typeof name !== "string" || name === "") {
    //     res
    //         .status(statusCodes.BAD_REQUEST)
    //         .json({error: "Missing required field: name"});
    // } else if (isNaN(id)) {
    //     res
    //         .status(statusCodes.BAD_REQUEST)
    //         .json({error: "Parameter id should be of type int"});
    // }

    groupsService.renameGroup(name, id);

    res.status(statusCodes.NO_CONTENT);
}


export const deleteGroup = (req, res) => {
    const { id } = req.params;

    validate(res, { id }, "number");
    // if (isNaN(id)) {
    //     res
    //         .status(statusCodes.BAD_REQUEST)
    //         .json({error: "Parameter id should be of type int"});
    // }

    groupsService.deleteGroup(id);

    res.status(statusCodes.NO_CONTENT);
}