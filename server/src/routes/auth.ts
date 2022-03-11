
import express, {Request, Response} from 'express';
import {body, validationResult} from "express-validator";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import UserModel from '../models/User';


const router = express.Router();

router.post(
	'/signup',
	body('email').isEmail().withMessage('The email format is wrong'),
	body('password').matches(/\d/).withMessage('need contain number').isLength({min: 6}).withMessage('need 6 characters at least'),
	async (req: Request, res: Response
) => {

	// 1. create user info through request body input
	const {email, password} = req.body;

	// 2. validate email and password
	const validationErrors = validationResult(req);

	if (!validationErrors.isEmpty()) {
		const errors = validationErrors.array().map(error => {
			return {
				msg: error.msg
			}
		});

		return res.status(404).json({errors, data: null});
	}

	// 3. check if email is not already used
	const user = await UserModel.findOne({email});
	if (user) {
		// return the array format as express-validator
		return res.status(400).json({
			errors: [
				{
					msg: `the user ${user.email} existed already`
				}
			],
			data: null
		})
	}

	// 4. hash password
	const hashedPassword = bcrypt.hashSync(password, 10);

	// after check the user is no exist, it will create the new user
	const newUser = await UserModel.create({
		email,
		password: hashedPassword
	});

	// 5. add the token on the created user, and send back to client
	const token = JWT.sign({
			email: newUser.email
		}, process.env.JWT_SECRET as string, {
		expiresIn: '3d'
	});

	res.status(200).json({
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

router.post('/signin', async (req: Request, res: Response) => {
	const {email, password} = req.body;

	// 1. get the user from database
	const user = await UserModel.findOne({email});
	if (!user) {
		return res.status(400).json({
			errors: [
				{msg: `${email} isn't existed.`}
			],
			data: null
		})
	}

// 2.	compare the password
	const isMatched = await bcrypt.compare(password, user.password);

	if (!isMatched) {
		return res.status(400).json({
			errors: [
				{msg: `password is wrong.`}
			],
			data: null
		})
	}

	const token = JWT.sign({
		email: user.email
	}, process.env.JWT_SECRET as string, {
		expiresIn: '3d'
	});

	res.status(200).json({
		errors: [],
		data: {
			token,
			user: {
				id: user._id,
				email: user.email
			}
		}
	});

});


export default router;
