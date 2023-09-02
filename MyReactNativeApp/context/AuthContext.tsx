import React, {
	useContext,
	useState,
	useEffect,
	createContext,
} from 'react';

interface AuthProps {
	username: string;
	email: string;
	password: string;
	usernameChangeHandler: (text: string) => void;
	emailChangeHandler: (text: string) => void;
	passwordChangeHandler: (text: string) => void;
	loadingChangeHandler: (x: boolean) => void;
}

export const AuthContext =
	createContext<AuthProps>({});

export const AuthProvider = ({
	children,
}: any) => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const usernameChangeHandler = (
		text: string
	) => {
		setUsername(text);
	};
	const emailChangeHandler = (text: string) => {
		setEmail(text);
	};
	const passwordChangeHandler = (
		text: string
	) => {
		setPassword(text);
	};
	const loadingChangeHandler = (x: boolean) => {
		setLoading(x);
	};

	const values = {
		username,
		email,
		password,
		loading,
		usernameChangeHandler,
		emailChangeHandler,
		passwordChangeHandler,
		loadingChangeHandler,
	};

	return (
		<AuthContext.Provider value={values}>
			{children}
		</AuthContext.Provider>
	);
};
