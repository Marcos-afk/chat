import { injectable } from 'tsyringe';
import { Message } from '../../mongo/schemas/messages/Message';
import { CreateMessageServiceDto } from './CreateMessageServiceDto';

@injectable()
export class CreateMessageService {
  public async execute({ to, text, roomId }: CreateMessageServiceDto) {
    return await Message.create({
      to,
      text,
      roomId,
    });
  }
}
