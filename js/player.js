const audio = new Audio();
const playBtn = document.querySelector(".play-main");
const playNext = document.querySelector(".play-next");
const playPrev = document.querySelector(".play-prev");

const list = document.querySelector(".play-list");
const listItem = list.querySelectorAll("span");
import playList from "playList.js";
let playNum = 0;

let isPlay = false;
function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  if (!isPlay) {
    audio.play();
    isPlay = true;
    toggleBtn();
    changeList();
  } else {
    audio.pause();
    isPlay = false;
    toggleBtn();
    changeList();
  }
}

function toggleBtn() {
  playBtn.classList.toggle("pause");
}

playBtn.addEventListener("click", playAudio);

playNext.addEventListener("click", () => {
  if (isPlay) {
    audio.pause();
    changeList();
  }
  if (playNum == 3) {
    playNum = 0;
  } else {
    playNum++;
  }
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  playBtn.classList.add("pause");
  changeList();
  audio.play();
});

playPrev.addEventListener("click", () => {
  if (isPlay) {
    audio.pause();
    changeList();
  }
  if (playNum == 0) {
    playNum = 3;
  } else {
    playNum--;
  }
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  playBtn.classList.add("pause");
  changeList();
  audio.play();
});

function changeList() {
  for (let i = 0; i < listItem.length; i++) {
    if (playNum == i) {
      listItem[i].classList.toggle("playing");
      listItem[i].textContent = playList[i].title;
    }
  }
}