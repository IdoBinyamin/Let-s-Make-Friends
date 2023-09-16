import React, {
	useState,
	createContext,
} from 'react';

interface ChatCtxProps {
	rooms: [];
	setRooms: (rooms: []) => void;
	unfilteredrooms: [];
	setUnfilteredRooms: (rooms: []) => void;
}

export const ChatContext = createContext<ChatCtxProps>({
	rooms: [],
	setRooms: () => {},
	unfilteredrooms: [],
	setUnfilteredRooms: () => {},
});

export const ChatProvider = ({
	children,
}: any) => {
	const [rooms, setRooms] = useState([]);
	const [unfilteredrooms, setUnfilteredRooms] =
		useState([]);

	const values = {
		rooms,
		setRooms,
		unfilteredrooms,
		setUnfilteredRooms,
	};

	return (
		<ChatContext.Provider value={values}>
			{children}
		</ChatContext.Provider>
	);
};
