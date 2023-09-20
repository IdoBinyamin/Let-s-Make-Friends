import React, {
	useState,
	createContext,
} from 'react';

interface ChatCtxProps {
	rooms: [];
	setRooms: (room: []) => void;
	unfilteredRooms: [];
	setUnfilteredRooms: (room: []) => void;
}

export const ChatContext = createContext<ChatCtxProps>({
	rooms: [],
	setRooms: () => {},
	unfilteredRooms: [],
	setUnfilteredRooms: () => {},
});

export const ChatProvider = ({
	children,
}: any) => {
	const [rooms, setRooms] = useState([]);
	const [unfilteredRooms, setUnfilteredRooms] =
		useState([]);

	const values = {
		rooms,
		setRooms,
		unfilteredRooms,
		setUnfilteredRooms,
	};

	return (
		<ChatContext.Provider value={values}>
			{children}
		</ChatContext.Provider>
	);
};
