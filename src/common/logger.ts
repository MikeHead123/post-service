import { Logger, ILogObj } from 'tslog';
import { Service } from 'typedi';

@Service()
export default class CustomLogger extends Logger<ILogObj> {
  constructor(private readonly name: string = 'CustomLogger') {
    super();
  }
}
