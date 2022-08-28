import type { Patient, Prescription } from '../types';

const DB_URL = 'http://localhost:8080';

const getPatients = async ({ id = false }) => {
	if (!id) {
		const response = await fetch(`${DB_URL}/api/patients`);
		const data: Patient[] = await response.json();
		return data;
	}
	const response = await fetch(`${DB_URL}/api/patients/${id}`);
	const data: Patient = await response.json();

	return data;
};

const createPatient = async ({ firstName, lastName }) => {
	const response = await fetch(`${DB_URL}/api/patients`, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			firstName,
			lastName,
		}),
	});
	const data: Patient = await response.json();

	return data;
};

const createPrescription = (patient: Patient) => {
	const newPrescription: Prescription = {
		id: '123',
		patient: patient.id,
		status: 0,
	};
	patient.prescriptions.push(newPrescription);
	return 'done';
};

export { getPatients, createPatient, createPrescription };
