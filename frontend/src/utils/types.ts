export interface I_User {
	id: string,
	email: string,
    firstName: string,
    lastName: string,
	date_register: string,
	rating: number,
	subscribers_count: number,
	photo: string,
	subscribed: boolean
}

export interface I_Moment {
	id: number,
	author: I_User,
	tags: MomentTag[],
	comments: Comment[],
	likes: number,
	title: string,
	content: string,
	date_created: string,
	image: string,
	liked: boolean
}

export interface Comment {
	id: number,
	author: I_User,
	content: string,
	date_created: string,
	likes: number,
	liked: boolean
}

export interface Subscribe {
	id: number,
	author: I_User,
	subscriber: I_User,
	date_subscribe: string
}

export interface LikeMoment {
	id: number,
	user: I_User,
	comment: Comment,
	date_created: string
}

export interface LikeComment {
	id: number,
	user: I_User,
	moment: I_Moment,
	date_created: string
}

export interface MomentTag {
	id: number,
	name: string
}

export type T_UserLoginCredentials = {
    email: string
    password: string
}

export type T_UserRegisterCredentials = {
    firstName: string
    lastName: string
    phone: string
    email: string
    password: string
}