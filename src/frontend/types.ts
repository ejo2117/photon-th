type Patient = {
	id: string;
	firstName: string;
	lastName: string;
	prescriptions: Prescription[];
};

type DatabasePatient = {
	id: string;
	firstName: string;
	lastName: string;
	prescriptions: Prescription['id'][];
};

type Prescription = {
	id: string;
	patientId: string;
	status: keyof typeof PrescriptionStatus;
};

export enum PrescriptionStatus {
	'Pending',
	'In Progress',
	'Filled',
}

export type { Patient, Prescription, DatabasePatient };
