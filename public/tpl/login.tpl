<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="loginModalLabel">Choose your account on social site:</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <script src="//ulogin.ru/js/ulogin.js"></script>
                <div id="uLogin" data-ulogin="display=panel;theme=flat;fields=email,first_name,last_name;providers=google,facebook,instagram;hidden=yandex,mailru,vkontakte,twitter,livejournal,odnoklassniki;redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin;mobilebuttons=0;"></div>
            </div>
        </div>
    </div>
</div>