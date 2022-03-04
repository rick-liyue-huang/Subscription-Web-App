import express from "express";
import JWT from "jsonwebtoken";



export const checkAuth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

	console.log('middleware here');
	let token = req.header(('Authorization'));

	if (!token) {
		return res.status(403).json({
			errors: [
				{msg: 'un authorization'}
			]
		})
	}

	token = token.split(' ')[1];

	try {
		const user = await JWT.verify(token,
			process.env.JWT_SECRET as string
		) as {email: string}
		// by define the types/express/index.d.ts
		req.user = user.email;
		next();
	} catch (error) {
		return res.status(403).json({
			errors: [
				{msg: 'un authorization'}
			]
		})
	}
	res.send(token);
}
