class PlanesGameView {
    constructor () {
        this.canvas = document.getElementById('game-canvas');
        this.context = this.canvas.getContext('2d');

        this.isInGame = false;
        this.gameDuration = 3000;
        this.actionStartTime;
        this.actionMaxDuration = 8000;

        this.correctAnswers = 0;
        this.totalActions = 0;
        this.red = '#DB2A56';
        this.backgroundCanvasColor = '#013E57';
    }

    render () {
        this.planesView = new PlanesView(this.context);

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

        this.totalActions++;
    }

    gameEngineStep () {
        if (this.isInGame) {
            this.gameLoop();
            requestAnimationFrame(()=> this.gameEngineStep());
        }
    }

    gameLoop () {
        if (this.actionStartTime.getTime() + this.actionMaxDuration < (new Date()).getTime()) {
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

        let checkDirection = (this.planesSettings.planeColor === this.red)? 
                            this.planesSettings.planeDirection: 
                            this.planesSettings.moveDirection;

        if (checkDirection === keyDirection) {
            this.correctAnswers++;
        } else {
            this.canvas.style.backgroundColor = this.red;
            setTimeout(()=> this.canvas.style.backgroundColor = this.backgroundCanvasColor, 100);
        }
        
        this.startAction();
    }

    stopGame () {
        let resultText = 'Your score is: ' + this.correctAnswers + ' from ' + this.totalActions;
        this.isInGame = false;

        this.showResults(resultText);
    }

    showResults (resultText) {
        $('#resultModal p').html(resultText);
        $('#resultModal .btn-restart-game').one('click', ()=> this.startGame());
        $('#resultModal').modal('show');
    }
}