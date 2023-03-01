// DOM Elements
const time = document.querySelector('.time'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus'),
    currentMonth = document.querySelector('.month'),
    currentDay = document.querySelector('.day');

// Date values
let months = {
    0: "января",
    1: "февраля",
    2: "марта",
    3: "апреля",
    4: "мая",
    5: "июня",
    6: "июля",
    7: "августа",
    8: "сентября",
    9: "октября",
    10: "ноября",
    11: "декабря",
}

let daysOfTheWeek = {
    0: "Воскресенье",
    1: "Понедельник",
    2: "Вторник",
    3: "Среда",
    4: "Четверг",
    5: "Пятница",
    6: "Суббота"
}

// Show Time
// Show Time
function showTime() {
    let today = new Date(),
        day = today.getDate(),
        dayOfTheWeek = today.getDay(),
        month = today.getMonth(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();


    // Output date
    currentDay.innerHTML = daysOfTheWeek[dayOfTheWeek];
    currentMonth.innerHTML = `${day} ${months[month]}`;

    // Output Time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

    setTimeout(showTime, 1000);

    // Change Background Image Every Hour
    if (min == 59 && sec == 59) {
        setTimeout(getImage, 1000);
    }
}

// Add Zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    if (hour < 6) {
        // Night
        document.body.style.backgroundImage = `url('./assets/images/${bgImagesList[hour]}')`;
        greeting.textContent = 'Good night, ';
    } else if (hour < 12) {
        // Morning
        document.body.style.backgroundImage = `url('./assets/images/${bgImagesList[hour]}')`;
        greeting.textContent = 'Good morning, ';
        } else if (hour < 18) {
        // Afternoon
        document.body.style.backgroundImage = `url('./assets/images/${bgImagesList[hour]}')`;
        greeting.textContent = 'Good afternoon, ';
    } else {
        // Evening
        document.body.style.backgroundImage = `url('./assets/images/${bgImagesList[hour]}')`;
        greeting.textContent = 'Good evening, ';
    }
}

// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Set Name
function setName(e) {
    if (e.type === 'keypress') {
        // Make sure Enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            // Make sure the field is not empty
            if (e.target.innerText === '') {
                if (localStorage.getItem('name') === null) {
                    name.textContent = '[Enter name]';
                    localStorage.removeItem('name');
                }
            } else {
                localStorage.setItem('name', e.target.innerText);
            }
            name.blur();
        }
    } else {
        if (e.target.innerText === '') {
            if (localStorage.getItem('name') === null) {
                name.textContent = '[Enter name]';
            } else {
                name.textContent = localStorage.getItem('name');
            }
        } else {
            if (name.textContent !== '[Enter name]') {
                localStorage.setItem('name', e.target.innerText);
            }
        }
    }
}

// Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// Set Focus
function setFocus(e) {
    if (e.type === 'keypress') {
        // Make sure Enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            // Make sure the field is not empty
            if (e.target.innerText === '') {
                if (localStorage.getItem('focus') === null) {
                    focus.textContent = '[Enter focus]';
                    // localStorage.removeItem('focus');
                }
            } else {
                localStorage.setItem('focus', e.target.innerText);
            }
            focus.blur();
        }
    } else {
        if (e.target.innerText === '') {
            if (localStorage.getItem('focus') === null) {
                focus.textContent = '[Enter focus]';
                localStorage.removeItem('focus');
            } else {
                focus.textContent = localStorage.getItem('focus');
            }
        } else {
            if (focus.textContent !== '[Enter focus]') {
                localStorage.setItem('focus', e.target.innerText);
            }
        }
    }
}

// Changing Text inside Focus, Name
function changeText() {
    this.textContent = '';
}

// Background Image Change
const base = './assets/images/';
let bgImagesList = [];

function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {      
        body.style.backgroundImage = `url(${src})`;
    }; 
}

let i = new Date().getHours();

function getImage() {
    const index = ((i+1) % 24);
    const imageSrc = base + bgImagesList[index];
    viewBgImage(imageSrc);
    i++;
    btnWeather.disabled = true;
    setTimeout(function() {
        btnWeather.disabled = false
    }, 1000);
} 

const btnWeather = document.querySelector('.btn_weather');
btnWeather.addEventListener('click', getImage);

// Set Background Images List
function createBgImagesList() {
    let dayTime;
    let i = 0;
    while (i < 24) {
        if (i < 6) {
            dayTime = 'night/';
            addImagesToList(dayTime);
        } else if (i < 12) {
            dayTime = 'morning/';
            addImagesToList(dayTime);
        } else if (i < 18) {
            dayTime = 'day/';
            addImagesToList(dayTime);
        } else {
            dayTime = 'evening/';
            addImagesToList(dayTime);
        }
        i++;
    }
}

// Add random images to list
function addImagesToList(dayTime) {
    let imgQuantity = 0;
    imgQuantity = Math.floor(Math.random() * 20 + 1);
    if (imgQuantity < 10) {
        imgQuantity = '0' + imgQuantity;
    }
    // Check if there is the same Img in List already
    if (bgImagesList.indexOf(`${dayTime}${imgQuantity}.jpg`) == -1) {
        bgImagesList.push(`${dayTime}${imgQuantity}.jpg`);
    } else addImagesToList(dayTime);
}

// Set Quote
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btnQuote = document.querySelector('.btn_quote');

async function getQuote() {
    const url = `https://api.adviceslip.com/advice`;
    const res = await fetch(url);
    const data = await res.json(); 
    blockquote.textContent = data.slip.advice;
}

// Weather Widget
const weatherWidget = document.querySelector('.weather-widget');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const weatherHumidity = document.querySelector('.weather-humidity');
const weatherWindSpeed = document.querySelector('.weather-wind-speed');

// Get Weather Data From API
async function getWeather() {  
    if (localStorage.getItem('city') === null) {
        city.textContent = '[Enter city]';
    } else {
        city.textContent = localStorage.getItem('city');
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=0b68090578372827c5a76aa5320916c8&units=metric`;
        const res = await fetch(url);
        const data = await res.json(); 
        console.log(data.weather[0].id, data.weather[0].description, data.main.temp);

        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp}В°C`;
        weatherHumidity.textContent = `Р’Р»Р°Р¶РЅРѕСЃС‚СЊ: ${data.main.humidity}%`;
        weatherWindSpeed.textContent = `Р’РµС‚РµСЂ: ${data.wind.speed}Рј/СЃ`;
        weatherDescription.textContent = data.weather[0].description;
    } catch(err) {
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent = '';
        weatherHumidity.textContent = '';
        weatherWindSpeed.textContent = '';
        console.log(`No city found. Please enter correct name of a city`);
        weatherDescription.textContent = `No such city found. Please enter correct name of a city`;
    }

    
}

// Set Weather Data in Widget
function setCity(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            // Make sure the field is not empty
            if (e.target.innerText === '') {
                if (localStorage.getItem('city') === null) {
                    city.textContent = '[Enter city]';
                    localStorage.removeItem('city');
                }
            } else {
                localStorage.setItem('city', e.target.innerText);
            }
            getWeather();
            city.blur();
        }
    } else {
        if (e.target.innerText === '') {
            if (localStorage.getItem('city') === null) {
                city.textContent = '[Enter city]';
            } else {
                city.textContent = localStorage.getItem('city');
            }
        } else {
            if (city.textContent !== '[Enter city]') {
                localStorage.setItem('city', e.target.innerText);
            }
        }
        getWeather();
    }
}


name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', changeText);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', changeText);
btnQuote.addEventListener('click', getQuote);
document.addEventListener('DOMContentLoaded', getQuote);
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener('click', changeText);

// Run
showTime();
getName();
getFocus();
createBgImagesList();
setBgGreet();
getWeather();