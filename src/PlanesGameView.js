class PlanesGameView {
    constructor () {
        this.canvas = document.getElementById('game-canvas');
        this.context = this.canvas.getContext('2d');

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

        // document.body.appendChild(this.redPlaneImg);
        // document.body.appendChild(this.greenPlaneImg);
    }

    render () {
        this.planesView = new PlanesView(this.context, this.redPlaneImg, this.greenPlaneImg);

        this.planesView.render();
        this.initListeners();
        this.startGame();
    }

    initListeners () {
        document.addEventListener('keydown', (e) => {
            if (this.isInGame) {
                this.onKeyDown(e);
            }
        });
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
        console.log(this.planesSettings);
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