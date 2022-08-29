import React from 'react';
import { HStack } from '@chakra-ui/react';
import LoginButton from '@components/login/LoginButton';

const Login = ({ setUserType }: { setUserType: React.Dispatch<string> }) => {
	return (
		<HStack maxW={375} spacing={4} bg='gray.400' borderRadius='md' p={4}>
			<LoginButton userType='Provider' setUserType={setUserType} />
			<LoginButton userType='Pharmacist' setUserType={setUserType} />
		</HStack>
	);
};

export default Login;
