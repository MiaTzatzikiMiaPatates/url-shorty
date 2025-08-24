import * as clickStatsModel from "../models/clickstats-model.js"


export const getClickStats = () => {
    return clickStatsModel.getAllClickStats();
}

export const incrementClickStats = (id: number) => {
    return clickStatsModel.incrementClickStats(id);
}

export const deleteClickStats = (id: number) => {
    return clickStatsModel.deleteClickStats(id);
}