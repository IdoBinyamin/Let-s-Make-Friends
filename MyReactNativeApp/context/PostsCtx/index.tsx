import React, {
	useState,
	createContext,
} from 'react';

interface PostsCtxProps {
	postsList: [];
	setPostsList: (post: {}) => void;
}

export const PostsContext =
	createContext<PostsCtxProps>({
		postsList: [],
		setPostsList: () => [],
	});

export const PostsProvider = ({
	children,
}: any) => {
	const [postsList, setPostsList] = useState(
		[]
	);

	const values = {
		postsList,
		setPostsList,
	};

	return (
		<PostsContext.Provider value={values}>
			{children}
		</PostsContext.Provider>
	);
};
