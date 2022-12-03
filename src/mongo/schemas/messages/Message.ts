import mongoose from 'mongoose';
import { MessageSchemaProps } from './MessageSchemaProps';

const MessageSchema = new mongoose.Schema({
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  text: String,
  created_at: { type: Date, default: Date.now() },
  roomId: { type: String, ref: 'ChatRooms' },
});

export const Message = mongoose.model<MessageSchemaProps>('Messages', MessageSchema);
