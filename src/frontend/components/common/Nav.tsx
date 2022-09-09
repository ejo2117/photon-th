import { Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import React from 'react';
import { useAuth } from '@hooks/useAuth';
import PharmacyIcon from '@components/icons/PharmacyIcon';
import ProviderIcon from '@components/icons/ProviderIcon';
import { UserType } from '@lib/types';

const Nav = () => {
	const { userType, logout } = useAuth();

	const getIconForUser = (ut: UserType) => {
		switch (ut) {
			case 'provider':
				return <ProviderIcon />;
			case 'pharmacist':
				return <PharmacyIcon />;
			default:
				return null;
		}
	};

	return (
		<Flex
			bgColor='gray.200'
			borderBottom='1px'
			borderColor='gray.500'
			height={16}
			p={4}
			align='center'
			position='sticky'
			top={0}
			zIndex='2'
		>
			<Heading as='h2' size='sm'>
				Photon Health
			</Heading>
			{getIconForUser(userType)}
			<Spacer />
			{userType && <Button onClick={logout}>Logout</Button>}
		</Flex>
	);
};

export default Nav;
