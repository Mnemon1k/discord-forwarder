import { Telegram } from 'telegraf';
import delay from './helpers/delay.js';

export default class TelegramBot {
	constructor(botToken, channel) {
		this.channel = channel;
		this.tg = new Telegram(botToken);
		this.msgOptions = {
			parse_mode: 'html',
		};
	}

	async sendNewMessages(messagesByChannelId, servers) {
		for (const { channelId, serverId, serverName, tgChannelId } of servers) {
			const messages = messagesByChannelId[channelId];
			const channel = tgChannelId || this.channel;

			if (messages.size === 0) continue;

			if (channel.split('/').length === 2) {
				// eslint-disable-next-line prefer-destructuring
				this.msgOptions.reply_to_message_id = channel.split('/')[1];
			}

			for (const [, { content, author, attachments }] of messages) {
				let text = `#${author.username} \n\n ${content}`;
				text = text.replace(/<@&(\d+)>/g, '#user');
				text = text.replace(/<@(\d+)>/g, '#user');
				text = text.replace(/<:(\d+):\d+>/g, '');
				text = text.replace(/<:([^:>]+):(\d+)>/g, '');
				text = text.replace(/<([^:>]+):([^:>]+):(\d+)>/g, '');

				try {
					await this.tg.sendMessage(channel.split('/')[0], text, this.msgOptions);
				} catch (e) {
					console.log(e);
				}
				await delay(2000);

				if (attachments.size && attachments?.size) {
					for (const photo of attachments.values()) {
						console.log(photo);
						if (photo.contentType.includes('image')) {
							try {
								await this.tg.sendPhoto(channel.split('/')[0], photo.url, this.msgOptions);
							} catch (e) {
								console.log(e);
							}

							await delay(2000);
						}
					}
				}
			}
		}
	}
}

