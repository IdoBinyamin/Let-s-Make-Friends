import React, {
	useContext,
	useState,
	useEffect,
	createContext,
} from 'react';

interface ChatCtxProps {
	rooms: any[];
	setRooms: (room: any) => void;
	unfilteredrooms: any[];
	setUnfilteredRooms: (room: any) => void;
}

export const ChatContext = createContext<ChatCtxProps>({
	rooms: [],
	setRooms: () => {},
	unfilteredrooms: [],
	setUnfilteredRooms: (room: {}) => {},
});

export const ChatProvider = ({
	children,
}: any) => {
	const [rooms, setRooms] = useState([]);
	const [unfilteredrooms, setUnfilteredRooms] =
		useState([]);

	// const updateRooms = (room: {}) => {
	// 	setRooms([...rooms, room]);
	// };
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
