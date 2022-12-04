import { ObjectId } from 'mongoose';
import { injectable } from 'tsyringe';
import { ChatRoom } from '../../mongo/schemas/chatRooms/ChatRoom';

@injectable()
export class FindChatRoomByUsers {
  public async execute(idUsers: ObjectId[]) {
    return await ChatRoom.findOne({
      idUsers: {
        $all: idUsers,
      },
    }).exec();
  }
}
