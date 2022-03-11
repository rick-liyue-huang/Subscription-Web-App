
import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import authRouter from './routes/auth';

// let server recognise .env variables
dotenv.config();

mongoose.connect(process.env.MONGODB_URL as string)
	.then(() => {
		console.log('Connected to MongoDB');


		const app = express();
		const PORT = process.env.PORT;

		// let req.body can recognize the json format
		app.use(express.json());

		// auth router
		app.use('/auth', authRouter);
		app.listen(PORT, () => {
			console.log(`this server is running on port of ${PORT}`);
		});

	})
	.catch(err => {
		console.log(err);
		throw new Error(err)
	})



