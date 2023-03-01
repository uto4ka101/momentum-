const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btnQuote = document.querySelector('.btn-quote');
async function getQuote() {
    const url = `https://type.fit/api/quotes`;
    const res = await fetch(url);
    if (res.ok) {
        const data = await res.json();
        const randomNumber = getRandomNumber(data.length - 1);
        blockquote.textContent = data[randomNumber].text;
        figcaption.textContent = data[randomNumber].author;
    }
}
function getRandomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
document.addEventListener('DOMContentLoaded', getQuote);
btnQuote.addEventListener('click', getQuote);

