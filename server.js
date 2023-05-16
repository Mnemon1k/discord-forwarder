import express from 'express';

const PORT = process.env.PORT || 3000;

export default function runServer() {
	const app = express();

	app.listen(PORT, () => {
		console.log(`Server listening on port: ${PORT}`);
	});
}
