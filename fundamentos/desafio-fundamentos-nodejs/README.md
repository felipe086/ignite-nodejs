<h1 align="center" style="font-weight: bold;">Desafio: Fundamentos do Node.js</h1>

<p align="center">
 <a href="#tech">Tecnologias</a> • 
 <a href="#started">Introdução</a> • 
  <a href="#routes">Rotas da API</a> 
</p>

<p align="center">
Nesse desafio foi desenvolvido uma API para realizar o CRUD de suas *tasks* (tarefas).

A API contém as seguintes funcionalidades:

- Criação de uma task
- Listagem de todas as tasks
- Atualização de uma task pelo `id`
- Remover uma task pelo `id`
- Marcar pelo `id` uma task como completa
- Importação de tasks em massa por um arquivo CSV
</p>

<h2 id="tech">💻 Tecnologias</h2>

- NodeJS

<h2 id="started">🚀 Introdução</h2>

1. **Instale as dependências**: `npm install`
2. **Inicie a aplicação**: `npm run dev `

<h2 id="routes">📍 Rotas da API</h2>

| Rota                                     | Descrição                                     |
| ---------------------------------------- | --------------------------------------------- |
| <kbd>POST /tasks</kbd>                   | Crie uma tarefa                               |
| <kbd>GET /tasks</kbd>                    | Busca informações das tarefas                 |
| <kbd>PUT /tasks/:taskId</kbd>            | Atualiza uma tarefa                           |
| <kbd>DELETE /tasks/:taskId</kbd>         | Deleta uma tarefa                             |
| <kbd>PATCH /tasks/:taskId/complete</kbd> | Atualiza o status de completado de uma tarefa |

<h3 id="post-tasks-detail">POST /tasks</h3>

**REQUEST**

```json
{
  "title": "Criar um modelo de resposta para JSON de tarefas",
  "description": "Este modelo deve incluir campos para título, descrição, status. O modelo também deve ser formatado de forma que seja fácil de usar e integrar com diferentes aplicativos."
}
```

<h3 id="get-tasks-detail">GET /tasks</h3>

**RESPONSE**

```json
{
  "id": "22a931ed-3629-4968-bcb5-2dfb2c8a351a",
  "title": "Criar um modelo de resposta para JSON de tarefas",
  "description": "Este modelo deve incluir campos para título, descrição, status. O modelo também deve ser formatado de forma que seja fácil de usar e integrar com diferentes aplicativos.",
  "completed": false,
  "created_at": "2024-06-06T03:05:07.453Z",
  "updated_at": "2024-06-06T03:05:07.453Z"
}
```

<h3 id="post-tasks-detail">PUT /tasks/:taskId</h3>

**REQUEST**

```json
{
  "title": "Escrever um relatório sobre o projeto X",
  "description": "O relatório deve resumir o progresso do projeto até o momento e identificar quaisquer problemas ou riscos potenciais."
}
```

<h3>DELETE /tasks/:taskId</h3>

```
/tasks/22a931ed-3629-4968-bcb5-2dfb2c8a351a
```

<h3>PATCH /tasks/:taskId/complete</h3>

```
/tasks/22a931ed-3629-4968-bcb5-2dfb2c8a351a/complete
```
