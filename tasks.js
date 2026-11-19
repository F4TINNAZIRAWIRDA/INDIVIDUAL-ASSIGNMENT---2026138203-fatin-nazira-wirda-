/* tasks.js
   Task table: search + status filter, then "Show N entries" and page numbers
   (the paging itself is done by pager.js). */

requireLogin();

const searchBox = document.getElementById("searchBox");
const statusFilter = document.getElementById("statusFilter");
const hideDone = document.getElementById("hideDone");

// Pick a Bootstrap colour for each status (matches the dashboard chart colours)
function badgeClass(status) {
  switch (status) {
    case "Done":        return "text-bg-success";
    case "In Progress": return "text-bg-warning";
    case "Upcoming":    return "text-bg-primary";
    default:            return "text-bg-secondary";
  }
}

// Unknown dates and weights show "TBA" in a lighter colour
function valueOrTba(text) {
  return text === "TBA" ? '<abbr class="tba text-muted" title="To Be Announced">TBA</abbr>' : text;
}

// How one task becomes one table row
// (SUBJECT_COLORS comes from colors.js and WEEK_DATES from timetable.js, both loaded before this file)
function renderTaskRow(t) {
  const isDone = t.status === "Done";
  const isNow = t.week === CURRENT_WEEK && !isDone;     // this week's unfinished rows are highlighted
  const rowClass = isNow ? "row-now" : (isDone ? "row-done" : "");   // finished rows are faded
  const color = SUBJECT_COLORS[t.subject] || "#6c757d";
  return `
    <tr class="${rowClass}">
      <td class="tick-cell text-center">
        <input type="checkbox" class="form-check-input task-tick" data-id="${t.id}" ${isDone ? "checked" : ""}
               aria-label="Mark ${escapeHtml(t.subject)} task as done">
      </td>
      <td class="week-cell">
        <span class="fw-semibold">Week ${t.week}</span>
        <span class="d-block small text-muted">${WEEK_DATES[t.week] || ""}</span>
        ${isNow ? '<span class="badge text-bg-primary">This week</span>' : ""}
      </td>
      <td><span class="subject-tag" style="background-color: ${color};">${escapeHtml(t.subject)}</span></td>
      <td>
        ${escapeHtml(t.task)}
        ${t.note ? `<button type="button" class="note-btn" aria-label="Show note" aria-expanded="false"><i class="bi bi-info-circle-fill"></i></button>
        <div class="task-note d-none">${escapeHtml(t.note)}</div>` : ""}
      </td>
      <td>${escapeHtml(t.type)}</td>
      <td class="text-nowrap">${valueOrTba(formatDue(t.due))}</td>
      <td class="text-nowrap">${valueOrTba(formatWeight(t.weight))}</td>
      <td><span class="badge badge-status ${badgeClass(t.status)}">${escapeHtml(t.status)}</span></td>
    </tr>`;
}

const pager = createPager({
  tbody: document.getElementById("taskTableBody"),
  sizeSelect: document.getElementById("pageSize"),
  pagination: document.getElementById("pagination"),
  info: document.getElementById("tableInfo"),
  renderRow: renderTaskRow,
  emptyColumns: 8
});

// Apply the search box, status filter and "Hide done tasks", sort by week, then hand the rows to the pager.
// keepPage = true stays on the same page of the table (used after ticking a task).
function applyFilters(keepPage) {
  const keyword = searchBox.value.toLowerCase();
  const status = statusFilter.value;

  const filtered = tasks
    .filter(t => {
      const matchesText = t.task.toLowerCase().includes(keyword) ||
                          t.subject.toLowerCase().includes(keyword) ||
                          t.type.toLowerCase().includes(keyword);
      const matchesStatus = status === "All" || t.status === status;
      const matchesDone = !hideDone.checked || t.status !== "Done";
      return matchesText && matchesStatus && matchesDone;
    })
    .sort((a, b) => a.week - b.week);

  pager.setData(filtered, keepPage);
}

searchBox.addEventListener("input", () => applyFilters());
statusFilter.addEventListener("change", () => applyFilters());
hideDone.addEventListener("change", () => applyFilters());

// ---------- Ticking a task as Done (the saving is done by progress.js) ----------
function refreshAfterTick() {
  applyFilters(true);                                              // redraw the table, same page
  if (typeof buildTimetable === "function") buildTimetable();      // redraw the timetable colours
}

document.getElementById("taskTableBody").addEventListener("change", event => {
  const box = event.target.closest(".task-tick");
  if (!box) return;
  setTaskDone(parseInt(box.dataset.id, 10), box.checked);
  refreshAfterTick();
});

// Tap or click the (i) button to show or hide the note under the task title (works on phones too)
document.getElementById("taskTableBody").addEventListener("click", event => {
  const button = event.target.closest(".note-btn");
  if (!button) return;
  const note = button.parentElement.querySelector(".task-note");
  const nowHidden = note.classList.toggle("d-none");
  button.setAttribute("aria-expanded", String(!nowHidden));
});

document.getElementById("resetTicks").addEventListener("click", () => {
  if (confirm("Remove all my ticks and go back to the statuses in data.js?")) {
    resetTicks();
    refreshAfterTick();
  }
});

// Arriving from a Subjects card (tasks.html?subject=IMS566)? Search for that subject straight away.
const subjectFromLink = new URLSearchParams(window.location.search).get("subject");
if (subjectFromLink) {
  searchBox.value = subjectFromLink;
}

applyFilters();