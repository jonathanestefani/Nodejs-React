import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import Models from '../models/Models';
import Migrations from '../migrations/Migrations';

dotenv.config();

const connectDatabase = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  entities: Models,
  migrations: Migrations,
  subscribers: [],
  logging: false,
  synchronize: false,
});

export default connectDatabase;
