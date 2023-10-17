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
	name: string;
	email: string;
	photoURL: string;
};

export type RoomProps = {
	participants: any[];
	participantsArray: string[];
	roomId: string;
};
