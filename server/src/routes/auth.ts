
import express, {Request, Response} from 'express';
import {body} from "express-validator";
import {/*loginHandler, registerHandler, */signinController, signupController} from "../controllers/auth";
import {checkAuth} from "../middlewares/checkAuth";
import UserModel from '../models/User';


const router = express.Router();


router.post(
	'/signup',
	body('email').isEmail().withMessage('The email format is wrong'),
	body('password').matches(/\d/).withMessage('need contain number').isLength({min: 6}).withMessage('need 6 characters at least'),
	signupController
);

router.post('/signin', signinController);

// after login or signup
router.get('/me', checkAuth, async (req: Request, res: Response) => {

	// res.send(req.user);

	const user = await UserModel.findOne({
		email: req.user
	});

	return res.json({
		errors: [],
		data: {
			user: {
				id: user._id,
				email: user.email,
				stripeCustomerId: user.stripeCustomerId
			}
		}
	})
})

/*
router.post('/register', registerHandler);
router.post('/login', loginHandler);
*/


export default router;
