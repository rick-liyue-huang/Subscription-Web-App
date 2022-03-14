// here I set whitelist for access server
import {Request} from "express";
import cors from "cors";

export const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:3000', 'http://localhost:3000'];

export const corsOptionsDelegate = function (req: Request, callback: any) {
	let corsOptions: cors.CorsOptions;
	if (whitelist.indexOf(<string>req.header('Origin')) !== -1) {
		corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = { origin: false } // disable CORS for this request
	}
	callback(null, corsOptions) // callback expects two parameters: error and options
}
