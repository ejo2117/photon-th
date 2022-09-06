import React, { useState } from 'react';
import { updatePrescriptionStatus } from '@services/database';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Button, Flex, Spacer, useDisclosure } from '@chakra-ui/react';
import { PrescriptionStatus } from '@lib/types';
import type { Prescription } from '@lib/types';
import typedKeys from '@lib/utils';
import PrescriptionStatusForm from './PrescriptionStatusForm';

type PropTypes = {
	prescriptions: Prescription[];
	setPrescriptions: React.Dispatch<React.SetStateAction<Prescription[]>>;
};

const PrescriptionsList = ({ prescriptions, setPrescriptions }: PropTypes) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [selectedRx, setSelectedRx] = useState<Prescription>(null);

	const updateRxStatus = async (prescription: Prescription, newStatus: keyof typeof PrescriptionStatus) => {
		const updatedRx = await updatePrescriptionStatus({ id: prescription.id, status: newStatus });
		const indexToUpdate = prescriptions.findIndex(p => p.id === prescription.id);
		const updatedList = [...prescriptions];
		updatedList[indexToUpdate].status = updatedRx.status;
		setPrescriptions(updatedList);
		onClose();
	};

	const showRxDetail = (prescription: Prescription) => {
		setSelectedRx(prescription);
		onOpen();
	};

	const getCardsWithStatus = (prescriptionList: Prescription[], status: keyof typeof PrescriptionStatus) => {
		const filteredPrescriptions = prescriptionList.filter(p => p.status === status);
		return filteredPrescriptions.map(fp => (
			<Flex align='center' w='100%' borderRadius={4} p={4} bg='gray.400'>
				<Box>{`${fp.id}`}</Box>
				<Spacer />
				<Button onClick={() => showRxDetail(fp)}>View Prescriptions</Button>
			</Flex>
		));
	};

	return (
		<>
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
			<PrescriptionStatusForm prescription={selectedRx} isOpen={isOpen} onClose={onClose} updateStatus={updateRxStatus} />
		</>
	);
};

export default PrescriptionsList;
