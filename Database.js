import mongoose from 'mongoose';
import Server from './models/serverModel.js';

export default class Database {
	constructor(uri) {
		this.uri = uri;
	}

	async connect() {
		try {
			await mongoose.connect(this.uri);
		} catch (error) {
			console.log(error);
		}

		this.connection = mongoose.connection;

		this.connection.once('open', () => {
			console.log('Connected to Db');
		});
	}

	async updateTimestampInDb() {
		await Server.updateMany({}, { lastPostTimestamp: new Date() });
	}

	async getServers() {
		const servers = await Server.find({}, {
			__v: false,
			_id: false,
		});

		return servers;
	}
}
