type Patient = {
	id: number;
	firstName: string;
	lastName: string;
	prescriptions: Prescription[];
};

type Prescription = {
	id: number;
	patient: number;
	status: PrescriptionStatus;
};

enum PrescriptionStatus {
	'Pending',
	'In Progress',
	'Filled',
}

export type { Patient, Prescription };
