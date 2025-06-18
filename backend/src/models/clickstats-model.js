import db from "../config/db.js";

const tableName = "clickstats";

export const getAllClickStats = () => {
    return db.prepare(`SELECT * FROM ${tableName}`).all();
}

export const createClickStats = (urlId) => {
    return db.prepare(`INSERT INTO ${tableName} (urlId, clicks) VALUES (?, 0)`).run(urlId);
}

export const incrementClickStats = (id) => {
    return db.prepare(`UPDATE ${tableName} SET clicks = clicks + 1 WHERE urlId = ${id}`).run(); // maybe change urlId to id ?
}

export const deleteClickStats = (id) => {
    return db.prepare(`DELETE FROM ${tableName} WHERE urlId = ?`).run(id);
}