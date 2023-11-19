import React, {
	useState,
	createContext,
} from 'react';

interface PostsCtxProps {
	postsList: [];
	setPostsList: (post: {}) => void;
	friendsList: [];
	setFriendsList: (post: {}) => void;
}

export const PostsContext = createContext<PostsCtxProps>(
	{
		postsList: [],
		setPostsList: () => [],
		friendsList: [],
		setFriendsList: () => [],
	}
);

export const PostsProvider = ({
	children,
}: any) => {
	const [postsList, setPostsList] = useState(
		[]
	);
	const [friendsList, setFriendsList] =
		useState([]);

	const values = {
		postsList,
		setPostsList,
		friendsList,
		setFriendsList,
	};

	return (
		<PostsContext.Provider value={values}>
			{children}
		</PostsContext.Provider>
	);
};
