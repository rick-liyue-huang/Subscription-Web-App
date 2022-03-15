
import express, {Request, Response} from "express";
import {checkAuth} from "../middlewares/checkAuth";
import {stripe} from "../utils/stripe";
import UserModel from '../models/User'
import ArticleModel from '../models/Article';
import Article from "../models/Article";


const router = express.Router();

router.get('/prices', checkAuth, async (req: Request, res:  Response) => {

	const prices = await stripe.prices.list({
		apiKey: process.env.STRIPE_SECRET_KEY
	});

	res.json({prices});

});

router.post('/session', checkAuth, async (req: Request, res: Response) => {

	const user = await UserModel.findOne({email: req.user});

	ArticleModel.create({
		title: 'Title Three',
		imageUrl: 'https://images.unsplash.com/photo-1587300762060-7132a5f837df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80',
		content: 'content three',
		access: 'ADVANCED'
	})

	const session = await stripe.checkout.sessions.create(
		{
			mode: 'subscription',
			payment_method_types: ['card'],
			line_items: [
				{
					price: req.body.priceId,
					quantity: 1
				}
			],
			success_url: 'http://localhost:3000/articles',
			cancel_url: 'http://localhost:3000/subscriptplan',
			customer: user.stripeCustomerId
		},
		{
			apiKey: process.env.STRIPE_SECRET_KEY
		}
	);

	return res.json(session);
})

export default router;
