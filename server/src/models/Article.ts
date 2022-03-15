
import mongoose from "mongoose";

const {Schema} = mongoose;

const articleSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	imageUrl: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	access: {
		type: String,
		enum: ['BASIC', 'STANDARD', 'ADVANCED', 'PREMIUM'],
		required: true
	}
});

export default mongoose.model('Article', articleSchema)
