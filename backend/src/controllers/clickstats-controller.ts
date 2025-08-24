import * as clickStatsService from "../services/clickstats-service.js";
import statusCodes from "http-status-codes";
import {Request, Response} from 'express';
import {ClickstatsSchema} from "../schemas/clickstats-schema.js";
import {errorHandler} from "../utils/error-handler.js";


export const getClickStats = (req: Request, res: Response) => {
    const clickStats = clickStatsService.getClickStats();

    res
        .status(statusCodes.OK)
        .json(clickStats);
}

export const incrementClickStats = (req: Request, res: Response) => {
    try {
        const {id} = ClickstatsSchema.parse(req.params);

        clickStatsService.incrementClickStats(Number(id));

        res.sendStatus(statusCodes.NO_CONTENT);
    } catch (error) {
        errorHandler(error, res);
    }
}