import React from 'react';
import { HStack } from '@chakra-ui/react';
import LoginButton from '@components/login/LoginButton';
import { useAuth } from '@hooks/useAuth';
import { Navigate } from 'react-router-dom';

const Login = () => {
	const { userType } = useAuth();
	return userType ? (
		<Navigate to={`/${userType}`} />
	) : (
		<HStack maxW={375} h='100%' spacing={4} bg='gray.400' borderRadius='md' p={4}>
			<LoginButton userType='provider' />
			<LoginButton userType='pharmacist' />
		</HStack>
	);
};

export default Login;
