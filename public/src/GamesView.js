class GamesView extends BaseView {
	constructor (el) {
		super(el);
		this.delegateEvents({
			'click .btn-start-game': '_startGame'
		});
	}

	render () {
		this.loadTemplate('/tpl/games.tpl', {variable: 'games'}).done(template => {
			data.getGames().done(games => {
				this.$el.html(template(games));
			});
		});
	}

    _startGame (e) {
		const planesGameView = new PlanesGameView('#planes-game-view');
		const gameId = $(e.currentTarget).parents('li').data('id');

		this.hide();
        planesGameView.render();
        Router.navigate('game/' + gameId);
	}
}