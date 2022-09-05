import React from 'react';
import type { Patient } from 'types';
import { createPatient } from '@services/database';

import { useDisclosure, Button } from '@chakra-ui/react';
import PatientForm from './PatientForm';

type PropTypes = {
	patients: Patient[];
	setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
};

const PatientList = ({ patients, setPatients }: PropTypes) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const addNewPatient = async ({ firstName, lastName }: Partial<Patient>) => {
		const createdPatient = await createPatient({ firstName, lastName });
		const updatedList = [...patients, createdPatient];
		setPatients(updatedList);
	};

	return (
		<>
			{patients.map(p => (
				<div>{p.firstName}</div>
			))}
			<Button onClick={onOpen}>Click Here</Button>
			<PatientForm addPatient={addNewPatient} isOpen={isOpen} onClose={onClose} />
		</>
	);
};

export default PatientList;
