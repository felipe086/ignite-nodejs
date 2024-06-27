<h1 align="center">Daily Diet</h1>

<p align="center">
Uma aplicação Node.js para controle de dieta diária.
</p>

<p align="center">
  <a href="#requisitos">Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#configuração">Configuração</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#routes">Endpoints</a>
</p>

<h2 id="requisitos" align="center">Requisitos da aplicação</h2>

- Deve ser possível criar um usuário
- Deve ser possível identificar o usuário entre as requisições
- Deve ser possível registrar uma refeição feita, com as seguintes informações:
  _As refeições devem ser relacionadas a um usuário._
  - Nome
  - Descrição
  - Data e Hora
  - Está dentro ou não da dieta
- Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- Deve ser possível apagar uma refeição
- Deve ser possível listar todas as refeições de um usuário
- Deve ser possível visualizar uma única refeição
- Deve ser possível recuperar as métricas de um usuário
  - Quantidade total de refeições registradas
  - Quantidade total de refeições dentro da dieta
  - Quantidade total de refeições fora da dieta
  - Melhor sequência de refeições dentro da dieta
- O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

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

### POST `/api/users`

Cria um usuário.

- Body:

```json
{
  "name": "Felipe",
  "email": "felipego@gmail.com"
}
```

- Resposta:
  - Headers:
    - Cookie: sessionId="`uuid`"("654e75fd-412a-4459-bd0e-a1a5af80afed")

### POST `/api/meals`

Cria uma refeição.

- Body:

```json
{
  "name": "Salad",
  "description": "A fresh garden salad with a variety of vegetables.",
  "isOnDiet": true,
  "date": "2024-06-23T00:45:31.698Z"
}
```

### GET `/api/meals`

Lista as refeições.

- Headers:
  - Cookie: sessionId="`uuid`"
- Resposta:

```json
{
  "meals": [
    {
      "id": "97b56260-296b-4379-a2fd-b68a9a195786",
      "user_id": "d8d62a35-31fd-4b75-bfd8-ae1be27677ad",
      "name": "Chicken Sandwich",
      "description": "Grilled chicken sandwich with lettuce and tomato.",
      "is_on_diet": 0,
      "date": 1719232200000,
      "created_at": "2024-06-27 02:23:47",
      "updated_at": "2024-06-27 02:23:47"
    },
    {
      "id": "6db5e5ae-e06a-40f4-b1c0-88e8dabc31d9",
      "user_id": "d8d62a35-31fd-4b75-bfd8-ae1be27677ad",
      "name": "Salad",
      "description": "A fresh garden salad with a variety of vegetables.",
      "is_on_diet": 1,
      "date": 1719103531698,
      "created_at": "2024-06-27 02:21:25",
      "updated_at": "2024-06-27 02:21:25"
    }
  ]
}
```

### GET `/api/meals/:id`

Lista uma refeição específica.

- Parâmetros:
  - `id` (string, uuid): Id da refeição
- Headers:
  - Cookie: sessionId="`uuid`"
- Resposta:

```json
{
  "meal": {
    "id": "97b56260-296b-4379-a2fd-b68a9a195786",
    "user_id": "d8d62a35-31fd-4b75-bfd8-ae1be27677ad",
    "name": "Chicken Sandwich",
    "description": "Grilled chicken sandwich with lettuce and tomato.",
    "is_on_diet": 0,
    "date": 1719232200000,
    "created_at": "2024-06-27 02:23:47",
    "updated_at": "2024-06-27 02:23:47"
  }
}
```

### DELETE `/api/meals/:id`

Deleta uma refeição.

- Parâmetros:
  - `id` (string, uuid): Id da refeição
- Headers:
  - Cookie: sessionId="`uuid`"

### PUT `/api/meals/:id`

Atualiza uma refeição

- Parâmetros:
  - `id` (string, uuid): Id da refeição
- Headers:
  - Cookie: sessionId="`uuid`"
- Body:
  - Todo os campos são opcionais, mas deve conter ao menos um valor.

```json
{
  "name": "",
  "description": "",
  "isOnDiet":,
  "date": "",
}
```

### GET `/api/meals/metrics`

Lista as métricas do usuário.

- Headers:
  - Cookie: sessionId="`uuid`"
- Resposta:

```json
{
  "totalMeals": 1,
  "totalMealsOnDiet": 0,
  "totalMealsOffDiet": 1,
  "bestOnDietSequence": 0
}
```
