const weatherDescription = document.querySelector('.weather-description');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const city = document.querySelector('.city');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

async function getWeather() {
    if (!localStorage.getItem('city')) {
        city.textContent = '[Enter City]';
    }
    else {
        city.textContent = localStorage.getItem('city');
        const appId = 'beb098bcca80656059828b03e028a2b0';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=${appId}&units=metric`;
        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            weatherIcon.className = 'weather-icon owf';
            weatherIcon.classList.add(`owf-${data.weather[0].id}`);
            temperature.textContent = `${data.main.temp}°C`;
            humidity.textContent = `humidity: ${data.main.humidity}`;
            wind.textContent = `wind speed: ${data.wind.speed}`;
            weatherDescription.textContent = data.weather[0].description;
        }
        else{
            alert('city is not found');
            localStorage.removeItem('city')
            city.textContent = '[Enter City]';
            temperature.textContent = '';
            weatherDescription.textContent = '';
            weatherIcon.className = '';
            humidity.textContent = '';
            wind.textContent = '';
            weatherIcon.classList.remove(`owf-${data.weather[0].id}`);
        }

    }

}

function setCity(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            if (!e.target.innerText || !e.target.innerText.trim()) {
                getWeather();
                city.blur();
                return;
            }
            localStorage.setItem('city', e.target.innerText);
            city.blur();
        }
    }
}
function cityClicked() {
    city.textContent = '';
}
city.addEventListener('blur', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('click', cityClicked);
getWeather();