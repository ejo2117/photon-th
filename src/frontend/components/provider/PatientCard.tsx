import React from 'react';
import type { Patient } from '@lib/types';
import { Flex, Box, Spacer, Button, Avatar } from '@chakra-ui/react';

type PropTypes = {
	patient: Patient;
	openRxForm: (patient: Patient) => void;
};

const PatientCard = ({ patient, openRxForm }: PropTypes) => {
	return (
		<Flex align='center' w='100%' borderRadius={8} p={4} bg='gray.200' border='1px' borderColor='gray.500'>
			<Flex align='center' gap={4}>
				<Avatar
					name={`${patient.firstName} ${patient.lastName}`}
					src={patient.avatar}
					bg='gray.200'
					border='1px'
					borderColor='gray.500'
					color='gray.500'
				/>
				<Box>{`${patient.firstName} ${patient.lastName}`}</Box>
			</Flex>
			<Spacer />
			<Button
				colorScheme='gray'
				border='1px'
				borderColor='gray.500'
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
