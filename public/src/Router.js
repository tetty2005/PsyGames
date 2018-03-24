class Router {
	constructor () {
		this.routes = [];
	}

	static addRoute (url, handler) {
		this.getInstance().routes.push({url, handler});
	}

	execute (url) {
		const route = _.find(this.routes, (route) => (new RegExp(route.url, 'i')).test(url));

		if (route) {
			const params = url.match(new RegExp(route.url, 'i'));
			route.handler(...params);
		} else {
			console.log('route ' + url + ' doesn`t exist');
		}
	}

	static navigate (url) {
		window.history.pushState({},"", url);
		this.getInstance().execute(url);
	}

	static getInstance () {
		return Router.instance || (Router.instance = new Router());
	}
}