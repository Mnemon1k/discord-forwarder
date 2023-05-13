import runServer from './server.js';
import Discord from './discord.js';
import Database from './db.js';

const isProduction = process.env.NODE_ENV !== 'dev';

if (isProduction) {
	runServer();
}

const db = new Database(process.env.DB_URI);
new Discord(db);

/*
db.getServers();
*/
