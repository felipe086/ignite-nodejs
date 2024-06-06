<h1 align="center" style="font-weight: bold;">Fundamentos do Node.js</h1>

<p align="center">
 <a href="#tech">Tecnologias</a> • 
 <a href="#started">Introdução</a> • 
  <a href="#routes">Rotas da API</a> 
</p>

<p align="center">
Nesse módulo foi apresentado a criação de projetos Node.js, estrutura de uma aplicação, streams em Node.js.

Foi desenvolvido uma API que contém as seguintes funcionalidades:

- Criação de um usuário
- Listagem de todos os usuário
- Atualização de um usuário pelo `id`
- Remover um usuário pelo `id`
</p>

<h2 id="tech">💻 Tecnologias</h2>

- NodeJS

<h2 id="started">🚀 Introdução</h2>

1. **Inicie a aplicação**: `npm run dev `

<h2 id="routes">📍 Rotas da API</h2>

| Rota                             | Descrição                      |
| -------------------------------- | ------------------------------ |
| <kbd>POST /users</kbd>           | Cria um usuário                |
| <kbd>GET /users</kbd>            | Busca informações dos usuários |
| <kbd>PUT /users/:userId</kbd>    | Atualiza um usuário            |
| <kbd>DELETE /users/:userId</kbd> | Deleta um usuário              |

<h3 >POST /users</h3>

**REQUEST**

```json
{
  "name": "Felipe",
  "email": "Felipe@gmail.com"
}
```

<h3 >GET /users</h3>

**RESPONSE**

```json
{
  "id": "94a27a13-8ab0-46ba-a122-ef9df2f56744",
  "name": "Felipe",
  "email": "Felipe@gmail.com"
}
```

<h3>PUT /users/:userId</h3>

**REQUEST**

```json
{
  "name": "Felipe G",
  "email": "contato@felipego.com"
}
```

<h3>DELETE /users/:userId</h3>

```
/users/94a27a13-8ab0-46ba-a122-ef9df2f56744
```
