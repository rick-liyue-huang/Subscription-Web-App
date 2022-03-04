import express from 'express';
import authRouters from "./routes/auth";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

mongoose.connect(
	process.env.MONGO_URI as string
)
	.then(() => {
		console.log('connected to mongodb');

		const app = express();
		const PORT = 8080;
		// need the  format
		app.use(express.json());
		// solve the problems of blocked by CORS policy
		app.use(cors());
		app.use('/auth', authRouters);

		app.listen(PORT, () => {
			console.log(`Server is listening on port ${PORT}`)
		});
	})
	.catch(err => {
		console.log(err)
		throw new Error(err)
	})





