# Conteúdo e Ficha de exercícios

## TECH STACK
- Node
- Prisma + PostgreSQL

## Aula 1 - Apresentação da UC
1. Conhecer as Arquiteturas de Aplicações Web.
2. Conhecer a Arquitetura de Desenvolvimento Model View Controller.
3. Desenvolver aplicações Web, utilizando bibliotecas e frameworks de produtividade nas várias camadas do desenvolvimento.
4. Produzir Aplicações Web adaptadas aos vários tipos de dispositivos.
5. Saber disponibilizar e integrar informação a partir de APIs e/ou Web Services.
6. Conhecer Soluções de desenvolvimento e publicação em modelos de computação na nuvem (cloud computing).


## Aula 2 
### Setup de instalação
 - Criar conta no GitHub;
 - Criar um repositório – AW-P-EXEMPLO-{{número-de-aluno}};
 - Instalar GitHub desktop e mapear o repositório;
- Instalar node;
    - https://nodejs.org/en
- Instalar Postman;
    - https://www.postman.com/
- Abrir projeto mapeado com o VSCode;

### MY FIRST API
- Abrir terminal e executar:
    - <code>npm init</code>;
- Preencher os dados pedidos;
- Instalar dependências:
    - <code>npm install express nodemon cors dotenv morgan --save 
</code>
- Criar ficheiro .env (environment) na raiz do projeto:
     ```
    SERVER_HOST=localhost
    SERVER_PORT=4242
    ```

- Criar um ficheiro na raiz do projeto server.js;
- Alterar no package.json "main": "server.js";
- Adicionar script no package.json:
    - "start": "nodemon server.js“

- package.json deverá ficar assim:
    ```json
    {
    "name": "aw-p-exemplo-1778",
    "version": "1.0.0",
    "description": "Educational project",
    "main": "server.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon server.js"
    },
    "author": "Marcelo Antunes Fernandes",
    "license": "ISC",
    "dependencies": {
        "cors": "^2.8.5",
        "dotenv": "^16.3.1",
        "express": "^4.18.2",
        "morgan": "^1.10.0",
        "nodemon": "^3.0.1"
    }
    }

    ```

- Alterar server.js
    ```javascript
    require('dotenv').config();

    const bodyParser = require('body-parser');
    const cors = require('cors');
    const express = require('express');

    const router = require('../routes/index');

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    app.use('/api/', router);

    const port = process.env.SERVER_PORT || 8080;
    app.listen(port, () => {
        console.log('Express server listening on port', port)
    });
    ```

- Criar a seguinte estrutura de pastas e ficheiros:
    ```
    📦AW-P-EXEMPLO-1778
    ┣ 📂controllers
    ┃ ┃ ┗ 📜student.js
    ┣ 📂routes
    ┃ ┃ ┗ 📜index.js
    ┃ ┃ ┗ 📜student.js
    ┣ 📜.env
    ┣ 📜.gitignore
    ┣ 📜package-lock.json
    ┣ 📜package.json
    ┣ 📜readme.md
    ┗ 📜server.js
    ```

- Alterar routes
    - student.js

    ```javascript
    const studentRouter = require('express').Router();
    const controller = require('../controllers/student');

    //students CRUD
    studentRouter.get('/', controller.getAll); //read all
    studentRouter.get('/:number', controller.getById); //read one by his id (student number)
    studentRouter.post('/create', controller.create); //create new student
    studentRouter.put('/update', controller.update); //update student
    studentRouter.delete('/delete/:number', controller.delete); //delete student

    module.exports = studentRouter;
    ```

    - index.js
    ```javascript
    const router = require('express').Router();
    const studentRouter = require('./students');

    router.use('/students', studentRouter);

    module.exports = router;
    ```
- Alterar controller:
    - student.js
    ```javascript
    const fs = require('fs');

    //return all students
    exports.getAll = async (req, res) => {
        return res.send("ok");
    }

    //return student by his id (student number)
    exports.getById = async (req, res) => {
        //get student id requested
        const id = req.params.number;
        //just return same id
        return res.send(id);
    }

    //creates student
    exports.create = async (req, res) => {
        //get requested student properties
        const {number, name, city, birthday } = req.body;
        //just return same new student
        return res.status(201).send(req.body);
    }

    //updates student
    exports.update = async (req, res) => {
        //get requested student properties
        const {number, name, city, birthday } = req.body;
        //just return same new student
        return res.send(req.body);
    }

    //delete student by his id (student number)
    exports.delete = async (req, res) => {
        //get student id requested
        const id = req.params.number;
        //just return ok
        return res.send("ok");
    }
    ```

- Executar <code>npm start</code>;

- Testar no Postman;

- Push para o GIT;

## Aula 3 - Base de dados local

- Criar data -> local -> data.json

    ```
    📦AW-P-EXEMPLO-1778
    ┣ 📂controllers
    ┃ ┃ ┗ 📜student.js
    ┣ 📂data
    ┃ ┃ ┗ 📂local
    ┃ ┃     ┗ 📜data.json
    ┣ 📂routes
    ┃ ┃ ┗ 📜index.js
    ┃ ┃ ┗ 📜student.js
    ┣ 📜.env
    ┣ 📜.gitignore
    ┣ 📜package-lock.json
    ┣ 📜package.json
    ┣ 📜readme.md
    ┗ 📜server.js
    ```

- Estrutura exemplo data.json
    ```json
    {
        "students": [
            {
                "number": "1778",
                "name": "Marcelo Filipe",
                "city": "Braga",
                "birthday": "17-09-1991"
            }
        ]
    }
    ```


- Alterar controller:
    - student.js

    ```javascript
    const fs = require('fs');

    //return all students
    exports.getAll = async (req, res) => {
        //read local data json file
        const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
        //parse to json
        const data = JSON.parse(datajson);
        //returns students array
        return res.send(data.students);
    }

    //return student by his id (student number)
    exports.getById = async (req, res) => {
        //get student id requested
        const id = req.params.number;
        //read local data json file
        const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
        //parse to json
        const data = JSON.parse(datajson);
        //finds student by his id
        const student = data.students.filter(student => student.number == id);
        //return student
        res.send(student);
    }

    //creates student
    exports.create = async (req, res) => {
        //get requested student properties
        const {number, name, city, birthday } = req.body;
        //read local data json file
        const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
        //parse to json
        const data = JSON.parse(datajson);
        //add to students array
        data.students.push(req.body);
        //add to students array
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        //return new student
        return res.status(201).send(req.body);
    }

    //updates student
    exports.update = async (req, res) => {
        const { number, name, city, birthday } = req.body;
        //read local data json file
        const datajson = fs.readFileSync("data/local/data.json", "utf-8");
        //parse to json
        const data = JSON.parse(datajson);
        //find student to update
        const student = data.students.find(student => student.number == number);
        //update properties
        student.name = name;
        student.city = city;
        student.birthday = birthday;
        //update local database
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        //return updated student
        return res.send({number, name, city, birthday });
    }

    //delete student by his id (student number)
    exports.delete = async (req, res) => {
        //get student id requested
        const id = req.params.number;
        //read local data json file
        const datajson = fs.readFileSync("data/local/data.json", "utf-8"); 
        //parse to json
        const data = JSON.parse(datajson);
        //find student to delete
        const student = data.students.filter(student => student.number == id);
        //delete student
        data.students.splice(student, 1);
        //update local database
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        //return ok
        return res.status(200).send("ok");
    }
    ```

- Executar <code>npm start</code>;

- Testar no Postman;

- Push para o GIT;

### Ficha de exercícios
### Criar toda a estrutura para:
- Escolas:
    - [x] Identificador, nome, sigla, morada, website.
- Cursos:
    - [x] Identificador, nome, sigla e escola a que pertence.
- Alunos
    - [x] Identificador, nº de aluno, nome, morada, data de nascimento e curso a que pertence.

**Não esquecer de validar:**

- Antes de retornar um registo verificar se:
    - [x] o registo efetivamente existe;

- Antes de gravar verificar se:
    - [x] o registo efetivamente existe;
    - [x] todas os campos estão devidamente preenchidos;
    - [x] (no caso de create) se já existe um registo com o mesmo identitificador (número);

- Antes de eliminar verificar se:
    - [x] o registo efetivamente existe;
  
## Aula 4 - Base de dados

### PostgreSQL
- Official website https://www.postgresql.org/

- Docs https://www.postgresql.org/docs/

- Download https://www.postgresql.org/download/windows/
    - PgAdmin 4
    - PWD superuser exemplo <code>postgres</code>

### PRISMA

- Official website https://www.prisma.io/

- Docs https://www.prisma.io/docs

- Client reference  https://www.prisma.io/docs/reference/api-reference/prisma-client-reference

- CRUD https://www.prisma.io/docs/concepts/components/prisma-client/crud


### Setup de instalação
- Instalar PostgreSQL;

- Instalar Prisma Extension no VSCode;
    - https://marketplace.visualstudio.com/items?itemName=Prisma.prisma


#### Terminal
- Instalar PRISMA
    ```bash
    npm install -g prisma
    ```

- Instalar  PRISMA client
    ```bash
    npm install @prisma/client 
    ```

- Versionar a API
    - v1 -> dados locais
    - v2 -> base de dados 
    - Estrutura de pastas e ficheiros:

    ```
    📦AW-P-EXEMPLO-1778
    ┣ 📂controllers
    ┃ ┣ 📂v1
    ┃ ┃ ┗ 📜student.js
    ┃ ┗ 📂v2
    ┃ ┃ ┗ 📜student.js
    ┣ 📂data
    ┃ ┣ 📂local
    ┃ ┃ ┗ 📜data.json
    ┃ ┗ 📂prisma
    ┣ 📂routes
    ┃ ┣ 📂v1
    ┃ ┃ ┣ 📜index.js
    ┃ ┃ ┗ 📜students.js
    ┃ ┗ 📂v2
    ┃ ┃ ┣ 📜index.js
    ┃ ┃ ┗ 📜students.js
    ┣ 📂slides
    ┃ ┗ 📜2 - API - Intro.pdf
    ┣ 📜.env
    ┣ 📜.example.env
    ┣ 📜.gitignore
    ┣ 📜AW-P-EXEMPLO-1778.postman_collection.json
    ┣ 📜package-lock.json
    ┣ 📜package.json
    ┣ 📜readme.md
    ┗ 📜server.js
    ```

- Alterar no server.js o versionamento na API
    ```javascript
    require('dotenv').config();

    const bodyParser = require('body-parser');
    const cors = require('cors');
    const express = require('express');

    const router_v1 = require('./routes/v1/index');
    const router_v2 = require('./routes/v2/index');

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    app.use('/api/v1/', router_v1);
    app.use('/api/v2/', router_v2);

    const port = process.env.SERVER_PORT || 8080;

    app.listen(port, () => {
        console.log('Express server listening on port', port)
    });
    ```

- Adicionar configuração do prisma no package.json
    ```json
    "prisma": {
        "schema": "data/prisma/schema.prisma"
    },
    ```

- No terminal executar o seguinte comando para ser adicionado URL da BD no ficheiro .env
    ```bash
    prisma init
    ```

     - .env
        ```
        SERVER_HOST=localhost
        SERVER_PORT=4242
        DATABASE_URL="postgres://postgres:superuser@localhost:5432/AW-P-EXEMPLO-1778"
        ```

- No terminar executar:
    ```bash
    prisma generate
    ```

- Alterar o schema.prisma
    ```
    generator client {
        provider = "prisma-client-js"
    }

    datasource db {
        provider = "postgresql"
        url      = env("DATABASE_URL")
    }

    model Students {
        id    Int     @id @default(autoincrement())
        number String  @unique
        name  String
        city String
        birthday String
    }
    ```

- No terminal executar (para criar ou atualizar a configuração da BD)
    ```
    prisma db push
    ```

- Verificar no PgAdmin se a BD foi criada com sucesso

- Criar as novas rotas routes -> v2 -> students

    ```javascript
    const studentRouter = require('express').Router();
    const controller = require('../../controllers/v2/student');

    //students CRUD
    studentRouter.get('/', controller.getAll); //read all
    studentRouter.get('/:number', controller.getById); //read one by his id (student number)
    studentRouter.post('/create', controller.create); //create new student
    studentRouter.put('/update', controller.update); //update student
    studentRouter.delete('/delete/:number', controller.delete); //delete student

    module.exports = studentRouter;
    ```

- Criar o CRUD controllers -> v2 -> student 
    ```javascript
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient()

    //return all students
    exports.getAll = async (req, res) => {
        try {
            //read all from database
            const response = await prisma.students.findMany();
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }

    //return student by his id (student number)
    exports.getById = async (req, res) => {
        //get student id requested
        const id = req.params.number;
        try {
            //finds student by his id (number)
            const response = await prisma.students.findUnique({
                where: {
                    number: id,
                },
            })
            //return student
            res.status(200).json(response)
        } catch (error) {
            res.status(404).json({ msg: error.message })
        }
    }

    //creates student
    exports.create = async (req, res) => {
        //get requested student properties
        const { number, name, city, birthday } = req.body;
        try {
            //creates new student
            const student = await prisma.students.create({
                data: {
                    number: number,
                    name: name,
                    city: city,
                    birthday: birthday

                },
            })
            //return student created
            res.status(201).json(student)
        } catch (error) {
            res.status(400).json({ msg: error.message })
        }
    }

    //updates student
    exports.update = async (req, res) => {
        const { number, name, city, birthday } = req.body;

        try {
            //find student to update their data
            const student = await prisma.students.update({
                where: {
                    number: number,
                },
                data: {
                    name: name,
                    city: city,
                    birthday: birthday
                },
            })
            //return student updated
            res.status(200).json(student)
        } catch (error) {
            res.status(400).json({ msg: error.message })
        }
    }

    //delete student by his id (student number)
    exports.delete = async (req, res) => {
        //get student number requested
        const number = req.params.number;
        try {
            //delete student
            await prisma.students.delete({
                where: {
                    number: number,
                },
            })
            //just return ok
            res.status(200).send("ok");
        } catch (error) {
            res.status(400).json({ msg: error.message })
        }
    }
    ```

- Executar <code>npm start</code>;

- Testar no Postman;

- Push para o GIT;

### Ficha de exercícios
### Criar toda a estrutura para:
- Escolas:
    - [ ] Identificador, nome, sigla, morada, website.
- Cursos:
    - [ ] Identificador, nome, sigla e escola a que pertence.
- Alunos
    - [ ] Identificador, nº de aluno, nome, morada, data de nascimento e curso a que pertence.

**Não esquecer de validar:**

- Antes de retornar um registo verificar se:
    - [ ] o registo efetivamente existe;

- Antes de gravar verificar se:
    - [ ] o registo efetivamente existe;
    - [ ] todas os campos estão devidamente preenchidos;
    - [ ] (no caso de create) se já existe um registo com o mesmo identitificador (número);

- Antes de eliminar verificar se:
    - [ ] o registo efetivamente existe;

## Aula 5 - Autenticação e autorização

## Aula 6 - Deploy
 
