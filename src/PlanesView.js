class PlanesView {
    constructor (context) {
        this.planes = [];
        // this.canvas = document.getElementById('game-canvas');
        // this.context = this.canvas.getContext('2d');
        this.context = context;
        // this.isInGame = false;
        // this.gameDuration = 3000;
        // this.actionStartTime;
        // this.actionMaxDuration = 8000;
        // this.correctAnswers = 0;
        // this.totalActions = 0;
        this.x;
        this.y;
        this.red = '#DB2A56';
        this.green = '#00A179';
        // this.backgroundCanvasColor = '#013E57';
        this.planeheight = 50;
        this.planeBase = 20;
        this.planesNumber = 5;
        this.directions = ['top', 'right', 'bottom', 'left'];
        this.planeColors = [this.red, this.green];
        this.planeCoords = [];
        this.moveDirection;
        this.planeDirection;
        this.planeColor;
    }

    initPlaneCoords () {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let xc = i*70, 
                    yc = j*70;
                this.planeCoords.push([xc, yc]);
            }
        }

        // this.initApp();
        // this.startGame();
    }

    drawPlane (dx, dy) {
        let px = this.x + dx, 
            py = this.y + dy,
            px1, py1, px2, py2;
        this.context.fillStyle = this.planeColor;
        this.context.beginPath();
        this.context.moveTo(px, py);

        switch (this.moveDirection) {
            case 'right':
                px1 = px - this.planeheight,
                py1 = py - this.planeBase,
                px2 = px - this.planeheight,
                py2 = py + this.planeBase;
                break;
            case 'left':
                px1 = px + this.planeheight,
                py1 = py - this.planeBase,
                px2 = px + this.planeheight,
                py2 = py + this.planeBase;
                break;
            case 'bottom':
                px1 = px + this.planeBase,
                py1 = py - this.planeheight,
                px2 = px - this.planeBase,
                py2 = py - this.planeheight;
                break;
            case 'top':
                px1 = px + this.planeBase,
                py1 = py + this.planeheight,
                px2 = px - this.planeBase,
                py2 = py + this.planeheight;
                break;
        }

        this.context.lineTo(px1, py1);
        this.context.lineTo(px2, py2);
        this.context.fill();         
    }

    drawPlanes () {
        this.context.clearRect(0, 0, 700, 500);

        for (let i = 0; i < this.planesNumber; i++) {
            this.drawPlane(this.planes[i][0], this.planes[i][1]);
        }
    }

    random (from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    startAction () {
        this.x = 245;
        this.y = 145;
        
        this.planeColor = this.planeColors[this.random(0, 1)];
        this.planeDirection = this.directions[this.random(0, 3)];
        this.moveDirection = this.directions[this.random(0, 3)];
        this.planes = [];

        for (let i = 0; i < this.planesNumber; i++) {
            this.planes.push(this.planeCoords[this.random(0, 8)]);
        }

        this.actionStartTime = new Date();
        this.totalActions++;
    }

    // startGame () {
    //     this.totalActions = 0;
    //     this.correctAnswers = 0;
    //     this.isInGame = true;
    //     this.startAction();
    //     this.gameEngineStep();
    //     setTimeout(()=> this.stopGame(), this.gameDuration);
    // }

    // stopGame () {
    //     this.isInGame = false;
    //     let resultText = 'Your score is: ' + this.correctAnswers + ' from ' + this.totalActions;
    //     this.showResults(resultText);
    // }

    // showResults (resultText) {
    //     $('#resultModal p').html(resultText);
    //     $('#resultModal .btn-restart-game').one('click', ()=> this.startGame());
    //     $('#resultModal').modal('show');
    // }
        
    // initApp () {
    //     document.addEventListener('keydown', (e) => {
    //         if (this.isInGame) {
    //             this.onKeyDown(e);
    //         }
    //     });
    // }

    // onKeyDown (e) {
    //     let directionsByKeyCode = {
    //                 37: 'left',
    //                 38: 'top',
    //                 39: 'right',
    //                 40: 'bottom',
    //                 65: 'left',
    //                 87: 'top',
    //                 68: 'right',
    //                 83: 'bottom',
    //             };

    //     let keyDirection = directionsByKeyCode[e.keyCode];
    //     if (!keyDirection) {
    //         return;
    //     }

    //     let checkDirection = (this.planeColor === this.red)? this.planeDirection: this.moveDirection;

    //     if (checkDirection === keyDirection) {
    //         this.correctAnswers++;
    //     } else {
    //         this.canvas.style.backgroundColor = this.red;
    //         setTimeout(()=> this.canvas.style.backgroundColor = this.backgroundCanvasColor, 100);
    //     }
        
    //     this.startAction();
    // }

    // gameEngineStep () {
    //     if (this.isInGame) {
    //         this.gameLoop();
    //         requestAnimationFrame(()=> this.gameEngineStep());
    //     }
    // }

    // gameLoop () {
    //     if (this.actionStartTime.getTime() + this.actionMaxDuration < (new Date()).getTime()) {
    //         this.startAction();
    //     }

    //     this.drawPlanes();

    //     switch (this.planeDirection) {
    //         case 'right':
    //             this.x += 1;
    //             break;
    //         case 'left':
    //             this.x -= 1;
    //             break;
    //         case 'bottom':
    //             this.y += 1;
    //             break;
    //         case 'top':
    //             this.y -= 1;
    //             break;
    //     }
    // }
}