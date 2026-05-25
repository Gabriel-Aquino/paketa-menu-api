import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { ErrorHandler } from './middlewares/ErrorHandler';
import Routes from './routes/MainRoutes';
import { HttpStatus } from '@shared/utils/HttpStatus';

export class App {
  public server: Express;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
    this.fallBackNotFound();
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

  private fallBackNotFound() {
    this.server.use((_req, res) => {
      res.status(HttpStatus.NOT_FOUND).json({
        message: `Request URL not found`
      });
    });
  }
}

export default new App().server;
