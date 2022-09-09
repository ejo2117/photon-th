/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { Patient } from '@lib/types';

type Inputs = {
	firstName: string;
	lastName: string;
};

type PropTypes = {
	addPatient: (data: Partial<Patient>) => Promise<void>;
	isOpen: boolean;
	onClose: () => void;
};

const PatientForm = ({ addPatient, isOpen, onClose }: PropTypes) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = data => {
		addPatient(data);
		reset();
		onClose();
	};

	return (
		<Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
			<ModalOverlay />
			<ModalContent>
				{/* Modal transition breaks with inclusion of 'as' prop */}
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader>Register a New Patient</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl isRequired>
							<FormLabel>First Name</FormLabel>
							<Input placeholder='First Name' {...register('firstName')} />
							<FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
						</FormControl>
						<FormControl isRequired mt={4}>
							<FormLabel>Last Name</FormLabel>
							<Input placeholder='Last Name' {...register('lastName')} />
							<FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose} mr={4}>
							Close
						</Button>
						<Button type='submit' isLoading={isSubmitting}>
							Register Patient
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
};

export default PatientForm;
