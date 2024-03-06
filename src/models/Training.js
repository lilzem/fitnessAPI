import mongoose from 'mongoose';
import { ExerciseSchema } from './Exersice.js';

const TrainingSchema = new mongoose.Schema({
	name: {
		type: String,
		required: 'Name is required',
		max: 25,
	},
	exercises: [ExerciseSchema],
});

export default mongoose.model('trainings', TrainingSchema);
