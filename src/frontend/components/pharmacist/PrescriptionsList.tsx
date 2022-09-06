import React from 'react';
import { updatePrescriptionStatus } from '@services/database';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Button, Flex, Spacer } from '@chakra-ui/react';
import { PrescriptionStatus } from '../../types';
import type { Prescription } from '../../types';

type PropTypes = {
	prescriptions: Prescription[];
	setPrescriptions: React.Dispatch<React.SetStateAction<Prescription[]>>;
};

const typedKeys = <T extends Record<string, unknown>>(object: T): (keyof T)[] => {
	return Object.keys(object).filter(s => !(parseInt(s, 10) >= 0)) as (keyof T)[];
};

const getCardsWithStatus = (prescriptions: Prescription[], status: keyof typeof PrescriptionStatus) => {
	const filteredPrescriptions = prescriptions.filter(p => p.status === status);
	return filteredPrescriptions.map(fp => (
		<Flex align='center' w='100%' borderRadius={4} p={4} bg='gray.400'>
			<Box>{`${fp.id}`}</Box>
			<Spacer />
			<Button>View Prescriptions</Button>
		</Flex>
	));
};

const PrescriptionsList = ({ prescriptions, setPrescriptions }: PropTypes) => {
	return (
		<Tabs>
			<TabList>
				{typedKeys(PrescriptionStatus).map(s => (
					<Tab>{s}</Tab>
				))}
			</TabList>
			<TabPanels>
				{typedKeys(PrescriptionStatus).map(s => (
					<TabPanel>{getCardsWithStatus(prescriptions, s)}</TabPanel>
				))}
			</TabPanels>
		</Tabs>
	);
};

export default PrescriptionsList;
