import React, { useState } from 'react';
import type { Patient } from 'types';
import { createPatient, createPrescription } from '@services/database';

import { useDisclosure, Button } from '@chakra-ui/react';
import PatientForm from './PatientForm';
import PatientCard from './PatientCard';
import PrescriptionsList from './PrescriptionsList';

type PropTypes = {
	patients: Patient[];
	setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
};

const PatientList = ({ patients, setPatients }: PropTypes) => {
	const { isOpen: isOpenPatientForm, onOpen: onOpenPatientForm, onClose: onClosePatientForm } = useDisclosure();
	const { isOpen: isOpenRxForm, onOpen: onOpenRxForm, onClose: onCloseRxForm } = useDisclosure();

	const [selectedPatient, setSelectedPatient] = useState<Patient>(null);

	const addNewPatient = async ({ firstName, lastName }: Partial<Patient>) => {
		const createdPatient = await createPatient({ firstName, lastName });
		const updatedList = [...patients, createdPatient];
		setPatients(updatedList);
	};

	const writePrescriptionForPatient = async (patient: Patient) => {
		const createdRx = await createPrescription(patient);
		const indexToUpdate = patients.findIndex(p => p.id === patient.id);
		const updatedList = [...patients];
		updatedList[indexToUpdate].prescriptions.push(createdRx.id);
		setPatients(updatedList);
	};

	const viewPatientRx = (patient: Patient) => {
		setSelectedPatient(patient);
		onOpenRxForm();
	};

	return (
		<>
			{patients.map(p => (
				<PatientCard patient={p} openRxForm={viewPatientRx} />
			))}
			<Button onClick={onOpenPatientForm}>Register Patient</Button>
			<PatientForm addPatient={addNewPatient} isOpen={isOpenPatientForm} onClose={onClosePatientForm} />
			<PrescriptionsList
				patient={selectedPatient}
				isOpen={isOpenRxForm}
				onClose={onCloseRxForm}
				writeRx={writePrescriptionForPatient}
			/>
		</>
	);
};

export default PatientList;
