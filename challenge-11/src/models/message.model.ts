import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'messages' } })
export class Message {
	@prop({
		type: String,
		required: true,
		validate: /^[a-zA-Z0-9]+$/,
	})
	public email: string;

	@prop({
		type: String,
		required: true,
	})
	public name: string;

	@prop({
		type: String,
		required: true,
	})
	public lastName: string;

	@prop({
		type: String,
		required: true,
	})
	public age: number;

	@prop({
		type: String,
		required: true,
	})
	public alias: string;

	@prop({
		type: String,
		required: true,
	})
	public avatar: string;

	@prop({
		type: String,
		required: true,
	})
	public text: string;
}

const MessageModel = getModelForClass(Message);

export default MessageModel;
