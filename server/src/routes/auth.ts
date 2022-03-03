import express from 'express';
import { body, validationResult } from 'express-validator';


const router = express.Router();

router.post('/signup',
	// the middleware to validate the email format and password length
	body('email').isEmail().withMessage('the email is invalidate format'),
	body('password').isLength({min: 6}).withMessage('the password need min 6 characters'),
	async (req: express.Request, res: express.Response) => {

	const validationErrors = validationResult(req);

	if (!validationErrors.isEmpty()) {
		const errors = validationErrors.array().map((err) => {
			return {
				msg: err.msg,
			};
		});

		return res.json({ errors, data: null });
	}
	//
	const {email, password} = req.body;

	res.json({
		email, password
	});


})

export default router;
