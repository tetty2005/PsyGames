$(document).ready(() => {
	Router.addRoute('/', (url) => {
		const gamesView = new GamesView('#games-view');

		gamesView.render();
	});

	Router.addRoute('/play/([a-z0-9_-]+)', (url, id) => {
		const planesGameView = new PlanesGameView('#planes-game-view');
		
        planesGameView.render();
	});

	Router.navigate(location.pathname);

	$(document).on('click', 'a', e => {
		const isRouteExist = Router.navigate($(e.currentTarget).attr('href'));

		if (isRouteExist) {
			e.preventDefault();
		}
	});
});