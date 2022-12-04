import { injectable } from 'tsyringe';
import { User } from '../../mongo/schemas/users/User';

@injectable()
export class FindUserBySocketIdService {
  public async execute(socket_id: string) {
    return await User.findOne({ socket_id });
  }
}
