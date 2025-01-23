const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data/questions.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(
    jsonServer.rewriter({
        '/api/*': '/$1',
        '/product/:resource/:id/show': '/:resource/:id',
    })
);
server.use(router);
server.listen(8000, () => {
    console.log('JSON Server is running');
});

module.exports = server;
