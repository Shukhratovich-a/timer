const elTimerNode = selectElement(".timer");
const elTimerButton = selectElement(".footer__button");
const elTimer = selectElement(".timer__aside__time");
const elTimerCircleNode = selectElement(".timer__circle");
const elTimerFirst = selectElement('.timer__clock__number[aria-label="first"]');
const elTimerSecond = selectElement('.timer__clock__number[aria-label="second"]');

let firstTime = 0;
let secondTime = 0;

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

elTimer.addEventListener("click", (evt) => {
  const timerButton = evt.target;
  firstTime = setTime(timerButton, firstTime, "first");
  secondTime = setTime(timerButton, secondTime, "second");
  setText();
});

elTimerButton.addEventListener("click", () => {
  if (firstTime > 0 || secondTime > 0) {
    const interval = setInterval(() => {
      secondTime--;
      if (firstTime === 0 && secondTime === 0) clearInterval(interval);
      normalizeTime();
      setText();
    }, 1000);
  }

  elTimerNode.classList.add("timer--active");
});
