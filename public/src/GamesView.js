class GamesView extends BaseView {
	constructor (el) {
		super(el);
	}

	render () {
		this.loadTemplate('/tpl/games.tpl', {variable: 'games'}).done(template => {
			data.getGames().done(games => {
				this.$el.html(template(games));
			});
		});
	}
}