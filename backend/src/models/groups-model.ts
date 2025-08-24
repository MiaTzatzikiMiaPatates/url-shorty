import db from "../config/db.js"

const tableName = "groups";

export const getAllGroups = () => {
  return db.prepare(`SELECT * FROM ${tableName}`).all();
};

export const addGroup = (category: string) => {
    return db.prepare(`INSERT INTO ${tableName} (name) VALUES (?)`).run(category);
}

export const renameGroup = (newName: string, id: number) => {
    return db.prepare(`UPDATE ${tableName} SET name = ? WHERE id = ?`).run(newName, id);
}

export const deleteGroup = (id: number) => {
    return db.prepare(`DELETE FROM ${tableName} WHERE id = ?`).run(id);
}

export const groupAlreadyExists = (name: string) => {
    return db.prepare(`SELECT EXISTS (SELECT * FROM ${tableName} WHERE LOWER(name) = LOWER(?))`).get(name);
}