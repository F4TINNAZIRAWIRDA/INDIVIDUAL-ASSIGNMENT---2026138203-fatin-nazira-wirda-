/* activity.js
   Login Activity page: shows every login attempt saved by auth.js,
   with summary cards, search, result filter and "Show N entries" paging (pager.js). */

requireLogin();

const searchBox = document.getElementById("searchBox");
const resultFilter = document.getElementById("resultFilter");

// Turn a saved time (ISO text) into something readable
function formatTime(isoText) {
  return new Date(isoText).toLocaleString("en-MY", { dateStyle: "medium", timeStyle: "medium" });
}

// How one log entry becomes one table row
function renderLogRow(entry) {
  const badge = entry.success ? "text-bg-success" : "text-bg-danger";
  const label = entry.success ? "Success" : "Failed";
  return `
    <tr>
      <td>${entry.no}</td>
      <td>${escapeHtml(formatTime(entry.time))}</td>
      <td class="fw-semibold">${escapeHtml(entry.username)}</td>
      <td><span class="badge badge-status ${badge}">${label}</span></td>
    </tr>`;
}

const pager = createPager({
  tbody: document.getElementById("logTableBody"),
  sizeSelect: document.getElementById("pageSize"),
  pagination: document.getElementById("pagination"),
  info: document.getElementById("tableInfo"),
  renderRow: renderLogRow,
  emptyColumns: 4
});

// Read the log, update the summary cards, then apply search + filter
function refresh() {
  const log = getLoginLog();

  // Give each entry a number (oldest = 1) so numbers stay the same while filtering
  const numbered = log.map((entry, index) => ({ ...entry, no: log.length - index }));

  const successCount = numbered.filter(e => e.success).length;
  document.getElementById("statTotal").textContent = numbered.length;
  document.getElementById("statSuccess").textContent = successCount;
  document.getElementById("statFailed").textContent = numbered.length - successCount;

  const keyword = searchBox.value.toLowerCase();
  const result = resultFilter.value;

  const filtered = numbered.filter(e => {
    const matchesText = e.username.toLowerCase().includes(keyword);
    const matchesResult = result === "All" ||
                          (result === "Success" && e.success) ||
                          (result === "Failed" && !e.success);
    return matchesText && matchesResult;
  });

  pager.setData(filtered);
}

searchBox.addEventListener("input", refresh);
resultFilter.addEventListener("change", refresh);

document.getElementById("clearLogBtn").addEventListener("click", () => {
  if (confirm("Clear the whole login log?")) {
    clearLoginLog();
    refresh();
  }
});

refresh();
