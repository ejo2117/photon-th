import React from 'react';
import { Heading, Center, HStack, VStack, Box } from '@chakra-ui/react';
import LoginButton from '@components/login/LoginButton';
import { useAuth } from '@hooks/useAuth';
import { Navigate } from 'react-router-dom';

const Login = () => {
	const { userType } = useAuth();
	return userType ? (
		<Navigate to={`/${userType}`} />
	) : (
		<Center minH='100vh' p={8}>
			<VStack>
				<Heading size='sm'>Welcome to Photon Health!</Heading>
				<Box>Select a user below to begin</Box>
				<HStack maxW={375} h='100%' spacing={4} bg='gray.400' borderRadius='md' p={4}>
					<LoginButton userType='provider' />
					<LoginButton userType='pharmacist' />
				</HStack>
			</VStack>
		</Center>
	);
};

export default Login;
