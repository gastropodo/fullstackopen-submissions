import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use('/anecdotes', (req, res, next) => {
    if (req.method === 'POST') {
        const { content } = req.body;
        if (content.length < 5) res.status(400).jsonp({
            error: 'Anecdote content must be at least 5 characters long.'
        });
    }
    next();
});

server.use(router);
server.listen(3001, () => {
    console.log('JSON Server is running');
});