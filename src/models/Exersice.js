import mongoose from 'mongoose';

export const ExerciseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: 'Name is required',
		max: 25,
	},
	weight: {
		type: Number,
		required: 'Weight is required',
	},
	reps: {
		type: Number,
		required: 'Weight is required',
	},
});

export default mongoose.model('exercises', ExerciseSchema);
