import { bugs, bugIntervalTimers, init } from "./init.js";

init();

// add event listeners to all rocks to handle dragging
const rocks = document.getElementsByClassName("rock");
for (const rock of rocks) {
  rock.addEventListener("mousedown", handleMouseDown);
}

// some globals to handle rock movement
let selectedRock = null;
let offsetX = 0;
let offsetY = 0;

let physicsTimer = null;

function handleMouseDown(event) {
  selectedRock = event.target;

  offsetX = event.offsetX;
  offsetY = event.offsetY;

  // when we move the mouse, move the rock to the mouse
  document.addEventListener("mousemove", moveRockToMouse);

  // run physics tick 60 times a second
  const ticksPerSecond = 10;
  physicsTimer = setInterval(physicsTick, 1000 / ticksPerSecond);
}

function moveRockToMouse(event) {
  if (!selectedRock) {
    return;
  }

  selectedRock.style.top = `${event.pageY - offsetY}px`;
  selectedRock.style.left = `${event.pageX - offsetX}px`;
}

// when we mouse up, stop the rock following the mouse
document.addEventListener("mouseup", stopRockMovement);

function stopRockMovement() {
  document.removeEventListener("mousemove", moveRockToMouse);
  selectedRock = null;
  clearInterval(physicsTimer);
}

function physicsTick() {
  if (!selectedRock) {
    clearInterval(physicsTimer);
    return;
  }

  const rockBox = selectedRock.getBoundingClientRect();

  bugs.forEach((bug, i) => {
    const bugBox = bug.getBoundingClientRect();

    // if not interacting, return early and move onto the next bug
    if (!isIntersecting(rockBox, bugBox)) {
      return;
    }

    // remove mouse listener for rock
    selectedRock.removeEventListener("mousedown", handleMouseDown);

    clearInterval(bugIntervalTimers[i]);
    bugIntervalTimers.splice(i, 1);
    bugs.splice(i, 1);

    document.body.removeChild(bug);
    document.body.removeChild(selectedRock);
    stopRockMovement();
  });
}

function isIntersecting(r1, r2) {
  return (
    r1.left + r1.width >= r2.left &&
    r1.left <= r2.left + r2.width &&
    r1.top <= r2.top + r2.height &&
    r1.top + r1.height >= r2.top
  );
}
