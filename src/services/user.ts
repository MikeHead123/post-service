import { Service, Inject } from 'typedi';
import UserRepository from '../dao/user';

const bcrypt = require('bcryptjs');
const ClientError = require('../common/error');

@Service()
export default class UserService {
  private readonly userRepo: UserRepository;

  constructor(@Inject() userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  public async get(id: string) {
    try {
      const user = await this.userRepo.getById(id);
      return user;
    } catch (err) {
      console.log(err);
      throw new ClientError();
    }
  }

  public async create({ password, email, userName }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 8);

      const checkExistsUser = await this.userRepo.getByEmail(email);

      if (checkExistsUser) {
        throw new ClientError('User already exists', 400);
      }

      const user = await this.userRepo.create({
        userName,
        email,
        password: hashedPassword,
      });

      return user;
    } catch (err) {
      throw new ClientError();
    }
  }
}
