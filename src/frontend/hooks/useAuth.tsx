import { UserType } from '@lib/types';
import React, { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useSessionStorage from './useSessionStorage';

const AuthContext = createContext(undefined);

interface ContextTypes {
	userType: UserType;
	loginAs: (type: UserType) => void;
	logout: () => void;
}

export const AuthProvider = ({ children }) => {
	const [userType, setUserType] = useSessionStorage('userType', null);
	const navigate = useNavigate();

	const loginAs = (type: UserType) => {
		setUserType(type);
		navigate(`/${type}`);
	};

	const logout = () => {
		setUserType(null);
		navigate('/login', { replace: true });
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const value = useMemo(() => ({ userType, loginAs, logout }), [userType]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext<ContextTypes>(AuthContext);
};
