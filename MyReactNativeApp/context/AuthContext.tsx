import React, {
	useContext,
	useState,
	useEffect,
	createContext,
} from 'react';

interface AuthCtxProps {}

export const AuthContext = createContext<AuthCtxProps>(
	{}
);

export const AuthProvider = ({
	children,
}: any) => {
	const values = {};

	return (
		<AuthContext.Provider value={values}>
			{children}
		</AuthContext.Provider>
	);
};
