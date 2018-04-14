$(document).ready(() => {
    registrateRoutes();
	Router.navigate(location.pathname);

	$(document).on('click', 'a', e => {
		const isRouteExist = Router.navigate($(e.currentTarget).attr('href'));

		if (isRouteExist) {
			e.preventDefault();
		}
	});
});

function registrateRoutes () {
    Router.addRoute('/', (url) => {
        const gamesView = new GamesView('#page-content');

		gamesView.render();
	});

    Router.addRoute('/login', () => {
    	const loginView = new LoginView();

    	loginView.render();

    	return false;
	});

	Router.addRoute('/play/([a-z0-9_-]+)', (url, id) => {
		const planesGameView = new PlanesGameView('#page-content');

		planesGameView.render();
	});
}