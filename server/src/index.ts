import express from 'express';
import authRouters from "./routes/auth";

const app = express();
const PORT = 8080;

// need the  format
app.use(express.json());
app.use('/auth', authRouters);




app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`)
});
