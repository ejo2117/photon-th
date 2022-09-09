type Patient = {
	id: string;
	firstName: string;
	lastName: string;
	prescriptions: Prescription[];
	avatar: string;
};

type DatabasePatient = {
	id: string;
	firstName: string;
	lastName: string;
	prescriptions: Prescription['id'][];
	avatar: string;
};

type Prescription = {
	id: string;
	patientId: string;
	status: keyof typeof PrescriptionStatus;
};

type UserType = 'provider' | 'pharmacist';

export enum PrescriptionStatus {
	'Pending',
	'In Progress',
	'Filled',
}

export type { Patient, Prescription, DatabasePatient, UserType };
