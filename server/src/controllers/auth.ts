import {Request, Response} from "express";
import {validationResult} from "express-validator";
import UserModel from "../models/User";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import {v4 as uuid} from 'uuid';


export const signupController = async (req: Request, res: Response
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
}


export const signinController = async (req: Request, res: Response) => {
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

}


// here I simulate the user controllers here, and set the user info in json file

const data = {
	users: require('../models/users.json'),
	setUsers: function (data: Record<string, any>) {this.users = data}
}

const getAllUsers = async (req: Request, res: Response) => {
	try {
		await res.status(200).json(data.users)
	} catch (err) {
		res.status(400).json(err);
	}
}

const createNewUsers = async (req: Request, res: Response) => {
	const newUser = {
		id: uuid(),
		firstname: req.body.firstname,
		lastname: req.body.lastname
	};

	if (!newUser.firstname || !newUser.lastname) {
		return res.status(400).json({message: 'need firstname or lastname'})
	}

	try {
		await data.setUsers([...data.users, newUser]);
		await res.status(200).json(data.users);
	} catch (err) {
		res.status(500).json(err);
	}

}

const updateUser = async (req: Request, res: Response) => {
	const user = await data.users.find((u: Record<string, any>) => u.id === parseInt(req.body.id));

	if (!user) {
		return res.status(400).json({message: `${req.body.id} not found`})
	}

	if (req.body.firstname) user.firstname = req.body.firstname;
	if (req.body.lastname) user.lastname = req.body.lastname;

	const filteredUsers = data.users.filter((user: Record<string, any>) => user.id !== parseInt(req.body.id));
	const unsortedUsers = [...filteredUsers, user];

	try {
		await data.setUsers(unsortedUsers.sort((a, b) => a.id > b.id ? 1: a.id < b.id ? -1 : 0));
		await res.status(200).json(data.users);
	} catch (err) {
		await res.status(400).json(err);
	}
}

const deleteUser = async (req: Request, res: Response) => {
	const user = await data.users.find((u: Record<string, any>) => u.id === parseInt(req.body.id));

	if (!user) {
		return res.status(400).json({message: `user id ${req.body.id} not found`});
	}

	const filteredUsers = await data.users.filter((u: Record<string, any>) => u.id !== parseInt(req.body.id));
	await data.setUsers([...filteredUsers]);
	await res.status(200).json(data.users);

}

const getSingleUser = async (req: Request, res: Response) => {
	const user = await data.users.find((u: Record<string, any>) => u.id === parseInt(req.body.id));

	if (!user) {
		return res.status(400).json({message: `user id ${req.body.id} not found`})
	}

	await res.status(200).json(user);
}
