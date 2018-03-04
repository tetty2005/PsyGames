class BaseView {
	constructor () {}

	loadTemplate (url, options) {
		const deferred = $.Deferred();

		$.get(url).done(html => {
			const template = _.template(html, options);

			deferred.resolve(template);
		}).fail(reason => deferred.reject(reason));

		return deferred.promise();
	}
}