import jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import { IUser } from '../models/user';
import config from '../common/constants';

@Service()
export default class JwtSignerService {
  public sign(user: IUser): string {
    const token = jwt.sign({ user }, config.SECRET, {
      expiresIn: config.TOKEN_TTL,
    });
    return token;
  }
}
