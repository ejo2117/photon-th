import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	ButtonGroup,
	Button,
	Code,
	RadioGroup,
	Radio,
	Stack,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Prescription, PrescriptionStatus } from '@lib/types';
import typedKeys from '@lib/utils';

type PropTypes = {
	prescription?: Prescription;
	isOpen: boolean;
	onClose: () => void;
	updateStatus: (prescription: Prescription, newStatus: keyof typeof PrescriptionStatus) => Promise<void>;
};

const PrescriptionStatusForm = ({ prescription = null, isOpen, onClose, updateStatus }: PropTypes) => {
	const [status, setStatus] = useState<keyof typeof PrescriptionStatus>(prescription?.status ?? 'Pending');
	useEffect(() => {
		prescription && setStatus(prescription.status);

		return () => {
			setStatus('Pending');
		};
	}, [prescription]);

	const handleChange = event => {
		setStatus(event);
	};

	return prescription ? (
		<Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom' scrollBehavior='inside'>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					{`Prescription: `} <Code>{prescription.id}</Code>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<RadioGroup onChange={handleChange} value={status}>
						<Stack direction='row'>
							{typedKeys(PrescriptionStatus).map(k => (
								<Radio value={k}>{k}</Radio>
							))}
						</Stack>
					</RadioGroup>
				</ModalBody>
				<ModalFooter>
					<ButtonGroup gap={4}>
						<Button onClick={onClose}>Close</Button>
						<Button onClick={() => updateStatus(prescription, status)}>Update Status</Button>
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>
		</Modal>
	) : null;
};

export default PrescriptionStatusForm;
