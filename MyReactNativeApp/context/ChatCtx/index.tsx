import React, {
	useState,
	createContext,
} from 'react';

interface ChatCtxProps {
	rooms: [];
	setRooms: (room: []) => void;
	searchedRooms: [];
	setSearchedRooms: (room: []) => void;
	setIsSliding: (isSliding: boolean) => void;
	isSliding: boolean;
}

export const ChatContext =
	createContext<ChatCtxProps>({
		isSliding: false,
		setIsSliding: () => {},
		rooms: [],
		setRooms: () => {},
		searchedRooms: [],
		setSearchedRooms: () => {},
	});

export const ChatProvider = ({
	children,
}: any) => {
	const [rooms, setRooms] = useState([]);
	const [searchedRooms, setSearchedRooms] =
		useState([]);
	const [isSliding, setIsSliding] =
		useState(false);

	const values = {
		rooms,
		setRooms,
		isSliding,
		setIsSliding,
		searchedRooms,
		setSearchedRooms,
	};

	return (
		<ChatContext.Provider value={values}>
			{children}
		</ChatContext.Provider>
	);
};
