import React, {
	useState,
	createContext,
} from 'react';

interface ChatCtxProps {
	rooms: [];
	setRooms: (room: []) => void;

}

export const ChatContext = createContext<ChatCtxProps>({
	rooms: [],
	setRooms: () => {},
});

export const ChatProvider = ({
	children,
}: any) => {
	const [rooms, setRooms] = useState([]);
	

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
