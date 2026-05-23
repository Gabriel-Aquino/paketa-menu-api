import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { ErrorHandler } from './middlewares/ErrorHandler';
import Routes from './routes/MainRoutes';

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
    const routes: Routes = new Routes();
    this.server.use(routes.execute());
  }

  private exceptionHandler() {
    this.server.use(ErrorHandler.handle);
  }
}

export default new App().server;
