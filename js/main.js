const elTimerButton = selectElement(".footer__button");
const elTimerCircleNode = selectElement(".timer__circle");
const elTimer = selectElement(".timer__aside__time");

let isPaused = false;

elTimerButton.addEventListener("click", () => {
  timerMode(elTimerButton);
});

const timerInterval = (secunds) => {
  const interval = setInterval(() => {
    if (!isPaused) {
      if (secunds <= 0) {
        clearInterval(interval);
        elTimerButton.classList.remove("footer__button--active");
        elTimerCircleNode.classList.remove("timer__circle--active");
      } else {
        secunds--;
        elTimer.value = secunds;
      }
    }
  }, 1000);
};

const animationOptions = (time) => {
  elTimerCircleNode.style.animationDuration = time + "s, " + 0.2 + "s";
  elTimerCircleNode.style.animationDelay = 0 + "s, " + time + "s";
};

const timerMode = (button) => {
  let secunds = Number(elTimer.value.trim());
  if (!button.matches(".footer__button--active")) {
    isPaused = false;
    elTimer.value = secunds;
    elTimerButton.classList.add("footer__button--active");
    elTimerCircleNode.classList.remove("timer__circle--paused");
    button.classList.add("footer__button--active");
    elTimerCircleNode.classList.add("timer__circle--active");
    animationOptions(secunds);

    timerInterval(secunds);
  } else {
    isPaused = true;
    timerInterval(secunds);
    elTimerCircleNode.classList.add("timer__circle--paused");
    button.classList.remove("footer__button--active");
  }
};
