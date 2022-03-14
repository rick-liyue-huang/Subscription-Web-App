
import {NextFunction, Request, Response} from "express";
import JWT from "jsonwebtoken";

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {

	// const token = req.headers['authorization'];
	let token = req.header('authorization');

	if (!token) {
		return res.status(403).json({
			errors: [
				{msg: 'unauthorized'}
			],
			data: null
		})
	}

	token = token.split(' ')[1];

	console.log(token);

	try {
		const user = await JWT.verify(
			token,
			process.env.ACCESS_JWT_SECRET as string
		) as {email: string};
		req.user = user.email;

		next();
	} catch (err) {
		return res.status(403).json({
			errors: [
				{msg: 'unauthorized'}
			],
			data: null
		})
	}

}
