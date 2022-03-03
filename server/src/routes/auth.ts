import express from 'express';
import { body, validationResult } from 'express-validator';
import User from "../models/user";
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'

const router = express.Router();

router.post('/signup',
	// the middleware to validate the email format and password length
	body('email').isEmail().withMessage('the email is invalidate format'),
	body('password').isLength({min: 6}).withMessage('the password need min 6 characters'),
	async (req: express.Request, res: express.Response) => {

	const validationErrors = validationResult(req);

	if (!validationErrors.isEmpty()) {
		const errors = validationErrors.array().map((error) => {
			return {
				msg: error.msg,
			};
		});

		return res.json({ errors, data: null });
	}
	//
	const {email, password} = req.body;

	// confirm the email is existed or not
	const user = await User.findOne({ email })

	if (user) {
		return res.json({
			errors: [
				{
					msg: 'the user is existed already, cannot signup again'
				}
			],
			data: null
		})
	}

	//	hash password
	const hashPassword = await bcrypt.hash(password, 10);

	const newUser = await User.create({
		email,
		password: hashPassword
	});

	// after signup, the server will create the token and return to the client
	const token = JWT.sign(
		{email: newUser.email},
		process.env.JWT_SECRET as string,
		{
			expiresIn: 360000
		}
	);

	res.json({
		errors: [],
		data: {
			token,
			user: {
				id: newUser._id,
				email: newUser.email
			}
		}
	});
});

router.post('/signin', async (req: express.Request, res: express.Response) => {
	const {email, password} = req.body;

	const user = await User.findOne({email});

	if (!user) {
		return res.json({
			errors: [
				{
					msg: 'invalid user to login'
				}
			],
			data: null
		});
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		return res.json({
			errors: [
				{
					msg: 'password is not matched'
				}
			],
			data: null
		});
	}

//	 after login the server will create the token and return to the client
	const token = JWT.sign(
		{email: user.email},
		process.env.JWT_SECRET as string,
		{
			expiresIn: 360000
		}
	);

	res.json({
		errors: [],
		data: {
			token,
			user: {
				id: user._id,
				email: user.email
			}
		}
	})
});

export default router;
