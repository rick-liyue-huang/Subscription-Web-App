import express from "express";
import {checkAuth} from "../middlewares/checkAuth";
import {stripe} from '../utils/stripe-tool';


const router = express.Router();

router.get('/prices', checkAuth, async (req: express.Request, res: express.Response) => {
	const prices = await stripe.prices.list({
		apiKey: process.env.STRIPE_SECRET_KEY
	});

	return res.json(prices);

});

export default router;
