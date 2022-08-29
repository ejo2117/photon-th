import React, { useState } from 'react';
import { Center } from '@chakra-ui/react';
import Login from '@components/login/Login';
import ProviderView from '@components/provider/ProviderView';

const App = () => {
	const [userType, setUserType] = useState(null);

	return (
		<Center minH='100vh' p={8}>
			{!userType && <Login setUserType={setUserType} />}
			{userType === 'Pharmacist' && <ProviderView />}
			{userType === 'Provider' && <ProviderView />}
		</Center>
	);
};

export default App;
