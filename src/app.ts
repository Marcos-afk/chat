import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { connectToSocket } from './socket';
import path from 'path';

config();

const app = express();
const { serverHttp } = connectToSocket(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

export { serverHttp };
