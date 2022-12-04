import { injectable } from 'tsyringe';
import { ChatRoom } from '../../mongo/schemas/chatRooms/ChatRoom';

@injectable()
export class FindChatRoomByIdService {
  public async execute(idChatRoom: string) {
    return await ChatRoom.findOne({ idChatRoom }).populate('idUsers').exec();
  }
}
