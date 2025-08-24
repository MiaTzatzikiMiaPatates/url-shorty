import Database from "better-sqlite3"

let db: Database.Database;

const createUrlsTable = `
    CREATE TABLE IF NOT EXISTS Urls (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        longUrl TEXT,
        shortUrl TEXT UNIQUE,
        groupId INTEGER,
        FOREIGN KEY (groupId) REFERENCES Groups(id)
    );
`

const createGroupsTable = `
    CREATE TABLE IF NOT EXISTS Groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
    );
`

const createClickStatsTable = `
    CREATE TABLE IF NOT EXISTS ClickStats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        clicks INTEGER DEFAULT 0,
        urlId INTEGER,
        FOREIGN KEY (urlId) REFERENCES Urls(id)
    );
`

try {
    db = new Database('src/db/data.sqlite');
    db.prepare(createUrlsTable).run();
    db.prepare(createGroupsTable).run();
    db.prepare(createClickStatsTable).run();
} catch (e) {
    console.error("Error while initializing config!", e);
    throw e;
}

export default db;