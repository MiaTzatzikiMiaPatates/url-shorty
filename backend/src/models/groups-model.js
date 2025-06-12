import db from "../config/db.js"

const tableName = "groups";

export const getAllGroups = () => {
  return db.prepare(`SELECT * FROM ${tableName}`).all();
};

export const addGroup = (category) => {
    return db.prepare(`INSERT INTO ${tableName} (name) VALUES (?)`).run(category);
}

export const renameGroup = (newName, id) => {
    return db.prepare(`UPDATE ${tableName} SET name = ? WHERE id = ?`).run(newName, id);
}

export const deleteGroup = (id) => {
    return db.prepare(`DELETE FROM ${tableName} WHERE id = ?`).run(id);
}