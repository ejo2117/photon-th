import React from 'react';
import { Patient } from '@lib/types';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	ButtonGroup,
	VStack,
} from '@chakra-ui/react';
import PrescriptionCard from './PrescriptionCard';

type PropTypes = {
	patient?: Patient;
	isOpen: boolean;
	onClose: () => void;
	writeRx: (patient: Patient) => Promise<void>;
};

const PrescriptionsForm = ({ patient = null, isOpen, onClose, writeRx }: PropTypes) => {
	return patient ? (
		<Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom' scrollBehavior='inside'>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{`${patient.firstName}'s Prescriptions`}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{patient.prescriptions.length ? (
						<VStack as='ul' gap={2}>
							{patient.prescriptions.map(p => (
								<PrescriptionCard key={p.id} prescription={p} />
							))}
						</VStack>
					) : (
						'This Patient has no Prescriptions'
					)}
				</ModalBody>
				<ModalFooter>
					<ButtonGroup gap={4}>
						<Button onClick={onClose}>Close</Button>
						<Button onClick={() => writeRx(patient)}>Write New Prescription</Button>
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>
		</Modal>
	) : null;
};

export default PrescriptionsForm;
