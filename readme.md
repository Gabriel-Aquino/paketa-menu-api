# Entrevista Técnica - Paketá Menu API

Este repositório contém a API de gerenciamento de menus.

## Tecnologias e Bibliotecas Utilizadas

A API foi construída utilizando **Node.js** e **TypeScript**, seguindo os princípios de Clean Architecture, DDD e SOLID.

### Principais Dependências
- **Express** (`^5.2.1`): Framework web para Node.js.
- **Mongoose** (`^9.6.2`): ODM para modelagem e persistência de dados no MongoDB.
- **Zod** (`^4.4.3`): Validação de esquemas e tipagem estática.
- **Cors** (`^2.8.6`): Middleware para habilitar CORS.
- **Helmet** (`^8.2.0`): Middleware de segurança para Express.
- **Morgan** (`^1.10.1`): Logger de requisições HTTP.
- **Dotenv** (`^17.4.2`): Carregamento de variáveis de ambiente.

### Dependências de Desenvolvimento
- **TypeScript** (`^6.0.3`): Superset do JavaScript com tipagem estática.
- **Jest** (`^30.4.2`) & **Supertest** (`^7.2.2`): Frameworks para testes unitários e de integração.
- **ESLint** (`^10.4.0`) & **Prettier** (`^3.8.3`): Ferramentas para linting e formatação de código.
- **MongoDB Memory Server** (`^11.1.0`): MongoDB em memória para testes.
- **TS-Node-Dev** (`^2.0.0`): Ambiente de desenvolvimento com restart automático.

## Como Executar o Projeto

### Pré-requisitos
- **Docker** e **Docker Compose** instalados na sua máquina.

> [!NOTE]  
> **Fricção Zero:** Você **não** precisa ter Node.js, TypeScript ou qualquer outra ferramenta de desenvolvimento instalada localmente para testar a aplicação! O ambiente foi configurado para rodar de forma isolada via containers.

### Configuração Inicial
1. Crie um arquivo `.env` na raiz do projeto, copiando o arquivo de exemplo:
   ```bash
   cp .env.example .env
   ```
   *(O arquivo de exemplo já possui a configuração padrão correta para se conectar ao banco de dados dentro do container)*

### Como Executar o Projeto
Para iniciar tanto a API quanto o banco de dados (MongoDB) de uma só vez, execute o seguinte comando na raiz do projeto:
```bash
docker-compose up --build
```

A API estará rodando e disponível para acesso em: `http://localhost:3000`

### Executando os Testes Locais (Opcional)
Caso queira analisar e rodar a suíte de testes (unitários e e2e) na sua máquina, aí sim será necessário ter o Node.js instalado:
```bash
npm install
npm run test
```

### 🚀 Ambiente de Produção (Docker Multi-stage)
O `docker-compose.yaml` acima está otimizado para **desenvolvimento** (hot-reload habilitado via `target: builder`). 

Para simular a **imagem de produção** real — que utiliza Multi-stage Build para compilar o código e descarta as dependências de desenvolvimento, gerando uma imagem final muito mais leve —, utilize os seguintes comandos:

```bash
# 1. Certifique-se de que o banco de dados (MongoDB) está rodando via docker-compose
docker-compose up -d mongodb

# 2. Faz o build da imagem focando apenas no estágio final (production)
docker build --target production -t paketa-api:prod .

# 3. Executa o container simulando o ambiente produtivo e o conecta à mesma rede do MongoDB
docker run -d -p 3000:3000 \
  --network entrevista-tecnica_default \
  --env-file .env \
  -e MONGO_URI=mongodb://mongodb:27017/paketa_menu \
  --name paketa_api_prod \
  paketa-api:prod
```
