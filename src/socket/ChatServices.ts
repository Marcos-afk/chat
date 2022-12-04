import { io } from '../app';
import { container } from 'tsyringe';
import { CreateUserService } from '../services/createUser/CreateUserService';
import { FindUsersServices } from '../services/findUsers/FindUsersService';

io.on('connect', socket => {
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
});
