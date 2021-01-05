// import document from "document";
// var currentAnimation = 'sit';
// var image = document.getElementById('image');
// var animationFrame = 1;
// var animationInterval = null;

class Pet {
    constructor(image) {
        this.currentAnimation = 'sit';
        this.image = image;
        this.animationFrame = 1;
        this.animationInterval = null;
    }
    swapImageAnimator() {
        switch (this.currentAnimation) {
            case 'sit':
                //console.log(animationFrame);
                sitAnimation();
                break;
            case 'sleep':
                sleepAnimation();
                break;
            case 'eat':
                eatAnimation();
                break;
        }
    }
    Animate() {
        this.animationInterval = setInterval(swapImageAnimator, 500);
    }
    sitAnimation() {
        switch (this.animationFrame) {
            case 1:
                this.image.href = "../resources/petImages/tile000.png";
                this.animationFrame = 2;
                break;
            case 2:
                this.image.href = "../resources/petImages/tile001.png";
                this.animationFrame = 3;
                break;
            case 3:
                this.image.href = "../resources/petImages/tile002.png";
                this.animationFrame = 1;
                break;
            // case 4:
            //     image.href = "../resources/petImages/tile003.png";
            //     animationFrame = 5;
            //     break;
            // case 5:
            //     image.href = "../resources/petImages/tile004.png";
            //     animationFrame = 6;
            //     break;
            // case 6:
            //     image.href = "../resources/petImages/tile005.png";
            //     animationFrame = 1;
            //     break;

        }
    }

    sleepAnimation() {
        switch (this.animationFrame) {
            case 1:
                this.image.href = "img/spot-sleep1.png";
                this.animationFrame = 2;
                break;
            case 2:
                this.image.href = "img/spot-sleep2.png";
                this.animationFrame = 1;
                break;
        }
    }

    eatAnimation() {
        switch (this.animationFrame) {
            case 1:
                this.image.href = "img/spot-eat1.png";
                this.animationFrame = 2;
                break;
            case 2:
                this.image.href = "img/spot-eat2.png";
                this.animationFrame = 1;
                break;
        }
    }
}

module.exports = Pet;

