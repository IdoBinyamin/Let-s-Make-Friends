import React, {
	useContext,
	useState,
	useEffect,
	createContext,
} from 'react';

interface ChatCtxProps {
	rooms: any[];
	setRooms: (room: any) => void;
}

export const ChatContext =
	createContext<ChatCtxProps>({
		rooms: [],
		setRooms: () => {},
	});

export const ChatProvider = ({
	children,
}: any) => {
	const [rooms, setRooms] = useState([]);

	// const updateRooms = (room: {}) => {
	// 	setRooms([...rooms, room]);
	// };
	const values = {
		rooms,
		setRooms,
	};

	return (
		<ChatContext.Provider value={values}>
			{children}
		</ChatContext.Provider>
	);
};
