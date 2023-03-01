const time = document.querySelector('.time');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const focus = document.querySelector('.focus');
const date = document.querySelector('.date');


const slidePrev = document.querySelector(".slide-prev");
const slideNext = document.querySelector(".slide-next");
const selectSource = document.querySelector(".settings-picture");
let randomNum;
let playNum = 0;




function showTime() {
  let today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  let formatter = new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });

  time.innerText = `${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;
  date.innerText = formatter.format(today);
  setTimeout(showTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function getName() {
  if (!localStorage.getItem('name')) {
    name.textContent = '[Enter Name]';
  }
  else {
    name.textContent = localStorage.getItem('name');
  }
}

function setName(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if (!e.target.innerText || !e.target.innerText.trim()) {
        getName();
        name.blur();
        return;
      }
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  }
}

function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

function setFocus(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if (!e.target.innerText || !e.target.innerText.trim()) {
        getFocus();
        focus.blur();
        return;
      }
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } 
}

function nameClicked() {
  name.textContent = '';
}
function focusClicked() {
  focus.textContent = '';
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', getName);
name.addEventListener('click', nameClicked);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', getFocus);
focus.addEventListener('click', focusClicked);


showTime();
getName();
getFocus();