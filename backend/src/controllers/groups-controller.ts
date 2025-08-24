import statusCodes from 'http-status-codes';
import * as groupsService from "../services/groups-service.js";
import {Request, Response} from 'express';
import {GroupsSchema, IdGroupsSchema} from "../schemas/groups-schema.js";
import * as z from "zod"
import {errorHandler} from "../utils/error-handler.js";


export const getAllGroups = (req: Request, res: Response) => {
    const groups = groupsService.getAllGroups();

    res
        .status(statusCodes.OK)
        .json(groups);
}

export const addGroup = (req: Request, res: Response) => {
    try {
        const {name} = GroupsSchema.parse(req.body);

        if (groupsService.groupAlreadyExists(name)) {
            return res
                .status(statusCodes.CONFLICT)
                .json({error: "Group name already exists."});
        }

        groupsService.addGroup(name)

        res
            .status(statusCodes.CREATED)
            .json({name: name});
    } catch (error) {
        errorHandler(error, res);
    }
}

export const renameGroup = (req: Request, res: Response) => {
    try {
        const {name} = GroupsSchema.parse(req.body);
        const {id} = IdGroupsSchema.parse(req.params);


        if (groupsService.groupAlreadyExists(name)) {
            return res
                .status(statusCodes.CONFLICT)
                .json({error: "Group name already exists."});
        }

        groupsService.renameGroup(name, id);

        res.sendStatus(statusCodes.NO_CONTENT);
    } catch (error) {
        errorHandler(error, res);
    }
}

export const deleteGroup = (req: Request, res: Response) => {
    const errorMsg = "Cannot delete group. Group is referenced to URLs";

    try {
        const {id} = IdGroupsSchema.parse(req.params);

        groupsService.deleteGroup(id);

        res.sendStatus(statusCodes.NO_CONTENT);
    } catch (error) {
        errorHandler(error, res, errorMsg);
    }
}