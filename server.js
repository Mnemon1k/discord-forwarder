import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

export default function runServer() {
	const app = express();

	app.listen(PORT, () => {
		console.log(`application listening on port: ${PORT}`);
	});
}
