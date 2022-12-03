import { Express } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { Signale } from 'signale';

export const connectToSocket = (app: Express) => {
  const log = new Signale();
  const serverHttp = http.createServer(app);
  const io = new Server(serverHttp, { cors: { origin: '*' } });

  io.on('connection', socket => {
    log.scope('Socket').success(`Socket running: ${socket.id}`);
  });

  return { io, serverHttp };
};
