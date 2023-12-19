import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const serverSchema = new Schema({
	serverId: String,
	serverName: String,
	channelId: String,
	tgChannelId: String,
	lastPostTimestamp: {
		type: Date,
		default: () => Date.now(),
	},
});

const Server = model('Server', serverSchema);

export default Server;
