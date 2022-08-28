import type { Patient, Prescription } from '../types';

const getPatients = ({ id = false }) => {
	if (!id) {
		return 'get all';
	}

	return 'specific patient';
};

const createPatient = ({ firstName, lastName }: Patient) => {
	return `created ${firstName} ${lastName}`;
};

const createPrescription = (patient: Patient) => {
	const newPrescription: Prescription = {
		id: 123,
		patient: patient.id,
		status: 0,
	};
	patient.prescriptions.push(newPrescription);
	return 'done';
};

export { getPatients, createPatient, createPrescription };
