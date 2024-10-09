import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import Models from '../../models/Models';
import Migrations from '../../migrations/Migrations';

dotenv.config();

let connectDatabase = (new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  schema: process.env.DB_NAME_TEST,
  entities: Models,
  migrations: Migrations,
  subscribers: [],
  logging: false,
  synchronize: false,
}));

// Função para garantir que o schema seja criado ao inicializar a conexão
const initializeDatabase: any = async () => {
  try {
    await connectDatabase.initialize();

    // Criação automática do schema se não existir
    await connectDatabase.query(`CREATE SCHEMA IF NOT EXISTS "${process.env.DB_NAME_TEST}";`);
    console.log("Banco de dados conectado e schema criado com sucesso!");

    await connectDatabase.runMigrations()

    console.log("executou as migrations!!!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    throw error;
  }
};

// Função para fechar a conexão com o banco de dados
const closeDatabase = async () => {
  try {
    if (connectDatabase.isInitialized) {
      await connectDatabase.destroy();
      console.log("Conexão com o banco de dados fechada com sucesso.");
    }
  } catch (error) {
    console.error("Erro ao fechar a conexão com o banco de dados:", error);
    throw error;
  }
};

export { initializeDatabase, connectDatabase, closeDatabase };
