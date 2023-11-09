type ReducerProps = {
	state: any;
	action: any;
};

const userAuthReducer = (
	state: ReducerProps['state'] | null = null,
	action: ReducerProps['action']
) => {
	switch (action.type) {
		case 'SET_USER':
			return {
				...state,
				user: action.user,
			};
		case 'SET_USER_NULL':
			return {
				...state,
				user: null,
			};
		default:
			return state;
	}
};

export default userAuthReducer;
