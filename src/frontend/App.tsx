import React, { useState } from 'react';
import { Center } from '@chakra-ui/react';
import Login from '@components/login/Login';
import ProviderView from '@components/provider/ProviderView';
import PharmacistView from '@components/pharmacist/PharmacistView';

const App = () => {
	const [userType, setUserType] = useState(null);

	return (
		<Center minH='100vh' p={8}>
			{!userType && <Login setUserType={setUserType} />}
			{userType === 'Pharmacist' && <PharmacistView />}
			{userType === 'Provider' && <ProviderView />}
		</Center>
	);
};

export default App;
