export type AuthProps = {
	email: string;
	password: string;
};
export type SignUpProps = {
	email: string;
	password: string;
	name: string;
	photoURL: string;
};

export type UserInfoProps = {
	_id: string;
	displayName: string;
	email: string;
	photoURL: string;
};

export type RoomProps = {
	_Id: string;
	chatName: string;
	lastMessage: string;
	participants: string[];
	user: {};
	userB: {};
};

