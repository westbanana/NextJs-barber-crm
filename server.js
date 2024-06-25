const jsonServer = require('json-server');

const path = require('path');

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '../../test/api/dev.json'));
const middlewares = jsonServer.defaults();

app.use((req, res, next) => {
  setTimeout(next, 10000);
});
app.use(middlewares);
app.use(router);

server = app.listen(3000, () => {
  done();
});
