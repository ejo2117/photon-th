type Patient = {
	id: string;
	firstName: string;
	lastName: string;
	prescriptions: Prescription[];
};

type Prescription = {
	id: string;
	patientId: string;
	status: PrescriptionStatus;
};

enum PrescriptionStatus {
	'Pending',
	'In Progress',
	'Filled',
}

export type { Patient, Prescription };
