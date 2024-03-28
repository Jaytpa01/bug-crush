const itemCount = getRandomInt(3, 10);
export const bugs = new Array(itemCount);
export const bugIntervalTimers = new Array(itemCount);

export function init() {
  for (let i = 0; i < itemCount; i++) {
    createElement("rock");
    createBug(i);
  }
}

function createElement(className) {
  const newEle = document.createElement("div");
  newEle.className = className;

  // position element randomly within the page
  newEle.style.top = `${getRandomInt(0, document.body.clientHeight)}px`;
  newEle.style.left = `${getRandomInt(0, document.body.clientWidth)}px`;

  document.body.appendChild(newEle);
  return newEle;
}

function createBug(i) {
  const bug = createElement("bug");
  bugs[i] = bug;

  const { width } = bug.getBoundingClientRect();

  // starting moving the bugs across the screen
  bugIntervalTimers[i] = setInterval(() => {
    let left =
      (parseInt(bug.style.left.slice(0, -2)) + 1) %
      (document.body.clientWidth - width);

    bug.style.left = `${left}px`;
  }, 5);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
