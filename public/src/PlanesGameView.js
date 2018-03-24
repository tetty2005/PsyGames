class PlanesGameView extends BaseView {
    constructor (el) {
        super(el);

        this.isInGame = false;
        this.gameDuration = 10000;
        this.actionStartTime;
        this.actionMaxDuration = 5000;

        this.correctAnswers = 0;
        this.totalActions = 0;
        this.red = '#DB2A56';
        this.backgroundCanvasColor = '#013E57';

        this.redPlaneImg = new Image();
        this.redPlaneImg.src = 'img/red-plane.svg';

        this.greenPlaneImg = new Image();
        this.greenPlaneImg.src = 'img/green-plane.svg';
    }

    render () {
        this.loadTemplate('/tpl/planes.tpl').done(template => {
            this.$el.html(template());
            this.canvas = this.$el.find('canvas')[0];
            this.context = this.canvas.getContext('2d');
            this.planesView = new PlanesView(this.context, this.redPlaneImg, this.greenPlaneImg);
            this.planesView.render();
            this.initListeners();
            this.showInstruction();
        });
    }

    initListeners () {
        document.addEventListener('keydown', (e) => {
            if (this.isInGame) {
                this.onKeyDown(e);
            }
        });
    }

    showInstruction () {
        var text = `If you see: <br>
                    <strong>Green planes</strong> - choose button with its mooving direction. <br>
                    <strong>Red planes</strong> - choose button with airplane's noses direction.`;

        $('#instructionModal p').html(text);
        $('#instructionModal .btn-restart-game').one('click', ()=> this.startGame());
        $('#instructionModal').modal('show');
    }

    startGame () {
        this.totalActions = 0;
        this.correctAnswers = 0;
        this.isInGame = true;

        this.startAction();
        this.gameEngineStep();
        setTimeout(()=> this.stopGame(), this.gameDuration);
    }

    startAction () {
        this.planesSettings = this.planesView.renderPlanesSettings();
        this.actionStartTime = new Date();
    }

    gameEngineStep () {
        if (this.isInGame) {
            this.gameLoop();
            requestAnimationFrame(()=> this.gameEngineStep());
        }
    }

    gameLoop () {
        if (this.actionStartTime.getTime() + this.actionMaxDuration < (new Date()).getTime()) {
            this.totalActions++;
            this.startAction();
        }

        this.planesView.drawPlanes();
    }

    onKeyDown (e) {
        let directionsByKeyCode = {
                    37: 'left',
                    38: 'top',
                    39: 'right',
                    40: 'bottom',
                    65: 'left',
                    87: 'top',
                    68: 'right',
                    83: 'bottom',
                };

        let keyDirection = directionsByKeyCode[e.keyCode];
        if (!keyDirection) {
            return;
        }

        let checkDirection = (this.planesSettings.planeImg === this.redPlaneImg)? 
                            this.planesSettings.planeDirection: 
                            this.planesSettings.moveDirection;

        if (checkDirection === keyDirection) {
            this.correctAnswers++;
        } else {
            this.canvas.style.backgroundColor = this.red;
            setTimeout(()=> this.canvas.style.backgroundColor = this.backgroundCanvasColor, 100);
        }

        this.totalActions++;
        this.startAction();
    }

    stopGame () {
        this.isInGame = false;
        let accuracy = Math.round(this.correctAnswers / this.totalActions * 100);
        let score = this.correctAnswers * this.totalActions * accuracy;
        let resultText = `Your accuracy is: <strong>${accuracy}%</strong>. <br>
                            Your score is <strong>${score}</strong>.`;

        this.showResults(resultText);
    }

    showResults (resultText) {
        $('#resultModal p').html(resultText);
        $('#resultModal .btn-restart-game').one('click', ()=> this.startGame());
        $('#resultModal').modal('show');
    }
}