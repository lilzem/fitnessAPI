import express from 'express';
import {
	AddTraining,
	DeleteAllTrainings,
	DeleteTraining,
	GetTraining,
	GetTrainings,
	UpdateTraining,
} from '../controllers/training.js';
import Validate from '../middleware/validate.js';
import { check } from 'express-validator';
import { AddExercise, DeleteExercise } from '../controllers/exercise.js';

const router = express.Router();

router.post(
	'/trainings',
	check('name').not().isEmpty().withMessage('name is required').trim().escape(),
	// check('exercises').not().isEmpty().withMessage('exercises are required').trim().escape(),
	Validate,
	AddTraining
);

router.get('/trainings', GetTrainings);

router.get('/trainings/:id', GetTraining);

router.delete('/trainings', DeleteAllTrainings);

router.delete('/trainings/:id', DeleteTraining);

router.delete('/trainings/:training_id/exercises/:exercise_id', DeleteExercise);

router.patch('/trainings/:id', UpdateTraining);

router.patch('/trainings/:id/add-exercise', AddExercise);

export default router;
