
import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		min: 6
	}
});

export default mongoose.model('User', userSchema);
