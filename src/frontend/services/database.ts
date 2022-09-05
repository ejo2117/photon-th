import type { Patient, Prescription } from '../types';

const DB_URL = 'http://localhost:8080';

const getPatients = async (id = false) => {
	if (!id) {
		const response = await fetch(`${DB_URL}/api/patients`);
		const data: Patient[] = await response.json();
		return data;
	}
	const response = await fetch(`${DB_URL}/api/patients/${id}`);
	const data: Patient = await response.json();

	return [data];
};

const createPatient = async ({ firstName, lastName }: Partial<Patient>) => {
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

const getPrescriptions = async (id = false) => {
	if (!id) {
		const response = await fetch(`${DB_URL}/api/prescriptions`);
		const data: Prescription[] = await response.json();
		return data;
	}
	const response = await fetch(`${DB_URL}/api/prescriptions/${id}`);
	const data: Prescription = await response.json();
	return [data];
};

const createPrescription = async (patient: Patient) => {
	const response = await fetch(`${DB_URL}/api/prescriptions`, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			patientId: patient.id,
		}),
	});
	const data: Prescription = await response.json();
	console.log('🚀 ~ file: database.ts ~ line 50 ~ createPrescription ~ data', data);

	return data;
};

const updatePrescriptionStatus = async ({ id, status }: Partial<Prescription>) => {
	const response = await fetch(`${DB_URL}/api/update-status`, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			id,
			status,
		}),
	});
	const data: Prescription = await response.json();

	return data;
};

export { getPatients, createPatient, getPrescriptions, createPrescription, updatePrescriptionStatus };
