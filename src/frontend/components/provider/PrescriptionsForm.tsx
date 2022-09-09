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
import { AnimatePresence, motion } from 'framer-motion';
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
			<ModalContent border='1px' borderColor='black'>
				<ModalHeader>{`${patient.firstName}'s Prescriptions`}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{patient.prescriptions.length ? (
						<VStack as='ul' gap={2}>
							<AnimatePresence mode='popLayout'>
								{patient.prescriptions
									.map(p => (
										<motion.div
											layout
											key={p.id}
											initial={{ scale: 0.8, opacity: 0, y: -50 }}
											animate={{ scale: 1, opacity: 1, y: 0 }}
											transition={{ type: 'spring', restDelta: 0.5 }}
											style={{ width: '100%' }}
										>
											<PrescriptionCard key={p.id} prescription={p} />
										</motion.div>
									))
									.reverse()}
							</AnimatePresence>
						</VStack>
					) : (
						'This Patient has no Prescriptions'
					)}
				</ModalBody>
				<ModalFooter>
					<ButtonGroup gap={4}>
						<Button onClick={onClose} colorScheme='gray' border='1px' borderColor='gray.500'>
							Close
						</Button>
						<Button onClick={() => writeRx(patient)} colorScheme='blue' border='1px' borderColor='blue.800'>
							Write New Prescription
						</Button>
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>
		</Modal>
	) : null;
};

export default PrescriptionsForm;
