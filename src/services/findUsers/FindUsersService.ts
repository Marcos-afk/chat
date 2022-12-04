import { injectable } from 'tsyringe';
import { User } from '../../mongo/schemas/users/User';

@injectable()
export class FindUsersServices {
  public async execute() {
    return await User.find();
  }
}
