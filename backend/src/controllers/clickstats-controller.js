import * as clickStatsService from "../services/clickstats-service.js";
import statusCodes from "http-status-codes";
import {validateRequest} from "../utils/validator.js";


export const getClickStats = (req, res) => {
    const clickStats = clickStatsService.getClickStats();

    res
        .status(statusCodes.OK)
        .json(clickStats);
}

export const incrementClickStats = (req, res) => {
    const { id } = req.params;

    if (validateRequest(res, { id }, "number")) {
        return;
    }

    clickStatsService.incrementClickStats(id);

    res.sendStatus(statusCodes.NO_CONTENT);
}