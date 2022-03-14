
import JWT, {JwtPayload} from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";

// @ts-ignore
interface ReqProps extends Request {
	user?: string;
}
export const verifyJWT = (req: ReqProps, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];

	if (!authHeader) {
		return res.sendStatus(401);
	}
	console.log(authHeader); // Bearer token

	const token = authHeader.split(' ')[1];
	JWT.verify(
		token,
		process.env.ACCESS_JWT_SECRET as string,
		(err, decoded) => {
			if (err) {
				return res.sendStatus(403)
			}
			req.user = (decoded as JwtPayload).user;
			next();
		}
	)
}
