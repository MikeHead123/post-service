import { Service, Inject } from 'typedi';
import PostRepository from '../dao/post';

@Service()
export default class PostService {
  private readonly postRepo: PostRepository;

  constructor(@Inject() postRepo: PostRepository) {
    this.postRepo = postRepo;
  }

  public async get(author?: string) {
    const post = await this.postRepo.get(author);
    return post;
  }

  public async create({ title, text, author }) {
    const post = await this.postRepo.create({
      title,
      text,
      author,
    });

    return post;
  }
}
