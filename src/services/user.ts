import { Service, Inject } from 'typedi';
import * as bcrypt from 'bcryptjs';
import { ClientError } from '../common/error';
import UserRepository from '../dao/user';
import { IUser } from '../models/user';

@Service()
export default class UserService {
  private readonly userRepo: UserRepository;

  constructor(@Inject() userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  public async getById(id: string): Promise<IUser> {
    const user = await this.userRepo.getById(id);
    return user;
  }

  public async getByEmail(email: string): Promise<IUser> {
    const user = await this.userRepo.getByEmail(email);
    return user;
  }

  public async create({ password, email, name }): Promise<IUser> {
    const checkExistsUser = await this.userRepo.getByEmail(email);

    if (checkExistsUser) {
      throw new ClientError('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await this.userRepo.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
