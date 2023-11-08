import React, {
	useState,
	createContext,
} from 'react';

interface PostsCtxProps {
	posts: [{}];
	setPosts: (post: {}) => void;
}

export const PostsContext =
	createContext<PostsCtxProps>({
		posts: [{}],
		setPosts: () => {},
	});

export const PostsProvider = ({
	children,
}: any) => {
	const [posts, setPosts] = useState([]);

	const values = {
		posts,
		setPosts,
	};

	return (
		<PostsContext.Provider value={values}>
			{children}
		</PostsContext.Provider>
	);
};
