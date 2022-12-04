import { io } from '../app';
import { container } from 'tsyringe';
import { CreateUserService } from '../services/createUser/CreateUserService';
import { FindUsersServices } from '../services/findUsers/FindUsersService';
import { CreateRoomService } from '../services/createRoom/CreateRoomService';
import { FindUserBySocketIdService } from '../services/findUserBySocketId/FindUserBySocketIdService';
import { FindChatRoomByUsers } from '../services/findChatRoom/FindChatRoomByUsers';
import { CreateMessageService } from '../services/createMessage/CreateMessageService';
import { Signale } from 'signale';
import { FindMessagesByChatRoom } from '../services/findMessagesByChatRoom/FindMessagesByChatRoom';

io.on('connect', socket => {
  socket.on('disconnect', () => {
    const log = new Signale();
    log.scope('Socket').info('Socket disconnected');
  });

  socket.on('start', async data => {
    const { name, email, avatar } = data;
    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({ name, email, avatar, socket_id: socket.id });

    socket.broadcast.emit('new_users', user);
  });

  socket.on('get_users', async callback => {
    const findUsersService = container.resolve(FindUsersServices);
    const users = await findUsersService.execute();
    callback(users);
  });

  socket.on('start_chat', async (data, callback) => {
    const { idUser } = data;
    const createRoomService = container.resolve(CreateRoomService);
    const findUserBySocketIdService = container.resolve(FindUserBySocketIdService);
    const findChatRoomByUsers = container.resolve(FindChatRoomByUsers);
    const findMessagesByChatRoom = container.resolve(FindMessagesByChatRoom);

    const userLogged = await findUserBySocketIdService.execute(socket.id);
    let room = await findChatRoomByUsers.execute([idUser, userLogged?._id]);

    if (!room) {
      room = await createRoomService.execute([idUser, userLogged?._id]);
    }

    const messages = await findMessagesByChatRoom.execute(room.idChatRoom);

    socket.join(room.idChatRoom);
    callback({ room, messages });
  });

  socket.on('message', async data => {
    const { message, idChatRoom } = data;

    const findUserBySocketIdService = container.resolve(FindUserBySocketIdService);
    const createMessageService = container.resolve(CreateMessageService);

    const user = await findUserBySocketIdService.execute(socket.id);

    const createdMessage = await createMessageService.execute({
      to: String(user?._id),
      text: message,
      roomId: idChatRoom,
    });

    io.to(idChatRoom).emit('message', { message: createdMessage, user });
  });
});
