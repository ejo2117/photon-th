import React from 'react';
import type { Prescription } from '@lib/types';
import { Flex, Box, Spacer, Badge } from '@chakra-ui/react';

type PropTypes = {
	prescription: Prescription;
};

const PrescriptionCard = ({ prescription }: PropTypes) => {
	const badgeColors = {
		'Pending': 'gray',
		'In Progress': 'blue',
		'Filled': 'green',
	};

	return (
		<Flex align='center' w='100%' borderRadius={4} p={4} bg='blue.50'>
			<Box>{prescription.id}</Box>
			<Spacer />
			<Badge colorScheme={badgeColors[prescription.status]}>{prescription.status}</Badge>
		</Flex>
	);
};

export default PrescriptionCard;
