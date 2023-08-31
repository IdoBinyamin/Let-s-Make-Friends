import React, {
	useContext,
	useState,
	useEffect,
	createContext,
} from 'react';

interface AuthProps {
	user: any;
	initialized: boolean;
}

export const AuthContext =
	createContext<AuthProps>({});

export const AuthProvider = ({
	children,
}: any) => {
	const value: {} = {};
	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};
