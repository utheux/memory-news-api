# Review Cards and WebScraping Backend

API backend criada para cadastro, login e gerenciamento de cards de estudo com revisão espaçada.

O projeto possui funcionalidades de cadastro e login de usuários. Após autenticação, esses usuários podem criar cards próprios, que são listados para revisão de acordo com a Curva do Esquecimento de Ebbinghaus. A ideia é ajudar o usuário a revisar conteúdos no momento certo, reforçando a memorização ao longo do tempo.

Além disso, o sistema possui funcionalidades adicionais de busca de notícias diárias por meio de web scraping, disponibilizando posts coletados e armazenados em cache.

Criação: Matheus Ribeiro Silva.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Fastify
- MongoDB
- Mongoose
- @fastify/cookie
- @fastify/session
- bcryptjs
- dotenv
- Puppeteer
- node-cron
- TSX

## Pré-requisitos

Antes de rodar o projeto, é necessário ter instalado:

- Node.js
- npm
- Docker
- Docker Compose

## Como Rodar

Primeiro, suba os serviços do Docker:

```bash
docker compose up
```

Depois, em outro terminal, instale as dependências e inicie o servidor em modo de desenvolvimento:

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run typecheck
npm run seed:cards
```

## Endpoints

### Usuários

| Método | Rota | Autenticação | Descrição |
| --- | --- | --- | --- |
| POST | `/user` | Não | Cria um novo usuário. |
| POST | `/login` | Não | Realiza login e salva o usuário na sessão. |
| GET | `/me` | Sim | Retorna os dados do usuário autenticado. |
| POST | `/logout` | Sim | Encerra a sessão do usuário. |

### Cards

| Método | Rota | Autenticação | Descrição |
| --- | --- | --- | --- |
| POST | `/card` | Sim | Cria um card para o usuário autenticado. |
| GET | `/card` | Sim | Lista os cards do usuário autenticado. |
| GET | `/card/review` | Sim | Lista os cards pendentes de revisão. |
| POST | `/card/:id/review` | Sim | Marca um card como revisado e agenda a próxima revisão. |
| GET | `/card/:id` | Sim | Busca um card específico do usuário autenticado. |
| DELETE | `/card/:id` | Sim | Remove um card específico do usuário autenticado. |

### Web Scraping

| Método | Rota | Autenticação | Descrição |
| --- | --- | --- | --- |
| GET | `/redditPosts` | Sim | Retorna notícias/posts diários coletados via web scraping. |

## Exemplos de Body

### Criar Usuário

```json
{
  "name": "Matheus",
  "surName": "Silva",
  "username": "matheus",
  "email": "matheus@email.com",
  "password": "123456"
}
```

### Login

```json
{
  "email": "matheus@email.com",
  "password": "123456"
}
```

### Criar Card

```json
{
  "title": "Curva do Esquecimento",
  "description": "Revisar como a retenção de memória diminui com o tempo sem reforço."
}
```
