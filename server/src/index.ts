
import express, {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import authRouter from './routes/auth';
import path from 'path';
import cors from 'cors';
import errorHandler from "./middlewares/errorHandler";
import {logger} from "./middlewares/logEvents";
import {corsOptionsDelegate} from "../config/corsConfig";

// let server recognise .env variables
dotenv.config();

mongoose.connect(process.env.MONGODB_URL as string)
	.then(() => {
		console.log('Connected to MongoDB');


		const app = express();
		const PORT = process.env.PORT;

		// let req.body can recognize the json format
		app.use(express.json());

		// solve the problem of cross-origin resource sharing
		app.use(cors(corsOptionsDelegate));


		// built-in middleware to handle urlencoded data
		// in other words, form data:
		// 'content-type: application/x-www-form-urlencoded'
		app.use(express.urlencoded({extended: false}));

		// store all the static resources in public and let app can recognize the static format
		app.use('/', express.static(path.join(__dirname, '/public')));

		// app apply the customer middleware
		app.use(logger);


		/*
		app.get('^/$|/index(.html)?', (req, res) => {
			res.sendFile(path.join(__dirname, 'views', 'index.html'));
		})
		*/

		// auth router
		app.use('/auth', authRouter);

		// through this middleware, we can send the error to front page
		app.use(errorHandler);

		app.listen(PORT, () => {
			console.log(`this server is running on port of ${PORT}`);
		});

	})
	.catch(err => {
		console.log(err);
		throw new Error(err)
	})



