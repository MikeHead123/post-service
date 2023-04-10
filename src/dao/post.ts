import { Service } from 'typedi';

import { Post, IPost } from '../models/post';

@Service()
export default class PostRepository {
  public async get(author?: string): Promise<IPost[]> {
    const find: {
      author?: string
    } = {};

    if (author) {
      find.author = author;
    }

    const posts = await Post.find(find).populate('author', 'name email _id').lean();
    return posts;
  }

  public async create({ title, text, author }): Promise<IPost> {
    const post = await Post.create({
      title,
      text,
      author,
    });
    return post;
  }
}
