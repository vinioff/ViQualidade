const jsonServer = require('json-server');
const path = require('path');
const express = require('express');
const server = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Servir arquivos estáticos
server.use(express.static(path.join(__dirname, '..')));
server.use('/css', express.static(path.join(__dirname, '../css')));
server.use('/js', express.static(path.join(__dirname, '../js')));
server.use('/img', express.static(path.join(__dirname, '../img')));

// Middlewares do JSON Server
server.use(middlewares);
server.use('/api', router);

// Rotas para páginas HTML
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

server.get('/produtos', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/produtos.html'));
});

server.get('/contatos', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/contatos.html'));
});

server.get('/encomendas', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/encomendas.html'));
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor rodando em http://${HOST}:${PORT}`);
});

module.exports = server;