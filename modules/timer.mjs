export let stoptime = true;
export let time = 0;

export function startTimer() {
  stoptime = false;
  timerCycle();
}

export function stopTimer() {
  stoptime = true;
}

export function resetTimer() {
  time = 0;
}

function timerCycle() {
  if (stoptime === false) {
    setTimeout(() => {
      time += 1;
      timerCycle();
    }, 1000);
  }
}
