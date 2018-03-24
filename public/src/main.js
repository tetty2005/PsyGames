$(document).ready(() => {

	Router.addRoute('game/([a-z0-9_-]+)', (url, id) => console.log('games added', url, id));

	const gamesView = new GamesView('#games-view');

	gamesView.render();
	$(window).on('hashchange', ()=> {
		console.log('hashchange');
	});
});