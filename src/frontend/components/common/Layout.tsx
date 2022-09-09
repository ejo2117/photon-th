import React from 'react';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<Box minH='100vh' p={8}>
			<Outlet />
		</Box>
	);
};

export default Layout;
