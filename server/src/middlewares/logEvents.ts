
import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import {v4 as uuid} from 'uuid';
import {NextFunction, Request, Response} from "express";

const fsPromise = fs.promises;


export const logEvents = async (message: string, logName: string) => {

	const dateTime = `${dayjs(new Date(), "dd-MM-YYYY")}`;
	const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

	try {
		if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
			await fsPromise.mkdir(path.join(__dirname, '..', 'logs'));
		}

		await fsPromise.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);

	} catch (err) {
		console.error(err);
	}

}

export const logger = async (req: Request, res: Response, next: NextFunction) => {
	await logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
	next();
}


