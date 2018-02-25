const serve = require('koa-static');
const route = require('koa-route');
const routes = require('./routes');
const Koa = require('koa');
const app = new Koa();

app.use(serve('public'));
app.use(route.get('/game', routes.game));

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
console.log('listening on port 3000');