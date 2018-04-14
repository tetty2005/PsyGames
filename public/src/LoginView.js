class LoginView extends BaseView {
    constructor () {
        super();
    }

    render () {
        this.loadTemplate('/tpl/login.tpl').done(template => {
            $('body').append(template());
            this.$loginModal = $('#loginModal');
            this.$loginModal.modal('show');
        });
    }
}