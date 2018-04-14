class Router {
	constructor () {
		this.routes = [];
	}

	static addRoute (url, handler) {
		this.getInstance().routes.push({url, handler});
	}

	findRoute (url) {
		const route = _.find(this.routes, (route) => (new RegExp('^' + route.url + '$', 'i')).test(url));
		
		if (!route) {
			console.log('route ' + url + ' doesn`t exist');
		}

		return route;
	}

	execute (url, route) {
		const params = url.match(new RegExp(route.url, 'i'));

		return route.handler(...params);
	}

	static navigate (url) {
		const route = this.getInstance().findRoute(url);

		if (route) {
            const shouldNavigate = this.getInstance().execute(url, route);

            if (shouldNavigate !== false) {
                window.history.pushState({}, '', url);
			}

			return true;
		}

		return false;
	}

	static getInstance () {
		return Router.instance || (Router.instance = new Router());
	}
}