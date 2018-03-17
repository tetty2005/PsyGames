<ul class="game-list">
	<% _.each(games, function (game) { %>
		<li class="media">
			<img class="mr-3" src="/img/<%= game.img %>" alt="<%= game.title %>">
			<div class="media-body">
				<h5 class="mt-0"><%= game.title %></h5>
				<p><%= game.description %></p>
				<button type="button" class="btn btn-primary btn-sm btn-start-game">Play</button>
			</div>
		</li> 
	<% }); %>
</ul>