import express from "express";
import {checkAuth} from "../middlewares/checkAuth";
import {stripe} from '../utils/stripe-tool';
import User from "../models/user";


const router = express.Router();

router.get('/prices', checkAuth, async (req: express.Request, res: express.Response) => {
	const prices = await stripe.prices.list({
		apiKey: process.env.STRIPE_SECRET_KEY
	});

	return res.json(prices);
});

router.post('/session', checkAuth, async (req: express.Request, res: express.Response) => {

	const user = await User.findOne({email: req.user});

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
			cancel_url: 'http://localhost:3000/articles-plans',
			customer: user.stripeCustomerId
		},
		{
			apiKey: process.env.STRIPE_SECRET_KEY
		}
	);

	return res.json(session);
})

export default router;
