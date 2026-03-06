  LEIA ESTE ARQUIVO PARA ENTENDER COMO USAR O MODELO DE SOFTWARE

docker exec -it redis-auth redis-cli

  📦 Tecnologias Utilizadas
Node.js
TypeScript
Express
Arquitetura MVC

  ⚙️ Como Rodar o Projeto
1️⃣ Clone o repositório
git clone https://github.com/JoaoMarcusAndrade/GoDocs

2️⃣ Instale as dependências
npm install

3️⃣ Suba o Redis com Docker
  Certifique-se de ter o Docker instalado e em execução.
  Crie o container do Redis (caso ainda não exista):
docker run -d --name redis-auth -p 6379:6379 --restart unless-stopped redis

  Se o container já existir e estiver parado, inicie com:
docker start redis-auth

3️⃣ Rode o projeto em modo desenvolvimento
npm run dev

❗❗Use o salvamento automático para trabalhar bem com nodemon❗❗

  ⚠️ IMPORTANTE:
O projeto deve ser executado utilizando npm run dev.

    🏗️ Padrão de Arquitetura

Este projeto segue rigorosamente o padrão MVC.

A estrutura deve ser organizada da seguinte forma:

src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── services/
 └── views/

    📌 Convenção de Nomes

Todos os arquivos devem seguir o padrão:
user.model.ts
user.controller.ts
user.service.ts
user.routes.ts
pdf.controller.ts
pdf.service.ts

Sempre:
nomeRecurso.tipo.ts

Exemplo correto:
auth.controller.ts
order.service.ts
product.model.ts


  ❌ Não usar:

Nomes genéricos
Arquivos fora das pastas corretas
Misturar responsabilidades

  🧠 Responsabilidade de Cada Camada
📂 Models
Responsável pela estrutura de dados e regras relacionadas ao modelo.

📂 Controllers
Responsável por receber a requisição e retornar a resposta.

📂 Services
Responsável pela lógica de negócio.

📂 Routes
Responsável por definir as rotas da aplicação.

📂 Views
Responsável pela renderização (caso aplicável).


  🛑 Regras do Projeto
Sempre manter separação de responsabilidades.
Não colocar regra de negócio dentro de controller.
Não acessar banco direto na rota.
Manter organização e padrão de nomes.
  LEIA ESTE ARQUIVO PARA ENTENDER COMO USAR O MODELO DE SOFTWARE

docker exec -it redis-auth redis-cli

  📦 Tecnologias Utilizadas
Node.js
TypeScript
Express
Arquitetura MVC

  ⚙️ Como Rodar o Projeto
1️⃣ Clone o repositório
git clone https://github.com/JoaoMarcusAndrade/GoDocs

2️⃣ Instale as dependências
npm install

3️⃣ Suba o Redis com Docker
  Certifique-se de ter o Docker instalado e em execução.
  Crie o container do Redis (caso ainda não exista):
docker run -d --name redis-auth -p 6379:6379 --restart unless-stopped redis

  Se o container já existir e estiver parado, inicie com:
docker start redis-auth

3️⃣ Rode o projeto em modo desenvolvimento
npm run dev

❗❗Use o salvamento automático para trabalhar bem com nodemon❗❗

  ⚠️ IMPORTANTE:
O projeto deve ser executado utilizando npm run dev.

    🏗️ Padrão de Arquitetura

Este projeto segue rigorosamente o padrão MVC.

A estrutura deve ser organizada da seguinte forma:

src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── services/
 └── views/

    📌 Convenção de Nomes

Todos os arquivos devem seguir o padrão:
user.model.ts
user.controller.ts
user.service.ts
user.routes.ts
pdf.controller.ts
pdf.service.ts

Sempre:
nomeRecurso.tipo.ts

Exemplo correto:
auth.controller.ts
order.service.ts
product.model.ts


  ❌ Não usar:

Nomes genéricos
Arquivos fora das pastas corretas
Misturar responsabilidades

  🧠 Responsabilidade de Cada Camada
📂 Models
Responsável pela estrutura de dados e regras relacionadas ao modelo.

📂 Controllers
Responsável por receber a requisição e retornar a resposta.

📂 Services
Responsável pela lógica de negócio.

📂 Routes
Responsável por definir as rotas da aplicação.

📂 Views
Responsável pela renderização (caso aplicável).


  🛑 Regras do Projeto
Sempre manter separação de responsabilidades.
Não colocar regra de negócio dentro de controller.
Não acessar banco direto na rota.
Manter organização e padrão de nomes.

