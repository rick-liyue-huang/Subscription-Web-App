
import express, {Request, Response} from "express";
import {checkAuth} from "../middlewares/checkAuth";
import {stripe} from "../utils/stripe";


const router = express.Router();

router.get('/prices', checkAuth, async (req: Request, res:  Response) => {

	const prices = await stripe.prices.list({
		apiKey: process.env.STRIPE_SECRET_KEY
	});

	res.json({prices});

});

export default router;
