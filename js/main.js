elTimerButton = selectElement(".footer__button");
elTimerCircleNode = selectElement(".timer__circle");
elTimer = selectElement(".timer__aside__time");

elTimerButton.addEventListener("click", () => {
  let secunds = Number(elTimer.value.trim());
  elTimer.value = secunds;
  elTimerButton.classList.add("footer__button--active");

  elTimerCircleNode.classList.add("timer__circle--active");
  elTimerCircleNode.style.animationDuration = secunds + "s, " + 0.2 + "s";
  elTimerCircleNode.style.animationDelay = 0 + "s, " + secunds + "s";

  const interval = setInterval(() => {
    if (secunds <= 0) {
      clearInterval(interval);
      elTimerButton.classList.remove("footer__button--active");
      elTimerCircleNode.classList.remove("timer__circle--active");
    } else {
      secunds--;
      elTimer.value = secunds;
    }
  }, 1000);
});
