import { CreateUserServiceDto } from './CreateUserServiceDto';
import { injectable } from 'tsyringe';
import { User } from '../../mongo/schemas/users/User';

@injectable()
export class CreateUserService {
  public async execute({ name, email, avatar, socket_id }: CreateUserServiceDto) {
    const userEmailAlreadyExist = await User.findOne({ email }).exec();

    if (userEmailAlreadyExist) {
      const user = await User.findOneAndUpdate(
        { _id: userEmailAlreadyExist._id },
        { $set: { name, avatar, socket_id } },
        { new: true },
      );

      return user;
    }

    return await User.create({ name, email, avatar, socket_id });
  }
}
