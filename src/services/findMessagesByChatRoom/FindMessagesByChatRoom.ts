import { injectable } from 'tsyringe';
import { Message } from '../../mongo/schemas/messages/Message';

@injectable()
export class FindMessagesByChatRoom {
  public async execute(roomId: string) {
    return await Message.find({ roomId }).populate('to').exec();
  }
}
