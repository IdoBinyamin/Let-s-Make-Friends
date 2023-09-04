import React, {
	useContext,
	useState,
	useEffect,
	createContext,
} from 'react';

interface AuthCtxProps {}

export const AuthContext =
	createContext<AuthCtxProps>({});

export const AuthProvider = ({
	children,
}: any) => {
	const [currUser, setCurrUser] =
		useState<any>(null);

	const updateCurrentUser = (user: {}) => {
		setCurrUser(user);
	};
	const values = {
		currUser,
		updateCurrentUser,
	};

	return (
		<AuthContext.Provider value={values}>
			{children}
		</AuthContext.Provider>
	);
};
