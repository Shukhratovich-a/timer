const elTimerNode = selectElement(".timer");
const elTimerButton = selectElement(".footer__button");
const elTimer = selectElement(".timer__aside__time");
const elTimerCircleNode = selectElement(".timer__circle");
const elTimerFirst = selectElement('.timer__clock__number[aria-label="first"]');
const elTimerSecond = selectElement('.timer__clock__number[aria-label="second"]');

let firstTime = 0;
let secondTime = 0;
let isPaused = true;

const setTime = (button, time, property) => {
  if (time === 0 && button.name === property + "-bottom") time = 59;
  else if (time === 59 && button.name === property + "-top") time = 0;
  else {
    if (button.name === property + "-top") time++;
    else if (button.name === property + "-bottom") time--;
  }
  return time;
};

const setText = () => {
  elTimerFirst.textContent = String(firstTime).padStart(2, 0);
  elTimerSecond.textContent = String(secondTime).padStart(2, 0);
};

const normalizeTime = () => {
  if (secondTime === -1) firstTime--, (secondTime = 59);
};

const convertTime = (firstTime, secondTime) => {
  return firstTime * 60 + secondTime;
};

elTimer.addEventListener("click", (evt) => {
  const timerButton = evt.target;
  firstTime = setTime(timerButton, firstTime, "first");
  secondTime = setTime(timerButton, secondTime, "second");
  setText();
});

elTimerButton.addEventListener("click", () => {
  if (isPaused) {
    if (firstTime > 0 || secondTime > 0) {
      elTimerButton.classList.add("footer__button--active");
      isPaused = false;
      const interval = setInterval(() => {
        secondTime--;
        if (firstTime <= 0 && secondTime <= 0) {
          clearInterval(interval);
          setTimeout(() => {
            elTimerNode.classList.remove("timer--active");
          }, 1000);
          isPaused = true;
        }
        normalizeTime();
        setText();
      }, 1000);

      elTimerNode.classList.add("timer--active");
      selectElement(".timer--active svg").style.animationDuration =
        0.25 + "s," + convertTime(firstTime, secondTime) + "s";
    } else return;
  } else {
    isPaused = true;
    elTimerButton.classList.remove("footer__button--active");
    clearInterval(interval);
    return;
  }
});
