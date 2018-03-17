class BaseView {
	constructor (el) {
        this.$el = $(el);
	}

	loadTemplate (url, options) {
		const deferred = $.Deferred();

		$.get(url).done(html => {
			const template = _.template(html, options);

			deferred.resolve(template);
		}).fail(reason => deferred.reject(reason));

		return deferred.promise();
	}

    delegateEvents (events) {
		_.each(events, (method, event)=> {
            const eventData = event.split(' ');
        	const selector = eventData.slice(1).join(' ');

			if (!_.isFunction(method)) method = this[method].bind(this);
			if (!method) return;

			this.$el.on(eventData[0], selector, method);
		});
	}

	hide () {
		this.$el.hide('slow');
	}
}