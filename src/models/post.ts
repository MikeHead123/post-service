import { Schema, model, Types } from 'mongoose';

interface IPost {
  _id: Types.ObjectId;
  title: string;
  text: string;
  author: Types.ObjectId;
}

const postSchema = new Schema<IPost>({
  title: String,
  text: String,
  author: { type: Types.ObjectId, ref: 'User' },
});
const Post = model<IPost>('Post', postSchema);

export { Post, IPost };
