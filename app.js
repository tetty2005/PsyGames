const serve = require('koa-static');
const route = require('koa-route');
const routes = require('./routes');
const Koa = require('koa');
const app = new Koa();

app.use(serve('public'));
app.use(route.get('/login', routes.login));
app.use(route.get('/data/game', routes.game));
app.use(route.get('/play/:id', routes.play));

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
console.log('listening on port 3000');