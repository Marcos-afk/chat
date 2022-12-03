import { config } from 'dotenv';
import mongoose from 'mongoose';
import { Signale } from 'signale';

config();

export const connectionToDb = async () => {
  const log = new Signale();

  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    return log.scope('Database').success('DataBase connected');
  } catch {
    log.scope('DataBase').fatal('DataBase could not connected');
    process.exit(1);
  }
};
