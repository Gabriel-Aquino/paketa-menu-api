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
        console.log(`Servidor rodando na porta ${this.port}`);
      });

      this.setupGracefulShutdown(serverInstance);
    } catch (error) {
      console.error('Erro crítico ao iniciar a aplicação:', error);
      process.exit(1);
    }
  }

  private setupGracefulShutdown(serverInstance: any): void {
    const gracefulShutdown = async () => {
      console.log('Iniciando o encerramento da aplicação...');
      serverInstance.close(async () => {
        console.log('Servidor HTTP encerrado.');
        await this.database.disconnect();
        process.exit(0);
      });
    };

    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);
  }
}

new Server().start();
