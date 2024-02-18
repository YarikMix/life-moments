export interface User {
	id: number,
	email: string,
	username: string,
	date_register: string,
	rating: number,
	subscribers_count: number,
	photo: string,
	subscribed: boolean
}

export interface Moment {
	id: number,
	author: User,
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
	author: User,
	content: string,
	date_created: string,
	likes: number,
	liked: boolean
}

export interface Subscribe {
	id: number,
	author: User,
	subscriber: User,
	date_subscribe: string
}

export interface LikeMoment {
	id: number,
	user: User,
	comment: Comment,
	date_created: string
}

export interface LikeComment {
	id: number,
	user: User,
	moment: Moment,
	date_created: string
}

export interface MomentTag {
	id: number,
	name: string
}

