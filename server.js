/* Criar pasta - No explorador de arquivos, entrar na pasta onde a nova pasta do projeto sera criada,
com o botão direto, abrir com Visual,
abrir terminal no VSC, deverá estar no caminho correto
ex: D:\Paula\FuturoDev\ExerciciosGit>
criar nova pasta: mkdir nome da pasta
mkdir node-do-zero
para entrar na pasta
cd node-do-zero

pra ver se tem o node instalado
node -v
pra ver se tem o npm instalado
npm -v

createServer - importar função pronta
node:http -- criação de servidor http 

localhost:3333 - porta que vai rodar

npm init -y 
vai criar o arquivo package.json
para leitura da sintaxe do import
inserir type:module manualmente no arquivo package.json
 "type": "module",

abrir o navegador 
localhost:3333
não abre nada, mas no terminal vai aparecer oi ,
pq tinha um console.log('oi'), dentro da const server

passar parametros request e response na função da const server
request - obter dados da requisão que o usuario esta fazendo
response - objeto para devolver uma resposta

dentro da funcao const server
response.write - resposta que aparece no navegador - ('oie')
return response.end - finaliza

node --watch server.js
atualiza automaticamente, após alterações - como o nodemom
não precisa desligar o servidor toda vez que atualizar algo no código

no arquivo package.json - "scripts"
pode ser criado um novo
"dev": "node --watch --no-warnings server.js"
no terminal digita npm run dev
vai rodar esse script, não precisa ficar digitando novamente"

import { createServer } from 'node:http'

const server = createServer((request, response) => {
    response.write('oie')

    return response.end()
})

server.listen(3333)


código acima seria o node tradicional, sem o uso do express 

com o express, gera novo código

npm install express --save
express - framework para o desenvolvimento de aplicações javascript com o node.js
criou os arquivos package-lock.json e pasta node_modules

Crud - create, read, update, delete
get - buscar uma informação
post = criar
put - atualizar um video especifico - geralmente id 
route parameter /videos/:id
delete = deletar
patch - alterar uma pequena informação

post - criar
http://localhost:3333/videos

pode ter o mesmo endereço
ex: /videos
com métodos diferentes

put - especificar qual video - por exemplo pelo id
http://localhost:3333/videos/1

no navegador só consegue ver a rota get, outras não
por isso, instalar a extensão do VSC "rest client"
criar novo arquivo na pasta do projeto nome.http
nesse arquivo, definir a rota
POST http://localhost:3333/videos
como não tem nenhuma resposta da página
adiciona um return response.status
no arquivo routes.http clicar em send request
numa aba lateral, o codigo 201 
codigo 201 - algo foi criado
vai aparecer no terminal os dados do video, title, description.. 
devido ao console log para listar os dados

reply = response

import bodyParser from 'body-parser';
server.use(bodyParser.json());
para quebrar o json do arquivo, routes.http
*/

import express, { response } from 'express';
import bodyParser from 'body-parser';

import { DatabaseMemory } from './database-memory.js'

const server = express();

const PORT = 3333;

server.use(bodyParser.json());

/* server.get('/', () => {
    return 'Hello world'
}) */

const database = new DatabaseMemory();

/* const database para criar o banco de dados*/

server.post('/videos', (request, reply) => {
    const { title, description, duration } = request.body;
    
    database.create({
        title: title,
        description: description,
        duration: duration,
    });

    return reply.status(201).send();
})

server.get('/videos', (request, reply) => {
    const videos = database.list()

    reply.json(videos);
})

server.put('/videos/:id', (request, response) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body;

    const video = database.update(videoId, {
        title,
        description,
        duration,
    })
})

    response.status(204).send();

server.delete('/videos/:id', () => {
    return 'Hello world'
})

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

/* criando banco de dados na memória do computador
apenas local
perde-se as informações ao fechar o projeto
criar arquivo database-memory.js
criar uma classe
importar no arquivo server.js
import { DatabaseMemory } from './database-memory.js'

*/
