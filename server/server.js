const jsonServer = require('json-server');
const path = require('path');

const router = jsonServer.router(path.join(__dirname, 'db.json'));

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);


server.use(router);
server.listen(7900, () => {
  console.log('JSON server is running :-)')
});
