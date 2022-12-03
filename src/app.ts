import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { connectToSocket } from './socket';
import path from 'path';
import { connectionToDb } from 'mongo';

config();

const app = express();
const { io, serverHttp } = connectToSocket(app);
connectionToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

export { io, serverHttp };
