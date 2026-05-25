import { Database } from '@config/database';
import app from '@http/app';

class Server {
  private port: string | number;
  private database: Database;

  constructor() {
    this.port = process.env.PORT || 3000;
    this.database = new Database();
  }

  public async start(): Promise<void> {
    try {
      await this.database.connect();

      const serverInstance = app.listen(this.port, () => {
        console.log(`Server started on port ${this.port}`);
      });

      this.setupGracefulShutdown(serverInstance);
    } catch (error) {
      console.error('Critical error when starting the application:', error);
      process.exit(1);
    }
  }

  private setupGracefulShutdown(serverInstance: any): void {
    const gracefulShutdown = async () => {
      console.log('Starting to shut down the application...');
      serverInstance.close(async () => {
        console.log('HTTP server closed.');
        await this.database.disconnect();
        process.exit(0);
      });
    };

    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);
  }
}

new Server().start();
