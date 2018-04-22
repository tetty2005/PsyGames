const serve = require('koa-static');
const session = require('koa-session');
const route = require('koa-route');
const routes = require('./routes');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const render = require('koa-ejs');
const app = new Koa();

render(app, {
    root: __dirname,
    viewExt: 'ejs.html',
    layout: false,
    cache: false,
    debug: true
});

app.keys = ['BRKAbYpHXsdZyCmn'];

app.use(serve('public'));
app.use(session({rolling: true}, app));
app.use(bodyParser());
app.use(route.get('/', routes.index));
app.use(route.post('/login', routes.login));
app.use(route.get('/logout', routes.logout));
app.use(route.get('/data/game', routes.game));
app.use(route.get('/play/:id', routes.index));

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
console.log('listening on port 3000');