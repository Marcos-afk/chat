import { User } from 'mongo/schemas/users/User';
import { CreateUserServiceDto } from './CreateUserServiceDto';
import { injectable } from 'tsyringe';

@injectable()
export class CreateUserService {
  public async execute({ name, email, avatar, socket_id }: CreateUserServiceDto) {
    const userEmailAlreadyExist = await User.findOne({ email }).exec();

    if (userEmailAlreadyExist) {
      const user = await User.findOneAndUpdate(
        { _id: userEmailAlreadyExist._id },
        { $set: { name, avatar, socket_id } },
      );

      return user;
    }

    return await User.create({ name, email, avatar, socket_id });
  }
}
