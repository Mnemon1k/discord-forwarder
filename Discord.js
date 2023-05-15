import { Client, SnowflakeUtil } from 'discord.js-selfbot-v13';
import delay from './helpers/delay.js';

export default class Discord {
	constructor(db, sender) {
		this.db = db;
		this.sender = sender;
		this.client = new Client({ checkUpdate: false });

		this.client.on('ready', async () => {
			console.log(`${this.client.user.username} - connected`);

			await this.db.connect();
			await this.init();
		});

		this.client.login(process.env.DS_TOKEN);
	}

	async init() {
		await this.sendNewMessagesToTg();

		// set cron for sendNewMessagesToTg
	}

	async getNewMessages() {
		await this.client.guilds.fetch();
		const serversArr = await this.db.getServers();
		const allNewMessages = {};

		for (const server of serversArr) {
			const guild = this.client.guilds.cache.get(server.serverId);
			const channel = await guild.channels.fetch(server.channelId);

			const currentDateObj = server.lastPostTimestamp;
			const numberOfMlSeconds = currentDateObj.getTime();
			const addMlSeconds = 60 * 60 * 1000;
			const newDateObj = new Date(numberOfMlSeconds - (addMlSeconds * 45));

			const newMessages = await channel.messages.fetch({
				after: SnowflakeUtil.generate(newDateObj.getTime()),
			});

			// console.log(newDateObj);
			// console.log(newMessages);
			allNewMessages[server.channelId] = newMessages;

			await delay(1000);
		}

		return { messages: allNewMessages, servers: serversArr };
	}

	async sendNewMessagesToTg() {
		const { messages, servers } = await this.getNewMessages();
		await this.db.updateTimestampInDb();
		await this.sender.sendNewMessages(messages, servers);
	}

	async logNewServersNewsChannels() {
		const guilds = await this.client.guilds.fetch();
		const serversMap = await this.db.getServers();

		// get guild that is not in database
		for (const id of guilds.keys()) {
			if (serversMap.has(id)) continue;

			// const guildData = await guilds.get(id).fetch();
			const guild = this.client.guilds.cache.get(id);
			const channels = await guild.channels.fetch();

			console.log(`${guild.name} - ${guild.id}`);

			for (const [, thread] of channels) {
				if (thread.name.includes('announcement') || thread.name.includes('news')) console.log(`${thread.name} : ${thread.id}`);
			}

			console.log('');
			console.log('');

			delay(2000);
		}
	}
}

