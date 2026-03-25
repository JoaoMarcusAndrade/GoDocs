# GoDocs

Plataforma para gerenciamento e processamento de documentos.

Este repositório utiliza **arquitetura monorepo**, separando **backend** e **frontend** em workspaces independentes.

---

# 📦 Estrutura do Projeto

O projeto está organizado como **monorepo utilizando npm workspaces**.

```
godocs/
│
├── backend/          # API e lógica de negócio
│
├── frontend/         # Interface do usuário
│
├── package.json      # configuração do workspace
├── package-lock.json
│
└── README.md
```

Cada aplicação possui suas próprias dependências e scripts.

---

# 📦 Tecnologias Utilizadas

## Backend

- Node.js
- TypeScript
- Express
- Redis
- Docker
- Arquitetura MVC

## Frontend

- React
- Vite
- TypeScript

---

# ⚙️ Configuração do Workspace

O projeto utiliza **npm workspaces**.

Arquivo da raiz:

```json
{
  "name": "godocs",
  "private": true,
  "workspaces": [
    "backend",
    "frontend"
  ]
}
```

Isso permite:

- instalar dependências centralizadas
- compartilhar ferramentas
- manter projetos isolados

---

# 📥 Instalação do Projeto

## 1️⃣ Clonar o repositório

```
git clone https://github.com/JoaoMarcusAndrade/GoDocs
```

---

## 2️⃣ Entrar na pasta

```
cd GoDocs
```

---

## 3️⃣ Instalar dependências

Execute **na raiz do projeto**:

```
npm install
```

Isso instalará automaticamente:

- dependências do backend
- dependências do frontend

---

# 🚀 Executando o Projeto

## Rodar Backend

```
cd backend
npm run dev
```

---

## Rodar Frontend

```
cd frontend
npm run dev
```

---

# 🐳 Redis com Docker

O projeto utiliza **Redis para autenticação e sessões**.

---

## Criar container Redis

```
docker run -d \
--name redis-auth \
-p 6379:6379 \
--restart unless-stopped \
redis
```

---

## Iniciar container (caso esteja parado)

```
docker start redis-auth
```

---

## Acessar CLI do Redis

```
docker exec -it redis-auth redis-cli
```

---

# 🏗️ Arquitetura Backend

O backend segue o padrão **MVC (Model - View - Controller)**.

Estrutura:

```
src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── services/
 └── views/
```

---

# 📂 Responsabilidade de Cada Camada

## Models

Responsável por:

- estrutura de dados
- comunicação com banco
- regras relacionadas à entidade

---

## Controllers

Responsável por:

- receber requisições HTTP
- chamar services
- retornar respostas

---

## Services

Responsável por:

- lógica de negócio
- processamento
- regras da aplicação

---

## Routes

Responsável por:

- mapear endpoints
- direcionar para controllers

---

## Views

Responsável por:

- renderização de conteúdo
- templates (caso necessário)

---

# 📌 Convenção de Nomes

Todos os arquivos devem seguir este padrão:

```
nomeRecurso.tipo.ts
```

Exemplos:

```
user.model.ts
user.controller.ts
user.service.ts
user.routes.ts
pdf.controller.ts
pdf.service.ts
auth.controller.ts
product.model.ts
```

---

# ❌ Não Fazer

Evitar:

- nomes genéricos
- lógica de negócio em controllers
- acessar banco diretamente em rotas
- misturar responsabilidades

---

# 🛑 Regras do Projeto

1️⃣ Controllers **não devem conter regra de negócio**

2️⃣ Routes **não devem acessar banco**

3️⃣ Toda lógica deve estar em **services**

4️⃣ Manter separação clara entre camadas

5️⃣ Manter padronização de nomes

---

# 🧪 Desenvolvimento

Para desenvolvimento utilize:

```
npm run dev
```

Utilizando **nodemon** para recarregamento automático.

Salve os arquivos para atualizar o servidor automaticamente.

---

# 🌱 Fluxo de Branches

Este projeto utiliza **GitFlow**.

Estrutura:

```
main
develop
feature/*
```

Exemplo de feature:

```
feature/monorepo-structure
feature/backend-auth
feature/frontend-ui
```

---

# 📌 Observações Importantes

- Execute comandos **sempre na raiz quando possível**
- Não commitar **node_modules**
- Sempre utilizar `.gitignore`

---

# 📄 Licença

Este projeto está sob licença MIT.
