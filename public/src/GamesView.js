class GamesView {
	constructor () {}

	render () {
		data.getGames().done(data => {
			$('#main-content')[0].innerHTML = this.renderList(data);
		});
	}

	renderList (gameList) {
		let list = `<ul class="game-list">`;

		gameList.forEach((value) => {
			list += `<li class="game">
    					<img class="mr-3" src="..." alt="Generic placeholder image">
    					<div class="game-content">
      						<h5 class="mt-0 mb-1">${value.title}</h5>
    					</div>
    					<p>${value.description}</p>
  					</li>`;
		});

		list += `</ul>`

		return list;
	}
}