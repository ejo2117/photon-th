import React, { useState } from 'react';
import type { Patient } from '@lib/types';
import { createPatient, createPrescription } from '@services/database';

import { useDisclosure, Button, Heading } from '@chakra-ui/react';
import PatientForm from './PatientForm';
import PatientCard from './PatientCard';
import PrescriptionsForm from './PrescriptionsForm';

type PropTypes = {
	patients: Patient[];
	setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
};

const PatientHeading = ({ children }) => {
	return (
		<Heading as='h5' size='md' textAlign='left' position='sticky' top={0} w='100%' bgColor='white' zIndex={1} mt={6}>
			{children}
		</Heading>
	);
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

	const viewPatientRx = (patient: Patient) => {
		setSelectedPatient(patient);
		onOpenRxForm();
	};

	const alphabetizePatients = (toSort: Patient[]) => {
		const sorted = toSort.sort((a, b) => a.lastName.localeCompare(b.lastName));

		const alphabetized: JSX.Element[] = [];

		for (let i = 0; i < sorted.length; i++) {
			const current = sorted[i];
			const prev = i && sorted[i - 1];

			if (!i) {
				alphabetized.push(<PatientHeading>{current.lastName[0]}</PatientHeading>);
			}

			if (prev && prev.lastName[0] !== current.lastName[0]) {
				alphabetized.push(<PatientHeading>{current.lastName[0]}</PatientHeading>);
			}

			alphabetized.push(<PatientCard key={current.id} patient={current} openRxForm={viewPatientRx} />);
		}

		return alphabetized;
	};

	const writePrescriptionForPatient = async (patient: Patient) => {
		const createdRx = await createPrescription(patient);
		const indexToUpdate = patients.findIndex(p => p.id === patient.id);
		const updatedList = [...patients];
		updatedList[indexToUpdate].prescriptions.push(createdRx);
		setPatients(updatedList);
	};

	return (
		<>
			{alphabetizePatients(patients)}
			<Button w='100%' mt={6} borderStyle='dashed' borderWidth={1} borderColor='gray.500' onClick={onOpenPatientForm}>
				Register Patient
			</Button>
			<PatientForm addPatient={addNewPatient} isOpen={isOpenPatientForm} onClose={onClosePatientForm} />
			<PrescriptionsForm
				patient={selectedPatient}
				isOpen={isOpenRxForm}
				onClose={onCloseRxForm}
				writeRx={writePrescriptionForPatient}
			/>
		</>
	);
};

export default PatientList;
