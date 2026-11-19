/* dashboard.js
   Fills the summary cards, the semester progress bar and the two charts. */

requireLogin(); // must be logged in to see this page

document.getElementById("welcomeUser").textContent = sessionStorage.getItem("user") || "student";

// ---- Semester progress bar ----
const progressPercent = Math.round((CURRENT_WEEK / TOTAL_WEEKS) * 100);
document.getElementById("weekBar").style.width = progressPercent + "%";
document.getElementById("weekLabel").textContent = `Week ${CURRENT_WEEK} of ${TOTAL_WEEKS} (${progressPercent}%)`;

// ---- Summary numbers ----
function countByStatus(status) {
  return tasks.filter(t => t.status === status).length;
}

const statuses = ["Done", "In Progress", "Upcoming"];
const statusColors = ["#10b981", "#f59e0b", "#3b82f6"];
const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);

document.getElementById("statTasks").textContent    = tasks.length;
document.getElementById("statDone").textContent     = countByStatus("Done");
document.getElementById("statProgress").textContent = countByStatus("In Progress");
document.getElementById("statCredits").textContent  = totalCredits;

// ---- Chart 1: doughnut of task status ----
new Chart(document.getElementById("statusChart"), {
  type: "doughnut",
  data: {
    labels: statuses,
    datasets: [{
      data: statuses.map(countByStatus),
      backgroundColor: statusColors
    }]
  },
  options: { plugins: { legend: { position: "bottom" } } }
});

// ---- Chart 2: stacked bar chart of tasks per week ----
// The chart goes up to the last week that has a task, even if it is after Week 14
const lastWeek = Math.max(TOTAL_WEEKS, ...tasks.map(t => t.week));
const weekLabels = [];
for (let w = 1; w <= lastWeek; w++) {
  weekLabels.push("W" + w);
}

const weekDatasets = statuses.map((status, i) => ({
  label: status,
  data: weekLabels.map((_, index) =>
    tasks.filter(t => t.week === index + 1 && t.status === status).length
  ),
  backgroundColor: statusColors[i],
  borderRadius: 4
}));

new Chart(document.getElementById("weekChart"), {
  type: "bar",
  data: { labels: weekLabels, datasets: weekDatasets },
  options: {
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true, ticks: { stepSize: 1 }, title: { display: true, text: "Tasks due" } }
    },
    plugins: { legend: { position: "bottom" } }
  }
});
