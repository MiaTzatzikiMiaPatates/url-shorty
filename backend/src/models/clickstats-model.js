import db from "../config/db.js";

const tableName = "clickstats";

export const getAllClickStats = () => {
    return db.prepare(`SELECT * FROM ${tableName}`).all();
}

export const incrementClickStats = (id) => {

}

