import {
	prop,
	getModelForClass,
	modelOptions,
	pre,
} from '@typegoose/typegoose';
import bcrypt from 'bcrypt';

@pre<User>('save', async function (next) {
	if (this.isModified('password') || this.isNew) {
		const salt = await bcrypt.genSalt(10);

		this.password = await bcrypt.hash(this.password, salt);
	}

	next();
})
@modelOptions({ schemaOptions: { collection: 'users' } })
export class User {
	@prop({
		type: String,
		required: true,
		unique: true,
		validate: /^[a-zA-Z0-9]+$/,
	})
	public email: string;

	@prop({
		type: String,
		required: true,
		unique: true,
		validate: /^[a-zA-Z0-9]+$/,
	})
	public password: string;
}

const UserModel = getModelForClass(User);

export default UserModel;
