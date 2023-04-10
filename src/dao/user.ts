import { Service } from 'typedi';

const User = require('../models/user');

@Service()
export default class UserRepository {
  public async getById(id: string) {
    const user = await User.findById(id).populate('posts', '_id postTitle');
    return user;
  }

  public async getByEmail(email: string) {
    const user = await User.findOne({ email });
    return user;
  }

  public async create({ userName, email, password }) {
    const user = await User.create({
      userName,
      email,
      password,
    });
    return user;
  }
}
