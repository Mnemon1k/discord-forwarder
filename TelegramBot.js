import { Telegram } from 'telegraf';
import arrayToMap from './helpers/arrayToMap.js';

export default class TelegramBot {
	constructor(botToken, channel) {
		this.channel = channel;
		this.tg = new Telegram(botToken);
		this.msgOptions = {
			parse_mode: 'html',
		};
	}

	async sendNewMessages(messagesByChannelId, servers) {
		const serversMap = arrayToMap(servers, 'channelId');

		servers.forEach(({ channelId, serverId, serverName }) => {
			const messages = messagesByChannelId[channelId];
			if (messages.size === 0) return;

			for (const [, { content }] of messages) {
				const text = `<b>New Discord post in <a href="https://discord.com/channels/${serverId}/${channelId}">${serverName}</a></b> \n\n ${content}`;

				this.tg.sendMessage(this.channel, text, this.msgOptions);
			}
		});
	}
}
