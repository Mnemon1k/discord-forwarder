import { Telegram } from 'telegraf';
import arrayToMap from './helpers/arrayToMap.js';

export default class TelegramBot {
	constructor(botToken, channel) {
		this.channel = channel;
		this.tg = new Telegram(botToken);
		this.msgOptions = {
			parse_mode: 'Markdown',
		};
	}

	async sendNewMessages(messagesByChannelId, servers) {
		const serversMap = arrayToMap(servers, 'channelId');

		console.log(messagesByChannelId);

		servers.forEach(({ channelId, serverId, serverName }) => {
			const messages = messagesByChannelId[channelId];
			if (messages.size === 0) return;

			for (const [, { content }] of messages) {
				const text = `[${serverName}](https://discord.com/channels/${serverId}/${channelId}) \n\n ${content}`;

				this.tg.sendMessage(this.channel, text, this.msgOptions);
			}
		});
	}
}
