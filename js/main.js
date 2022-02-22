const elTimerNode = selectElement(".timer");
const elTimer = selectElement(".timer__aside__time");
const elTimerMicrophone = selectElement('.header__button[name="microphone"]');
const elTimerButton = selectElement(".footer__button");
const elTimerCircleNode = selectElement(".timer__circle");
const elTimerFirst = selectElement('.timer__clock__number[aria-label="first"]');
const elTimerSecond = selectElement('.timer__clock__number[aria-label="second"]');

let firstTime = 0;
let secondTime = 0;
let isPaused = true;

const recorder = new webkitSpeechRecognition();

recorder.lang = "uz-UZ";

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
  if (!isPaused) return;
  const timerButton = evt.target;
  firstTime = setTime(timerButton, firstTime, "first");
  secondTime = setTime(timerButton, secondTime, "second");
  setText();
});

const startTimer = () => {
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
          elTimerButton.classList.remove("footer__button--active");
        }
        normalizeTime();
        setText();
      }, 1000);

      elTimerNode.classList.add("timer--active");
      selectElement(".timer--active svg").style.animationDuration =
        0.25 + "s," + Number(convertTime(firstTime, secondTime) - 0.25) + "s";
    } else return;
  } else {
    return;
    isPaused = true;
    elTimerButton.classList.remove("footer__button--active");
  }
};

elTimerButton.addEventListener("click", startTimer);

recorder.onresult = (result) => {
  const value = result.results[0][0].transcript.toLowerCase();
  print(value);
  if (value === "ishla") startTimer();
};

elTimerMicrophone.addEventListener("click", () => {
  recorder.start();
});
