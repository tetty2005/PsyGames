<ul class="game-list">
	<% _.each(games, function (game) { %>
		<li class="game">
			<img class="mr-3" src="..." alt="Generic placeholder image">
			<div class="game-content">
				<h5 class="mt-0 mb-1"><%= game.title %></h5>
			</div>
			<p><%= game.description %></p>
		</li> 
	<% }); %>
</ul>