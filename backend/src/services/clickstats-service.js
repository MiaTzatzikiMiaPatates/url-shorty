import * as clickStatsModel from "../models/clickstats-model.js"


export const getClickStats = () => {
    return clickStatsModel.getAllClickStats();
}

export const incrementClickStats = (id) => {
    return clickStatsModel.incrementClickStats(id);
}