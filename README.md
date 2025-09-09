# Ecommerce Server Patterns - CoderHouse

## 🚀 Descrição

Ecommerce Server Patterns é um backend profissional de ecommerce construído com Node.js e Express, focado em boa arquitetura, padrões de projeto e segurança. Este projeto serve 
como base robusta para sistemas de ecommerce modernos, com gerenciamento de roles, autenticação segura e lógica de compra avançada.



## 🔧 Funcionalidades

✅ Padrão Repository + DAO – Separação clara entre lógica de negócio e acesso a dados

✅ DTOs (Data Transfer Objects) – Evita envio de dados sensíveis para o cliente

✅ Autenticação e Autorização
Controle de roles: Admin e Usuário
Middleware seguro para endpoints restritos

✅ Recuperação de senha via email
Links expiram em 1 hora
Previne redefinir para a mesma senha antiga

✅ Modelo Ticket e Lógica de Compra
Verificação de estoque
Tickets completos e incompletos

✅ Arquitetura profissional
Variáveis de ambiente, mailing integrado e estrutura modular



## 🛠 Tecnologias Utilizadas
- Node.js
- Express.js
- MongoDB / Mongoose
- JWT (JSON Web Token)
- Bcrypt.js
- Nodemailer
- Dotenv




## ▶️ Como executar

```bash
git clone https://github.com/otosales/ecommerce-server-patterns.git
cd ecommerce-server-patterns
```


## 📦 Instale as Dependências

```bash
npm install

```



## Crie o arquivo .env na raiz do projeto com as variáveis de ambiente necessárias:

- PORT=3000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- EMAIL_USER=your_email
- EMAIL_PASS=your_email_password




## Inicie o servidor:

```bash
npm run dev

```





## O servidor estará rodando em http://localhost:3000.






## 📌 Endpoints Principais

| Endpoint               | Método | Descrição                              | Acesso  |
| ---------------------- | ------ | -------------------------------------- | ------- |
| `/auth/register`       | POST   | Cadastro de usuário                    | Público |
| `/auth/login`          | POST   | Login de usuário                       | Público |
| `/auth/current`        | GET    | Dados do usuário logado (DTO seguro)   | Usuário |
| `/auth/reset-password` | POST   | Solicitar link de redefinição de senha | Público |
| `/products`            | GET    | Listar produtos                        | Público |
| `/products`            | POST   | Criar produto                          | Admin   |
| `/cart`                | POST   | Adicionar produto ao carrinho          | Usuário |
| `/tickets`             | POST   | Criar ticket de compra                 | Usuário |






## 💡 Boas práticas aplicadas
- Arquitetura modular e escalável
- Separação de responsabilidades (Controller → Service → Repository)
- Segurança com JWT, hashing de senhas e DTOs
- Logging e tratamento de erros centralizado
- Código limpo, comentado e fácil de manter





