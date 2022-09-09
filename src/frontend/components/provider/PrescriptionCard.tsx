import React from 'react';
import type { Prescription } from '@lib/types';
import { Flex, Code, Spacer, Badge, Button } from '@chakra-ui/react';

type PropTypes = {
	prescription: Prescription;
	withButton?: boolean;
	clickFunction?: () => void;
};

const PrescriptionCard = ({ prescription, withButton = false, clickFunction = null }: PropTypes) => {
	const badgeColors = {
		'Pending': 'gray',
		'In Progress': 'blue',
		'Filled': 'green',
	};

	return (
		<Flex align='center' w='100%' borderRadius={4} p={4} bg='gray.200' border='1px' borderColor='gray.500' gap={8}>
			<Code>{prescription.id}</Code>
			<Spacer />
			{withButton ? (
				<Button colorScheme='gray' border='1px' borderColor='gray.500' onClick={clickFunction}>
					View Prescription
				</Button>
			) : (
				<Badge colorScheme={badgeColors[prescription.status]}>{prescription.status}</Badge>
			)}
		</Flex>
	);
};

export default PrescriptionCard;
