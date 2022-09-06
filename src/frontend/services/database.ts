import type { Patient, Prescription, DatabasePatient } from '../types';

const DB_URL = 'http://localhost:8080';

const getPrescriptionsForPatient = async (patientId: string) => {
	const response = await fetch(`${DB_URL}/api/patients/${patientId}/prescriptions`);
	const data: Prescription[] = await response.json();
	return data;
};

const getPatients = async (id = '') => {
	if (!id.length) {
		const response = await fetch(`${DB_URL}/api/patients`);
		const data: DatabasePatient[] = await response.json();

		const rxResults = [];
		for (let i = 0; i < data.length; i++) {
			const patient = data[i];
			rxResults.push(getPrescriptionsForPatient(patient.id));
		}

		const rxData: Prescription[][] = await Promise.all(rxResults);
		const completePatients: Patient[] = [];

		for (let i = 0; i < data.length; i++) {
			const patient = data[i];
			completePatients.push({ ...patient, prescriptions: rxData[i] });
		}

		return completePatients;
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

const getPrescriptions = async (id = '') => {
	if (!id.length) {
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
