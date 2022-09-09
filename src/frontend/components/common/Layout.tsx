import React from 'react';
import { Center } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<Center minH='100vh' p={8}>
			<Outlet />
		</Center>
	);
};

export default Layout;
