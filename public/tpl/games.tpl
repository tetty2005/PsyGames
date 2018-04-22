<ul class="game-list">
	<% _.each(games, function (game) { %>
		<li class="media" data-id="<%= game.id %>">
			<img class="mr-3" src="/img/<%= game.img %>" alt="<%= game.title %>">
			<div class="media-body">
				<h5 class="mt-0"><%= game.title %></h5>
				<p><%= game.description %></p>
				<a href="/play/<%= game.id %>" class="btn btn-primary btn-sm">Play</a>
			</div>
		</li> 
	<% }); %>
</ul>