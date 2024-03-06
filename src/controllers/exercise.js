import Training from '../models/Training.js';

export async function AddExercise(req, res) {
	const { id } = req.params; // Отримання ID тренування з параметрів шляху
	const { exercise } = req.body; // Отримання нової вправи з тіла запиту

	try {
		// Знаходження тренування за ID та додавання нової вправи до масиву вправ
		const updatedTraining = await Training.findByIdAndUpdate(
			id,
			{ $push: { exercises: exercise } }, // Використання $push для додавання нової вправи
			{ new: true, runValidators: true } // Повернення оновленого документа та виконання валідаторів
		);

		if (!updatedTraining) {
			return res.status(404).json({
				status: 'error',
				message: 'Training not found',
			});
		}

		res.status(200).json({
			status: 'success',
			data: updatedTraining,
		});
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: `Internal Server Error: ${err}`,
		});
	}
}

export async function DeleteExercise(req, res) {
	const { training_id, exercise_id } = req.params; // Отримання ID тренування з параметрів шляху

	try {
		// Знаходження тренування за ID та видалення вправи з масиву вправ
		const updatedTraining = await Training.findByIdAndUpdate(
			training_id,
			{ $pull: { exercises: { _id: exercise_id } } }, // Використання $pull для видалення вправи за ID
			{ new: true } // Повернення оновленого документа
		);

		if (!updatedTraining) {
			return res.status(404).json({
				status: 'error',
				message: 'Training not found',
			});
		}

		//TODO 404 if exercise don't exist

		// const isExerciseExist = updatedTraining.exercises.filter((exercise) => exercise._id === exercise_id).length;

		// if (!isExerciseExist) {
		// 	return res.status(404).json({
		// 		status: 'error',
		// 		message: 'Exercise not found',
		// 	});
		// }

		res.status(200).json({
			status: 'success',
			data: updatedTraining,
		});
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: `Internal Server Error: ${err}`,
		});
	}
}
