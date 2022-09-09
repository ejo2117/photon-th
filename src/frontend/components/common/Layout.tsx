import React from 'react';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav';

const Layout = () => {
	return (
		<Box minH='100vh' position='relative'>
			<Nav />
			<Outlet />
		</Box>
	);
};

export default Layout;
