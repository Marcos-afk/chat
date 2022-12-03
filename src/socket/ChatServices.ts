import { io } from '../app';

io.on('connect', socket => {
  socket.emit('chat_started', {
    message: 'Seu chat foi iniciado',
  });
});
