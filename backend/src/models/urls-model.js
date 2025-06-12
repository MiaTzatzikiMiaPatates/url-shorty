import db from "../config/db.js";

const tableName = "urls";

export const getAllUrls = () => {
    return db.prepare(`SELECT * FORM ${tableName}`).all();
}

export const addUrl = (shortUrl, longUrl, groupId) => {
    return db.prepare(`INSERT INTO ${tableName} (shortUrl, longUrl, groupId) VALUES (? ? ?)`).run(shortUrl, longUrl, groupId);
}

export const updateUrl = (shortUrl, longUrl, groupId, id) => {
    return db.prepare(`UPDATE ${tableName} SET shortUrl = ?, longUrl = ?, groupId = ?, id = ?`).run(longUrl, shortUrl, groupId, id);
}

export const deleteUrl = (id) => {
    return db.prepare(`DELETE FROM ${tableName} WHERE id = ?`).run(id);
}