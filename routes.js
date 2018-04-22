module.exports = {
    index: async (ctx) => {
        await ctx.render('index', {user: ctx.session.user});
    },
    login: async (ctx) => {
        const user = await new Promise((resolve, reject) => {
            const http = require('http');
            const path = `/token.php?token=${ctx.request.body.token}&host=localhost:3000`;
            const req = http.request({host: 'ulogin.ru', path: path}, (res) => {
                let data = '';

                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });
            req.on('error', (e) => {
                reject(`Problem with request: ${e.message}`);
            });
            req.end();
        });

        ctx.session.user = user;
        ctx.redirect('back');
    },
    logout: (ctx) => {
        ctx.session.user = null;
        ctx.redirect('/');
    },
    game: (ctx) => {
        ctx.body = [
            {
                id: 'planes',
                title: 'Planes game',
                img: 'planes-game-title.png',
                description: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.'
            },
            {
                id: 'game1',
                title: 'Some other game',
                img: 'game-img.png',
                description: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.'
            },
            {
                id: 'game2',
                title: 'Some other game 2',
                img: 'game-img.png',
                description: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.'
            }
        ];
    }
};
