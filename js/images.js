let currentImageIndex = 0;
let imageScrollIndex = null;
let imageScrollFolderIndex = null;
const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg'];
const folders = ['morning', 'day', 'evening', 'night'];
const imageBaseUrl = 'assets/images/';
let timeOfDay = '';

function getRandomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomImages() {
    let array = [];
    let imagesArray = [];
    for (let i = 0; i < 4; i++) {
        while (true) {
            const randomNumber = getRandomNumber(08);
            if (array.indexOf(randomNumber, 0) === -1) {
                array.push(randomNumber);
            }
            if (array.length === 6) {
                break;
            }
        }
        imagesArray = imagesArray.concat(array);
        array = [];
    }
    return imagesArray;

}

let randomImages = getRandomImages();

function setBgGreet() {
    const today = new Date();
    const hour = today.getHours();
    if (hour >= 6 && hour < 12) {
        timeOfDay = 'morning';
        greeting.textContent = 'Good Morning, ';
    }
    else if (hour >= 12 && hour < 18) {
        timeOfDay = 'day';
        greeting.textContent = 'Good Day, ';
    }
    else if (hour >= 18 && hour < 24) {
        timeOfDay = 'evening';
        greeting.textContent = 'Good Evening, ';
    }
    else {
        timeOfDay = 'night';
        greeting.textContent = 'Good Night, ';
    }
    const imageName = timeOfDay + '/' + images[randomImages[hour]];
    viewBgImage(`${imageBaseUrl}${imageName}`);
    currentImageIndex = hour;
}

function imageScroll() {
    currentImageIndex = currentImageIndex === 23 ? 0 : ++currentImageIndex;
    if (currentImageIndex >= 6 && currentImageIndex < 12) {
        folderName = 'morning';
    }
    else if (currentImageIndex >= 12 && currentImageIndex < 18) {
        folderName = 'day';
    }
    else if (currentImageIndex >= 18 && currentImageIndex < 24) {
        folderName = 'evening';
    }
    else {
        folderName = 'night';
    }
    const imageName = folderName + '/' + images[randomImages[currentImageIndex]];
    viewBgImage(`${imageBaseUrl}${imageName}`);
 
}
function viewBgImage(url) {
    const body = document.querySelector('body');
    const img = document.createElement('img');
    img.src = url;
    img.onload = () => {
        body.style.backgroundImage = `url(${url})`;
    };
}

function callEveryFullHour(myFunc) {
    const now = new Date();
    const nextHour = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours() +
        1, 0, 0, 0);
    const difference = nextHour - now;

    return setTimeout(function () {
        myFunc();
        callEveryFullHour(myFunc);
    }, difference);
}

const btn = document.querySelector('.btn');
btn.addEventListener('click', imageScroll);
setBgGreet();
callEveryFullHour(setBgGreet);