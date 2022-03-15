
import express, {Request, Response} from 'express';
import {checkAuth} from "../middlewares/checkAuth";
import UserModel from '../models/User';
import {stripe} from "../utils/stripe";
import ArticleModel from '../models/Article';

const router = express.Router();

router.get('/', checkAuth, async (req: Request, res: Response) => {

	const user = await UserModel.findOne({email: req.user});

	const subscriptions = await stripe.subscriptions.list({
		customer: user.stripeCustomerId,
		status: 'all',
		expand: ['data.default_payment_method']
	}, {
		apiKey: process.env.STRIPE_SECRET_KEY
	});

	if (!subscriptions.data.length) return res.json([]);

	// @ts-ignore
	const plan = subscriptions.data[0].plan.nickname; // ADVANCED

	if (plan === 'BASIC') {
		const articles = await ArticleModel.find({access: 'BASIC'});
		return res.json(articles);
	}
	else if(plan === 'STANDARD') {
		const articles = await ArticleModel.find({
			access: {$in: ['BASIC', 'STANDARD']}
		});
		return res.json(articles);
	} else if (plan === 'ADVANCED') {
		const articles = await ArticleModel.find();
		return res.json(articles);
	}

})
export default router;
