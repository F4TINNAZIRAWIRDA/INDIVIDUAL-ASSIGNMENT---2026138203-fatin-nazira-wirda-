/* timetable.js
   Task Plan page, part 2:
   - the "Table" / "Timetable" tabs
   - the timetable itself: one row per subject, one column per week,
     with the tasks shown as coloured chips (colour = status). */

// Date range of each week, copied from my semester calendar. Edit if the calendar changes.
// Week 15 is the Study Week (a deadline can fall there, e.g. IMS561 group assignment).
const WEEK_DATES = {
  1: "28/9 - 4/10",   2: "5/10 - 11/10",  3: "12/10 - 18/10", 4: "19/10 - 25/10",
  5: "26/10 - 1/11",  6: "2/11 - 8/11",   7: "9/11 - 15/11",  8: "16/11 - 22/11",
  9: "23/11 - 29/11", 10: "30/11 - 6/12", 11: "7/12 - 13/12", 12: "14/12 - 20/12",
  13: "28/12 - 3/1",  14: "4/1 - 10/1",   15: "11/1 - 17/1"
};

// (SUBJECT_COLORS, the colour of each subject, is defined in colors.js)

const viewTable = document.getElementById("viewTable");
const viewTimetable = document.getElementById("viewTimetable");
const tabTable = document.getElementById("tabTable");
const tabTimetable = document.getElementById("tabTimetable");
const detailBox = document.getElementById("detailBox");

// ---------- Tabs ----------
function showView(name) {
  const showingTable = name === "table";
  viewTable.classList.toggle("d-none", !showingTable);
  viewTimetable.classList.toggle("d-none", showingTable);
  tabTable.classList.toggle("active", showingTable);
  tabTimetable.classList.toggle("active", !showingTable);
}
tabTable.addEventListener("click", () => showView("table"));
tabTimetable.addEventListener("click", () => showView("timetable"));

// ---------- Timetable ----------
// Chip colour class for each status (same colours as the legend)
function chipClass(status) {
  switch (status) {
    case "Done":        return "chip-done";
    case "In Progress": return "chip-progress";
    default:            return "chip-upcoming";
  }
}

function buildTimetable() {
  // Show up to Week 14, or later if a task falls after it (e.g. Week 15)
  const lastWeek = Math.max(TOTAL_WEEKS, ...tasks.map(t => t.week));

  // Header row: Subject + W1, W2 ... with the dates under each week
  let html = "<thead><tr><th class='subject-cell text-start'>Subject</th>";
  for (let w = 1; w <= lastWeek; w++) {
    const isNow = w === CURRENT_WEEK;
    html += `<th class="${isNow ? "week-now" : ""}">W${w}
               <span class="week-date">${WEEK_DATES[w] || ""}</span>
               ${isNow ? '<span class="badge text-bg-primary">Now</span>' : ""}
             </th>`;
  }
  html += "</tr></thead><tbody>";

  // One row per subject
  subjects.forEach(subject => {
    const color = SUBJECT_COLORS[subject.code] || "#6c757d";
    html += `<tr><th scope="row" class="subject-cell text-start" style="border-left: 5px solid ${color};">
               <span class="fw-bold">${escapeHtml(subject.code)}</span>
               <span class="d-block small fw-normal text-muted">${escapeHtml(subject.name)}</span>
             </th>`;

    for (let w = 1; w <= lastWeek; w++) {
      const cellTasks = tasks.filter(t => t.subject === subject.code && t.week === w);
      const chips = cellTasks.map(t =>
        `<button type="button" class="task-chip ${chipClass(t.status)}" data-id="${t.id}"
                 title="${escapeHtml(t.task)}">${escapeHtml(t.type)}</button>`
      ).join("");
      html += `<td class="${w === CURRENT_WEEK ? "week-now" : ""}">${chips}</td>`;
    }
    html += "</tr>";
  });

  document.getElementById("timetable").innerHTML = html + "</tbody>";
}

// ---------- Click a chip to see its details ----------
function showDetails(taskId) {
  const t = tasks.find(task => task.id === taskId);
  if (!t) return;
  const subject = subjectByCode(t.subject);
  const statusBadge = { "Done": "text-bg-success", "In Progress": "text-bg-warning", "Upcoming": "text-bg-primary" }[t.status];

  detailBox.innerHTML = `
    <div class="card-body">
      <div class="d-flex flex-wrap justify-content-between gap-2">
        <h2 class="h6 mb-0">${escapeHtml(t.subject)}${subject ? " - " + escapeHtml(subject.name) : ""}</h2>
        <span class="badge ${statusBadge}">${escapeHtml(t.status)}</span>
      </div>
      <p class="mb-1 mt-2 fw-semibold">${escapeHtml(t.task)}</p>
      <p class="text-muted small mb-0">Week ${t.week} (${WEEK_DATES[t.week] || ""}) &middot; ${escapeHtml(t.type)}
        &middot; Due: ${formatDue(t.due)} &middot; Weight: ${formatWeight(t.weight)}</p>
      ${t.note ? `<p class="small mb-0 mt-1">Note: ${escapeHtml(t.note)}</p>` : ""}
    </div>`;
}

document.getElementById("timetable").addEventListener("click", event => {
  const chip = event.target.closest(".task-chip");
  if (chip) showDetails(parseInt(chip.dataset.id, 10));
});

buildTimetable();
