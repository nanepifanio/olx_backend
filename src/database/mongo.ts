import { ConnectOptions, connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const mongoConnect = async () => {
  try {
    console.log('Conectando...');
    await connect(
      process.env.MONGO_URL as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );
    console.log('Conexao feita com sucesso!!');
  } catch (error) {
    console.log('Erro na conexao: ', error);
  }
};
