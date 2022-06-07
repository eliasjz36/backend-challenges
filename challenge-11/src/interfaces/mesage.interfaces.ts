export interface IAuthor {
	id: string;
	name: string;
	lastName: string;
	age: number;
	alias: string;
	avatar: string;
}

export interface IMessage {
	author: IAuthor;
	text: string;
}
