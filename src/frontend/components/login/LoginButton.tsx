import React from 'react';
import { Flex, Heading, Tooltip } from '@chakra-ui/react';
import PharmacyIcon from '@components/icons/PharmacyIcon';
import ProviderIcon from '@components/icons/ProviderIcon';
// import { useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { UserType } from '@lib/types';
import { capitalizeFirstLetter } from '@lib/utils';

type PropTypes = {
	userType: UserType;
};

const LoginButton = ({ userType }: PropTypes) => {
	// const navigate = useNavigate();
	const { loginAs } = useAuth();

	const tooltips = {
		provider: 'Manage patients, and write prescriptions',
		pharmacist: 'Manage prescription data',
	};

	return (
		<Tooltip label={tooltips[userType]} aria-label='A tooltip'>
			<Flex
				onClick={() => {
					// setUserType(userType);
					// navigate(`/${userType.toLowerCase()}`);
					loginAs(userType);
				}}
				direction='column'
				align='center'
				justify='center'
				height={40}
				width={40}
				bg='gray.200'
				borderRadius='md'
			>
				{userType === 'provider' ? <ProviderIcon /> : <PharmacyIcon />}
				<Heading as='h5' size='md'>
					{capitalizeFirstLetter(userType)}
				</Heading>
			</Flex>
		</Tooltip>
	);
};

export default LoginButton;
