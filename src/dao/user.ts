import { Service } from 'typedi';

import { User, IUser } from '../models/user';

@Service()
export default class UserRepository {
  public async getById(id: string): Promise<IUser> {
    const user = await User.findById(id).populate('posts', '_id postTitle').lean();
    return user;
  }

  public async getByEmail(email: string): Promise<IUser> {
    const user = await User.findOne({ email });
    return user;
  }

  public async create({ name, email, password }): Promise<IUser> {
    const user = await User.create({
      name,
      email,
      password,
    });
    return user;
  }
}
