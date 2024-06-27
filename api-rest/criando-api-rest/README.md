<h1 align="center">Transactions</h1>

<p align="center">
Uma aplicação Node.js para transações monetárias que permite gerenciar créditos e débitos. 
</p>

<p align="center">
  <a href="#requisitos">Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#configuração">Configuração</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#routes">Endpoints</a>
</p>

<h2 id="requisitos" align="center">Requisitos da aplicação</h2>

### Requisitos funcionais

- O usuário deve poder criar uma nova transação;
- O usuário deve poder obter um resumo da sua conta;
- O usuário deve poder listar todas transações que já ocorreram;
- O usuário deve poder visualizar uma transação única;

### Regras de negócios

- A transação pode ser do tipo crédito que somará ao valor total, ou débito subtrairá;
- Deve ser possível identificarmos o usuário entre as requisições;
- O usuário só pode visualizar transações o qual ele criou;

<h2 id="tecnologias" align="center">Tecnologias</h2>

- Fastify
- Typescript
- Knex

<h2 id="configuração" align="center">Configuração</h2>

- Clone o repositório.
- Configure as variáveis de ambiente (`./.env`) de acordo com o arquivo `.env` de exemplo
- Instale as dependências (`npm install`).
- Rode as migrations do banco de dados (`npm run knex migrate:latest`)
- Execute a aplicação em desenvolvimento (`npm run dev`).

<h2 id="routes" align="center">Endpoints</h2>

### POST `/transactions`

Cria uma transação

- Body:

```json
{
  "title": "Your Transaction Title",
  "amount": 123.45,
  "type": "credit"
}
```

- Resposta:
  - Headers:
    - Cookie: sessionId="6e658649-05a7-49fc-9101-235162c7ac8a"

### GET `/transactions`

Lista as transações

- Headers:
  - Cookie: sessionId="6e658649-05a7-49fc-9101-235162c7ac8a"
- Resposta:

```json
{
  "transactions": [
    {
      "id": "1a685c2a-c4b7-4313-abd5-4d85da7f64f6",
      "title": "Your Transaction Title",
      "amount": 123.45,
      "created_at": "2024-06-20 19:46:20",
      "session_id": "6e658649-05a7-49fc-9101-235162c7ac8a"
    }
  ]
}
```

### GET `/transactions/:id`

Lista uma transação específica.

- Headers:
  - Cookie: sessionId="6e658649-05a7-49fc-9101-235162c7ac8a"
- Resposta:

```json
{
  "transaction": {
    "id": "1a685c2a-c4b7-4313-abd5-4d85da7f64f6",
    "title": "Your Transaction Title",
    "amount": 123.45,
    "created_at": "2024-06-20 19:46:20",
    "session_id": "6e658649-05a7-49fc-9101-235162c7ac8a"
  }
}
```

### GET `/transactions/summary`

Lista o valor de transações.

- Headers:
  - Cookie: sessionId="6e658649-05a7-49fc-9101-235162c7ac8a"
- Resposta:

```json
{
  "summary": {
    "amount": 246.9
  }
}
```
