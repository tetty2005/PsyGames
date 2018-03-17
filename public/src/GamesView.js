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

    _startGame () {
		const planesGameView = new PlanesGameView('#planes-game-view');

		this.hide();
        planesGameView.render();

	}
}