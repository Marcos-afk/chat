import mongoose from 'mongoose';
import { ChatRoomSchemaProps } from './ChatRoomSchemaProps';
import { v4 as uuidV4 } from 'uuid';

const ChatRoomSchema = new mongoose.Schema({
  idUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
  idChatRoom: { type: String, default: uuidV4() },
});

export const ChatRoom = mongoose.model<ChatRoomSchemaProps>('ChatRooms', ChatRoomSchema);
