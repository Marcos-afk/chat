import { UserSchemaProps } from '../users/UserSchemaProps';

export interface ChatRoomSchemaProps {
  idUsers: UserSchemaProps[];
  idChatRoom: string;
}
