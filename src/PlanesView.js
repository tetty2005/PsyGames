class PlanesView {
    constructor (context) {
        this.context = context;
        this.planes = [];
        this.x;
        this.y;

        this.planeheight = 50;
        this.planeBase = 20;
        this.planesNumber = 5;

        this.red = '#DB2A56';
        this.green = '#00A179';

        this.directions = ['top', 'right', 'bottom', 'left'];
        this.planeColors = [this.red, this.green];
        this.planeCoords = [];
        this.moveDirection;
        this.planeDirection;
        this.planeColor;
    }

    render () {
        this.initPlaneCoords();
    }

    initPlaneCoords () {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let xc = i*70, 
                    yc = j*70;
                this.planeCoords.push([xc, yc]);
            }
        }
    }

    drawPlanes () {
        this.context.clearRect(0, 0, 700, 500);

        for (let i = 0; i < this.planesNumber; i++) {
            this.drawPlane(this.planes[i][0], this.planes[i][1]);
        }

        this.changePlaneCoords();
    }

    changePlaneCoords() {
        switch (this.planeDirection) {
        case 'right':
            this.x += 1;
            break;
        case 'left':
            this.x -= 1;
            break;
        case 'bottom':
            this.y += 1;
            break;
        case 'top':
            this.y -= 1;
            break;
        }
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

    renderPlanesSettings () {
        this.x = 245;
        this.y = 145;

        this.planeColor = this.planeColors[this.random(0, 1)];
        this.planeDirection = this.directions[this.random(0, 3)];
        this.moveDirection = this.directions[this.random(0, 3)];
        this.planes = [];

        for (let i = 0; i < this.planesNumber; i++) {
            this.planes.push(this.planeCoords[this.random(0, 8)]);
        }

        var planesSettings = {
            planeColor: this.planeColor,
            planeDirection: this.planeDirection,
            moveDirection: this.moveDirection
        }

        return planesSettings;
    }

    random (from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }
}