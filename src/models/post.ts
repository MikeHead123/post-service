import { Schema, model, Types } from 'mongoose';

interface IPost {
  _id: Types.ObjectId;
  postTitle: string;
  postBody: string;
  author: Types.ObjectId;
}

const postSchema = new Schema<IPost>({
  postTitle: String,
  postBody: String,
  author: { type: Types.ObjectId, ref: 'User' },
});
const Post = model<IPost>('Post', postSchema);

export { Post, IPost };
