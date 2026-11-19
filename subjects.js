/* subjects.js
   Renders one card per subject.
   Task counts and progress are calculated from the task list in data.js.
   Each card has a coloured accent (colours from colors.js) and links to the Task Plan,
   filtered to that subject (tasks.html?subject=CODE). */

requireLogin();

const grid = document.getElementById("subjectGrid");

grid.innerHTML = subjects.map(s => {
  const subjectTasks = tasks.filter(t => t.subject === s.code);
  const doneCount = subjectTasks.filter(t => t.status === "Done").length;
  const percent = subjectTasks.length === 0 ? 0 : Math.round((doneCount / subjectTasks.length) * 100);
  const color = SUBJECT_COLORS[s.code] || "#6c757d";

  return `
    <div class="col-12 col-md-6 col-lg-4">
      <a href="tasks.html?subject=${encodeURIComponent(s.code)}"
         class="text-decoration-none text-reset d-block h-100"
         title="See ${escapeAttr(s.code)} tasks in the Task Plan">
        <div class="card content-card company-card h-100" style="border-top: 5px solid ${color};">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
              <h2 class="h5 mb-0">${escapeAttr(s.name)}</h2>
              <span class="badge" style="background-color: ${color};">${escapeAttr(s.code)}</span>
            </div>
            <p class="text-muted small">${escapeAttr(s.focus)}</p>
          </div>
          <div class="card-footer bg-transparent border-0 pb-3">
            <div class="d-flex justify-content-between small mb-1">
              <span>${doneCount} of ${subjectTasks.length} tasks done</span>
              <span>${percent}%</span>
            </div>
            <div class="progress mb-2" role="progressbar" aria-label="${escapeAttr(s.code)} progress" style="height: 8px;">
              <div class="progress-bar" style="width: ${percent}%; background-color: ${color};"></div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <span class="badge text-bg-secondary">${s.credits} credit hours</span>
              <span class="small fw-semibold" style="color: ${color};">View tasks <i class="bi bi-arrow-right"></i></span>
            </div>
          </div>
        </div>
      </a>
    </div>
  `;
}).join("");

// Makes text safe to put inside HTML (this page does not load pager.js, so it has its own copy)
function escapeAttr(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
