import React from 'react';
import type { Patient } from 'types';
import { Flex, Box, Spacer, Button } from '@chakra-ui/react';

type PropTypes = {
	patient: Patient;
	openRxForm: (patient: Patient) => void;
};

const PatientCard = ({ patient, openRxForm }: PropTypes) => {
	return (
		<Flex align='center' w='100%' borderRadius={4} p={4} bg='gray.400'>
			<Box>{`${patient.firstName} ${patient.lastName}`}</Box>
			<Spacer />
			<Button
				onClick={() => {
					openRxForm(patient);
				}}
			>
				View Prescriptions
			</Button>
		</Flex>
	);
};

export default PatientCard;
