class PlanesView {
    constructor (context, redPlaneImg, greenPlaneImg) {
        this.context = context;
        this.redPlaneImg = redPlaneImg;
        this.greenPlaneImg = greenPlaneImg;

        this.planes = [];
        this.x;
        this.y;

        this.planeSectorSize = 70;
        this.planeLength = 50;
        this.planeWidth = 50;
        this.planesNumber = 5;

        this.red = '#DB2A56';
        this.green = '#00A179';

        this.directions = ['top', 'right', 'bottom', 'left'];
        this.planeImgs = [this.redPlaneImg, this.greenPlaneImg];
        this.planeCoords = [];
        this.moveDirection;
        this.planeDirection;
        this.planeImg;
    }

    render () {
        this.initPlaneCoords();
    }

    initPlaneCoords () {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let xc = i*this.planeSectorSize, 
                    yc = j*this.planeSectorSize;

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
        switch (this.moveDirection) {
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
            imgX, imgY, rotateAngle;

        switch (this.planeDirection) {
            case 'right':
                rotateAngle = 0;
                imgX = px + (this.planeSectorSize - this.planeLength) / 2;
                imgY = py + (this.planeSectorSize - this.planeWidth) / 2;

                break;
            case 'left':
                rotateAngle = 180;
                imgX = px + (this.planeSectorSize + this.planeLength) / 2;
                imgY = py + (this.planeSectorSize + this.planeWidth) / 2;

                break;
            case 'bottom':
                rotateAngle = 90;
                imgX = px + (this.planeSectorSize + this.planeLength) / 2;
                imgY = py + (this.planeSectorSize - this.planeWidth) / 2;

                break;
            case 'top':
                rotateAngle = 270;
                imgX = px + (this.planeSectorSize - this.planeLength) / 2;
                imgY = py + (this.planeSectorSize + this.planeWidth) / 2;

                break;
        }

        this.context.save();
        this.context.translate(imgX, imgY);
        this.context.rotate(rotateAngle * Math.PI / 180);
        this.context.drawImage(this.planeImg, 0, 0, this.planeLength, this.planeWidth);
        this.context.restore();
    }

    renderPlanesSettings () {
        this.x = 245;
        this.y = 145;

        this.planeImg = this.planeImgs[this.random(0, 1)];
        this.planeDirection = this.directions[this.random(0, 3)];
        this.moveDirection = this.directions[this.random(0, 3)];
        this.planes = [];

        for (let i = 0; i < this.planesNumber; i++) {
            this.planes.push(this.planeCoords[this.random(0, 8)]);
        }

        var planesSettings = {
            planeImg: this.planeImg,
            planeDirection: this.planeDirection,
            moveDirection: this.moveDirection
        }

        return planesSettings;
    }

    random (from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }
}