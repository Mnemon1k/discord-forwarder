import mongoose from 'mongoose';
import Server from './models/serverModel.js';
import arrayToMap from './helpers/arrayToMap.js';

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
			console.log('we are connected');
		});
	}

	async getServers() {
		const servers = await Server.find({}, {
			__v: false,
			_id: false,
		});
		const serversMap = arrayToMap(servers, 'serverId');

		return serversMap;
	}
}
