
import express, {Request, Response} from 'express';
import {body} from "express-validator";
import {signinController, signupController} from "../controllers/auth";


const router = express.Router();

router.post(
	'/signup',
	body('email').isEmail().withMessage('The email format is wrong'),
	body('password').matches(/\d/).withMessage('need contain number').isLength({min: 6}).withMessage('need 6 characters at least'),
	signupController
);

router.post('/signin', signinController);


export default router;
