import React, { useState, useEffect } from 'react';
import { getPatients } from '@services/database';
import { CircularProgress, Flex, VStack } from '@chakra-ui/react';
import type { Patient } from '@lib/types';
import PatientList from './PatientList';

const ProviderView = () => {
	const [patients, setPatients] = useState<Patient[]>(null);

	useEffect(() => {
		const fetchData = async () => {
			const patientData = await getPatients();
			setPatients(patientData);
		};
		fetchData();

		return () => {
			setPatients(null);
		};
	}, []);

	return (
		<Flex w='100%' position='relative' direction='column' gap={4}>
			{patients ? <PatientList patients={patients} setPatients={setPatients} /> : <CircularProgress isIndeterminate />}
		</Flex>
	);
};

export default ProviderView;
