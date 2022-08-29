import React, { useState, useEffect } from 'react';
import LoginButton from '@components/LoginButton';
import { createPatient, getPatients } from '@services/database';
import { HStack, Center } from '@chakra-ui/react';

const App = () => {
	// const [patients, setPatients] = useState(null);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const newPatient = await createPatient({
	// 			firstName: 'John',
	// 			lastName: 'Doe',
	// 		});
	// 		setPatients([newPatient]);
	// 	};
	// 	fetchData();
	// }, []);

	return (
		<Center minH='100vh' p={8}>
			<HStack maxW={375} spacing={4} bg='gray.400' borderRadius='md' p={4}>
				<LoginButton userType='Provider' />
				<LoginButton userType='Pharmacist' />
			</HStack>
		</Center>
	);
};

export default App;
