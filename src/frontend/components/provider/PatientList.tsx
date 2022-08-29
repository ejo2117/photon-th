import React from 'react';
import type { Patient } from 'types';
import { createPatient } from '@services/database';

import PatientForm from './PatientForm';

type PropTypes = {
	patients: Patient[];
	setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
};

const PatientList = ({ patients, setPatients }: PropTypes) => {
	const addNewPatient = async ({ firstName, lastName }) => {
		const createdPatient = await createPatient({ firstName, lastName });
		const updatedList = [...patients, createdPatient];
		setPatients(updatedList);
	};

	return (
		<>
			{patients.map(p => (
				<div>{p.firstName}</div>
			))}
			<PatientForm addPatient={addNewPatient} />
		</>
	);
};

export default PatientList;
