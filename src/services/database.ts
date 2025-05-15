import * as SQLite from "expo-sqlite";


const db = SQLite.openDatabaseSync("old.db");


export const createTable = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS albums (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      collectionId INTEGER UNIQUE,       
      collectionName TEXT,               
      artistName TEXT,                   
      artworkUrl100 TEXT                   
    );
  `);
};


export const getTableColumns = async () => {
  try {
    const result = await db.getAllAsync("PRAGMA table_info(albums);");
    const columns = result.map((col: any) => col.name); 
    return columns;
  } catch (error) {
    console.error("Error fetching table columns:", error);
  }
};


export const saveAlbums = async (albums: any[]) => {
  for (const album of albums) {

    const collectionId = album.collectionId ?? album.trackId ?? null; 
    const collectionName = (album.collectionName ?? album.trackName ?? "").replace(/'/g, "''");
    const artistName = (album.artistName ?? "").replace(/'/g, "''");
    const artworkUrl100 = (album.artworkUrl100 ?? "").replace(/'/g, "''");

    if (!collectionId || !collectionName || !artistName || !artworkUrl100) {
      console.warn("Skipping invalid album due to missing essential data:", album);
      continue;
    }

    const insertQuery = `
      INSERT OR REPLACE INTO albums (collectionId, collectionName, artistName, artworkUrl100)
      VALUES (${collectionId}, '${collectionName}', '${artistName}', '${artworkUrl100}');
    `;

    try {
      await db.execAsync(insertQuery);
    } catch (error) {
      console.error("Error inserting album:", album, error);
    }
  }
};

export const getAlbums = async () => {
  try {
    const albums = await db.getAllAsync("SELECT * FROM albums;");
    console.log("Retrieved albums:", albums);
    return albums;
  } catch (error) {
    console.error("Error fetching albums:", error);
  }
};
