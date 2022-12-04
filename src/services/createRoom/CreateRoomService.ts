import { injectable } from 'tsyringe';
import { ChatRoom } from '../../mongo/schemas/chatRooms/ChatRoom';

@injectable()
export class CreateRoomService {
  public async execute(idUsers: string[]) {
    return await ChatRoom.create({ idUsers });
  }
}
