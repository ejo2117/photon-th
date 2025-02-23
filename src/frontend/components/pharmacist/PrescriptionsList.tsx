import React, { useState } from 'react';
import { updatePrescriptionStatus } from '@services/database';
import {
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Button,
	Flex,
	Spacer,
	useDisclosure,
	VStack,
	Code,
	Heading,
} from '@chakra-ui/react';
import { PrescriptionStatus } from '@lib/types';
import type { Prescription } from '@lib/types';
import { typedKeys } from '@lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import PrescriptionCard from '@components/provider/PrescriptionCard';
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
		return (
			<VStack gap={4}>
				<AnimatePresence mode='popLayout'>
					{filteredPrescriptions.map(fp => (
						<motion.div
							layout
							key={fp.id}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0, x: 400 }}
							transition={{ type: 'spring' }}
							style={{ width: '100%' }}
						>
							<PrescriptionCard prescription={fp} withButton clickFunction={() => showRxDetail(fp)} />
						</motion.div>
					))}
				</AnimatePresence>
			</VStack>
		);
	};

	return (
		<>
			<Heading size='md'>Prescriptions On File</Heading>
			<Tabs w='100%' h='100%' position='relative'>
				<TabList position='sticky' top='0' bgColor='white' zIndex={1}>
					{typedKeys(PrescriptionStatus).map(s => (
						<Tab as='h5' fontWeight='bold'>
							{s}
						</Tab>
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
