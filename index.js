import dotenv from 'dotenv';
import runServer from './server.js';
import Discord from './Discord.js';
import Database from './Database.js';
import TelegramBot from './TelegramBot.js';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
	console.log('Production ENV');
	runServer();
}

const db = new Database(process.env.DB_URI);
const sender = new TelegramBot(process.env.BOT_TOKEN, process.env.TG_CHANNEL_ID);

new Discord(process.env.DS_TOKEN, db, sender);
