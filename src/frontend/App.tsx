import React from 'react';

import { Navigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';

const App = () => {
	const { userType } = useAuth();

	return userType ? <Navigate to={`/${userType}`} /> : <Navigate to='/login' />;
};

export default App;
