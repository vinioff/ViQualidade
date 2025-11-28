const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
    console.log(`🚀 JSON Server do Vi Qualidade rodando na porta ${port}`);
    console.log(`📊 Acesse: http://localhost:${port}/encomendas`);
});