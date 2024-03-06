import Training from '../models/Training.js';

export async function AddTraining(req, res) {
	const { name, exercises } = req.body;

	if (
		!Array.isArray(exercises) ||
		!exercises.every(
			(ex) => typeof ex === 'object' && ex !== null && 'name' in ex && 'weight' in ex && 'reps' in ex
		)
	) {
		return res.status(400).json({
			status: 'error',
			code: 400,
			message: 'Invalid exercises format',
		});
	}

	try {
		const newTraining = new Training({
			name,
			exercises: exercises,
		});
		const savedTraining = await newTraining.save();
		const { ...data } = savedTraining;
		res.status(200).json({
			status: 'success',
			data: [data],
		});
	} catch (err) {
		res.status(500).json({
			status: 'error',
			code: 500,
			data: [],
			message: `Internal Server Error: ${err}`,
		});
	}
	res.end();
}

export async function GetTrainings(req, res) {
	try {
		const trainings = await Training.find({}); // Знайти всі тренування
		res.status(200).json({
			status: 'success',
			results: trainings.length,
			data: { trainings },
		});
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: `Internal Server Error: ${err}`,
		});
	}
}

export async function GetTraining(req, res) {
	try {
		const training = await Training.findById(req.params.id);
		if (!training) {
			return res.status(404).json({
				status: 'error',
				message: 'Training not found',
			});
		}
		res.status(200).json({
			status: 'success',
			data: { training },
		});
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: `Internal Server Error: ${err}`,
		});
	}
}

export async function DeleteAllTrainings(req, res) {
	try {
		await Training.deleteMany({});
		res.status(200).json({
			status: 'success',
			message: `All trainings have been successfully deleted`,
		});
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: `Internal Server Error: ${err}`,
		});
	}
}

export async function DeleteTraining(req, res) {
	try {
		const training = await Training.findByIdAndDelete(req.params.id);
		if (!training) {
			return res.status(404).json({
				status: 'error',
				message: 'Training not found',
			});
		}
		res.status(200).json({
			status: 'success',
			message: 'Training has been successfully deleted',
		});
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: `Internal Server Error: ${err}`,
		});
	}
}

export async function UpdateTraining(req, res) {
	try {
		const training = await Training.findByIdAndUpdate(req.params.id, req.body, {
			new: true, // Повертає оновлений документ
			runValidators: true, // Запускає валідатори схеми на оновлені дані
		});
		if (!training) {
			return res.status(404).json({
				status: 'error',
				message: 'Training not found',
			});
		}
		res.status(200).json({
			status: 'success',
			data: {
				training,
			},
		});
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: `Internal Server Error: ${err}`,
		});
	}
}
