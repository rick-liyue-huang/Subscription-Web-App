import {Request, Response} from "express";
import {validationResult} from "express-validator";
import UserModel from "../models/User";
import bcrypt, {hash} from "bcryptjs";
import JWT from "jsonwebtoken";
import {v4 as uuid} from 'uuid';
import fs from 'fs';
import path from 'path';
import {stripe} from "../utils/stripe";
const fsPromise = fs.promises;
import {UserI} from '../types/users';


let users: UserI[] = [];


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

		return res.json({errors, data: null});
	}

	// 3. check if email is not already used
	const user = await UserModel.findOne({email});
	if (user) {
		// return the array format as express-validator
		// TODO: catch response after add res.status().json()
		return res.json({
			errors: [{
				msg: `${user.email} duplicated`
			}],
			data: null
		})
	}

	// 4. hash password
	const hashedPassword = bcrypt.hashSync(password, 10);

	// the sign in counter is the customer
	const customer = await stripe.customers.create({
		email
	}, {
		apiKey: process.env.STRIPE_SECRET_KEY
	})

	// after check the user is no exist, it will create the new user
	const newUser = await UserModel.create({
		email,
		password: hashedPassword,
		stripeCustomerId: customer.id
	});

	// 5. add the token on the created user, and send back to client
	const token = JWT.sign({
		email: newUser.email
	}, process.env.ACCESS_JWT_SECRET as string, {
		expiresIn: '3d'
	});

	res.json({
		errors: [],
		data: {
			token,
			user: {
				id: newUser._id,
				email: newUser.email,
				stripeCustomerId: customer.id
			}
		}
	});
}

export const signinController = async (req: Request, res: Response) => {
	const {email, password} = req.body;

	// 1. get the user from database
	const user = await UserModel.findOne({email});
	if (!user) {
		return res.json({
			errors: [
				{msg: `${email} isn't existed.`}
			],
			data: null
		})
	}

// 2.	compare the password
	const isMatched = await bcrypt.compare(password, user.password);

	if (!isMatched) {
		return res.json({
			errors: [
				{msg: `password is wrong.`}
			],
			data: null
		})
	}

	const token = JWT.sign({
		email: user.email
	}, process.env.ACCESS_JWT_SECRET as string, {
		expiresIn: '3d'
	});

	res.json({
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

/*

const data = {
	users: users,
	setUsers: function (data: Array<UserI>) {
		this.users = data}
}
/!*


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

	if (req.body.firstname) { // @ts-ignore
		user.firstname = req.body.firstname;
	}
	if (req.body.lastname) { // @ts-ignore
		user.lastname = req.body.lastname;
	}

	const filteredUsers = data.users.filter((user: Record<string, any>) => user.id !== parseInt(req.body.id));
	const unsortedUsers = [...filteredUsers, user];

	try {
		// @ts-ignore
		data.setUsers(unsortedUsers.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
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

	const filteredUsers = data.users.filter((u: Record<string, any>) => u.id !== parseInt(req.body.id));
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
*!/


export const registerHandler = async (req: Request, res: Response) => {
	const {user, pwd} = req.body;
	if (!user || !pwd) {
		return res.status(400).json({
			message: 'username or password required'
		});
	}

//	 checkout the duplicated user
	const duplicatedUser = await (data.users as Array<UserI>).find((u) => u.user === user);

	console.log('data.users: ', data.users);

	if (duplicatedUser) {
		return res.sendStatus(409);
	}

	try {

	//	encrypt the password
		const hashedPassword = await hash(pwd, 10);

		const newUser: UserI = {
			user: user,
			pwd: hashedPassword
		};

		data.setUsers([...data.users, newUser]);
		await fsPromise.writeFile(path.join(__dirname, '..', 'models', 'users.json'), JSON.stringify(data.users));
		console.log(data.users);
		res.status(201).json({success: `${user} input the db`});

	} catch (err: any) {
		res.status(500).json({message: err.message})
	}
};


export const loginHandler = async (req: Request, res: Response) => {

	const {user, pwd} = req.body;
	if (!user) {
		return res.status(400).json({message: `${user} no exist`});
	}

	const foundUser = (data.users as Array<UserI>).find((u) => u.user === user);

	if (!foundUser) return res.sendStatus(401) // unauthorized

//	 evaluate password
	const isMatch = await bcrypt.compare(pwd, foundUser.pwd);

	if (isMatch) {

		// here the server will create the jwt
		const accessToken = JWT.sign(
			{'user': foundUser.user},
			process.env.ACCESS_JWT_SECRET as string,
			{ expiresIn: '30s' }
		);

		const refreshToken = JWT.sign(
			{'user': foundUser.user},
			process.env.REFRESH_JWT_SECRET as string,
			{ expiresIn: '1d' }
		);

		// saving refreshToken on the currentUser
		const otherUsers = data.users.filter(u => u.user !== foundUser.user);

		const currentUser = {...foundUser, refreshToken};

		data.setUsers([...otherUsers, currentUser]);
		await fsPromise.writeFile(
			path.join(__dirname, '..', 'models', 'users.json'),
			JSON.stringify(data.users)
		);

		res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});

		res.status(201).json({accessToken})
	} else {
		res.sendStatus(401);
	}
}
*/


