import React, {
	useState,
	createContext,
} from 'react';

interface PostsCtxProps {
	postsList: [];
	setPostsList: (post: {}) => void;
	friendsList: [];
	setFriendsList: (post: {}) => void;
	newComment: {};
	setNewComment: (comment: {}) => void;
}

export const PostsContext =
	createContext<PostsCtxProps>({
		postsList: [],
		setPostsList: () => [],
		friendsList: [],
		setFriendsList: () => [],
		newComment: {},
		setNewComment: () => {},
	});

export const PostsProvider = ({
	children,
}: any) => {
	const [postsList, setPostsList] = useState(
		[]
	);
	const [friendsList, setFriendsList] =
		useState([]);
	const [newComment, setNewComment] =
		useState('');

	const values = {
		postsList,
		setPostsList,
		friendsList,
		setFriendsList,
		newComment,
		setNewComment,
	};

	return (
		<PostsContext.Provider value={values}>
			{children}
		</PostsContext.Provider>
	);
};
