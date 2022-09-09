import React from 'react';
import { useAuth } from '@hooks/useAuth';
import { Navigate } from 'react-router-dom';

const LoggedInRoute = ({ acceptedType, children }) => {
	const { userType } = useAuth();
	return userType === acceptedType ? children : <Navigate to='/login' />;
};

export default LoggedInRoute;
