import db from "../config/db.js";

const tableName = "urls";

export const getAllUrls = () => {
    return db.prepare(`SELECT * FROM ${tableName}`).all();
}

export const addUrl = (shortUrl: string, longUrl: string, groupId: number) => {
    return db.prepare(`INSERT INTO ${tableName} (shortUrl, longUrl, groupId) VALUES (?, ?, ?)`).run(shortUrl, longUrl, groupId).lastInsertRowid;
}

export const updateUrl = (shortUrl: string, longUrl: string, groupId: number, id: number) => {
    return db.prepare(`UPDATE ${tableName} SET shortUrl = ?, longUrl = ?, groupId = ? WHERE id = ?`).run(shortUrl, longUrl, groupId, id);
}

export const deleteUrl = (id: number) => {
    return db.prepare(`DELETE FROM ${tableName} WHERE id = ?`).run(id);
}

export const getCountUrlsPerGroup = () => {
    return db.prepare(`SELECT groupId, COUNT(*) AS urlCount FROM ${tableName} GROUP BY groupId`).all();
}

export const shortUrlExists = (name: string) => {
    return db.prepare(`SELECT EXISTS (SELECT * FROM ${tableName} WHERE shortUrl = ?)`).get(name);
}

export const shortUrlExistsById = (id: number, name: string) => {
    return db.prepare(`SELECT EXISTS (SELECT * FROM ${tableName} WHERE id = ? and shortUrl = ?)`).get(id, name);
}

export const getUrlByName = (name: string)=> {
    return db.prepare(`SELECT id, longUrl FROM ${tableName} WHERE shortUrl = ?`).get(name);
}