import { Service, Inject } from 'typedi';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ClientError from '../common/error';
import UserService from './user';
import config from '../common/constants';

interface ILoginData {
  password: string;
  email: string;
}

@Service()
export default class AuthService {
  private readonly userService: UserService;

  constructor(@Inject() userService: UserService) {
    this.userService = userService;
  }

  public async login({ password, email }: ILoginData) {
    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new ClientError('User not found', 404);
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new ClientError('Password or login is not valid', 401);
    }

    const token = jwt.sign({ user }, config.SECRET, {
      expiresIn: 86400,
    });

    return { token, userId: user._id };
  }
}
