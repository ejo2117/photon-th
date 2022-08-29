import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import PharmacyIcon from '@components/icons/PharmacyIcon';
import ProviderIcon from '@components/icons/ProviderIcon';

type PropTypes = {
	userType: 'Provider' | 'Pharmacist';
	setUserType: React.Dispatch<string>;
};

const LoginButton = ({ userType, setUserType }: PropTypes) => {
	return (
		<Flex
			onClick={() => {
				setUserType(userType);
			}}
			direction='column'
			align='center'
			justify='center'
			height={40}
			width={40}
			bg='gray.200'
			borderRadius='md'
		>
			{userType === 'Provider' ? <ProviderIcon /> : <PharmacyIcon />}
			<Heading as='h5' size='md'>
				{userType}
			</Heading>
		</Flex>
	);
};

export default LoginButton;
