import mongoose from 'mongoose';
import { UserSchemaProps } from './UserSchemaProps';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  socket_id: String,
});

export const User = mongoose.model<UserSchemaProps>('Users', UserSchema);
