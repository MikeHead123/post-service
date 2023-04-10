import { Schema, model, Types } from 'mongoose';

interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: String,
  email: String,
  password: String,
});

const User = model<IUser>('User', userSchema);

export { User, IUser };
