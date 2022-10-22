let i = 0;
let r = 0;
let images = [];
let reviewsImages = []
const slideTime = 5000; // 3 seconds
const background = document.getElementById("first");
const vertical = document.getElementById("vertical");
const horizontal = document.getElementById("horizontal");
const arrowBackgroundLeft = document.getElementById("arrow-back-left");
const arrowBackgroundRight = document.getElementById("arrow-back-right");
const arrowReview = document.getElementById("arrow-review");
arrowBackgroundLeft.addEventListener("click", () => changeBackground("left"));
arrowBackgroundRight.addEventListener("click", () => changeBackground("right"));
arrowReview.addEventListener("click", changeReview)

reviewsImages[0] = { vertical: 'images/vertical.jpg', horizontal: "images/horizontal.jpg" };
reviewsImages[1] = { vertical: 'images/vertical2.jpg', horizontal: "images/horizontal2.jpg" };
reviewsImages[2] = { vertical: 'images/vertical3.jpg', horizontal: "images/horizontal3.jpg" };

images[0] = 'images/title.jpg';
images[1] = 'images/title2.jpg';
images[2] = 'images/title3.jpg';

function changeBackground(direction = "right") {
    direction === "right" ? i++ : i--;
    if (i > images.length - 1) {
        i = 0;
    }
    else if (i < 0) {
        i = 2;
    }

    background.style.backgroundImage = "url(" + images[i] + ")";
}

function changeReview() {
    r++;
    if (r > reviewsImages.length - 1) {
        r = 0;
    }

    vertical.src = reviewsImages[r].vertical;
    horizontal.src = reviewsImages[r].horizontal;
}


function changeBackgroundAuto() {
    changeBackground();

    setTimeout(changeBackground, slideTime);
}

// window.onload = changePictureAuto;