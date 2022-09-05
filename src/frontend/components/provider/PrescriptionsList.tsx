import React from 'react';
import { Patient } from 'types';
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
} from '@chakra-ui/react';

type PropTypes = {
	patient?: Patient;
	isOpen: boolean;
	onClose: () => void;
	writeRx: (patient: Patient) => Promise<void>;
};

const PrescriptionsList = ({ patient = null, isOpen, onClose, writeRx }: PropTypes) => {
	return patient ? (
		<Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{`${patient.firstName}'s Prescriptions`}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{patient.prescriptions.length ? (
						<ul>
							{patient.prescriptions.map(p => (
								<li>{p}</li>
							))}
						</ul>
					) : (
						'This Patient has no Prescriptions'
					)}
				</ModalBody>
				<ModalFooter>
					<ButtonGroup gap={4}>
						<Button onClick={onClose} mr={4}>
							Close
						</Button>
						<Button onClick={() => writeRx(patient)}>Write New Prescription</Button>
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>
		</Modal>
	) : null;
};

export default PrescriptionsList;
