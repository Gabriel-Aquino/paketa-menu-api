import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { ErrorHandler } from './middlewares/ErrorHandler';

export class App {
  public server: Express;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  private middlewares() {
    this.server.use(cors());
    this.server.use(helmet());
    this.server.use(express.json());
    this.server.use(morgan('dev'));
  }

  private routes() {
    // TODO: Registrar rotas aqui (ex: this.server.use(route))
    this.server.get('/health', (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
  }

  private exceptionHandler() {
    this.server.use(ErrorHandler.handle);
  }
}

export default new App().server;
