import React from 'react';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

const PatientForm = ({ addPatient }) => {
	return (
		<form
			onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
				event.preventDefault();
			}}
		>
			<FormControl isRequired>
				<FormLabel>First Name</FormLabel>
				<Input placeholder='First Name' />
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Last Name</FormLabel>
				<Input placeholder='Last Name' />
			</FormControl>
			<Button type='submit'>Create Patient</Button>
		</form>
	);
};

export default PatientForm;
