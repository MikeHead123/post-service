import { Service, Inject } from 'typedi';
import * as bcrypt from 'bcryptjs';
import ClientError from '../common/error';
import UserRepository from '../dao/user';

@Service()
export default class UserService {
  private readonly userRepo: UserRepository;

  constructor(@Inject() userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  public async get(id: string) {
    const user = await this.userRepo.getById(id);
    return user;
  }

  public async create({ password, email, name }) {
    const hashedPassword = await bcrypt.hash(password, 8);

    const checkExistsUser = await this.userRepo.getByEmail(email);

    if (checkExistsUser) {
      throw new ClientError('User already exists', 400);
    }

    const user = await this.userRepo.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
