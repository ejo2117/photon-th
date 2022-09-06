import React from 'react';
import type { Prescription } from 'types';
import { Flex, Box, Spacer, Badge } from '@chakra-ui/react';

type PropTypes = {
	prescription: Prescription;
};

const PrescriptionCard = ({ prescription }: PropTypes) => {
	return (
		<Flex align='center' w='100%' borderRadius={4} p={4} bg='gray.400'>
			<Box>{prescription.id}</Box>
			<Spacer />
			<Badge>{prescription.status}</Badge>
		</Flex>
	);
};

export default PrescriptionCard;
