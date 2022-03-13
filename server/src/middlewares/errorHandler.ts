import {NextFunction, Request, Response} from "express";
import {logEvents} from "./logEvents";


const errorHandler = async (err: any , req: Request, res: Response, next: NextFunction) => {
	await logEvents(`${err.name} -- ${err.message}`, 'error.txt')
	console.error(err.stack);
	await res.status(500).send(err.message);
	next();
}

export default errorHandler
