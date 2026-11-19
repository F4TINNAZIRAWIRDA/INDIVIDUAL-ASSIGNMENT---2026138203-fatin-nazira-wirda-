/* progress.js
   Lets me tick a task as Done. The ticks are saved in this browser (localStorage) and applied
   to the task list from data.js, so the Task Plan, Timetable, Dashboard and Subjects pages
   all show the same status. Load this file right after data.js. */

const TICK_KEY = "semtrackTicks";

// Remember each task's original status from data.js
tasks.forEach(task => {
  task.originalStatus = task.status;
});

// Read / save the ticks, e.g. { "5": true, "6": true }
function getTicks() {
  try {
    return JSON.parse(localStorage.getItem(TICK_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

function saveTicks(ticks) {
  try {
    localStorage.setItem(TICK_KEY, JSON.stringify(ticks));
  } catch (error) {
    // If the browser blocks storage, ticking still works until the page is refreshed
  }
}

// Work out a task's status from its original status and my tick
function statusFor(task, ticks) {
  if (ticks[task.id] === true) return "Done";
  if (ticks[task.id] === false) {
    // Unticked: go back to the original status (a task that started as Done becomes Upcoming)
    return task.originalStatus === "Done" ? "Upcoming" : task.originalStatus;
  }
  return task.originalStatus;
}

// Put the ticks onto the task list
function applyTicks() {
  const ticks = getTicks();
  tasks.forEach(task => {
    task.status = statusFor(task, ticks);
  });
}

// Tick or untick one task
function setTaskDone(id, done) {
  const ticks = getTicks();
  ticks[id] = done;
  saveTicks(ticks);
  applyTicks();
}

// Remove all my ticks and go back to the statuses written in data.js
function resetTicks() {
  try {
    localStorage.removeItem(TICK_KEY);
  } catch (error) {
    // ignore
  }
  applyTicks();
}

applyTicks();
