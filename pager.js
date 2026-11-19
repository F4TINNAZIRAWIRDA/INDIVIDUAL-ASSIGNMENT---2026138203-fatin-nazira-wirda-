/* pager.js
   Reusable "Show N entries" dropdown + page numbers for any table.
   It does the same job as the DataTables plugin, but in plain JavaScript.
   Used by the Task Plan page and the Login Activity page. */

// Stops text typed by a user from being treated as HTML (safety)
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// config = { tbody, sizeSelect, pagination, info, renderRow, emptyColumns }
function createPager(config) {
  const { tbody, sizeSelect, pagination, info, renderRow, emptyColumns } = config;
  let allRows = [];    // every row that passed the search/filter
  let currentPage = 1;

  function pageSize() {
    return parseInt(sizeSelect.value, 10);
  }

  // Draw the rows for the current page
  function render() {
    const size = pageSize();
    const totalPages = Math.max(1, Math.ceil(allRows.length / size));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * size;
    const pageRows = allRows.slice(start, start + size);

    if (allRows.length === 0) {
      tbody.innerHTML = `<tr><td colspan="${emptyColumns}" class="text-center text-muted py-4">No entries found</td></tr>`;
      info.textContent = "Showing 0 entries";
    } else {
      tbody.innerHTML = pageRows.map(row => renderRow(row)).join("");
      info.textContent = `Showing ${start + 1} to ${start + pageRows.length} of ${allRows.length} entries`;
    }
    renderPagination(totalPages);
  }

  // Draw Previous / 1 2 3 / Next (shows at most 5 page numbers at a time)
  function renderPagination(totalPages) {
    let last = Math.min(totalPages, Math.max(1, currentPage - 2) + 4);
    let first = Math.max(1, last - 4);

    let html = `<li class="page-item ${currentPage === 1 ? "disabled" : ""}">
                  <button class="page-link" data-page="${currentPage - 1}">Previous</button></li>`;
    for (let p = first; p <= last; p++) {
      html += `<li class="page-item ${p === currentPage ? "active" : ""}">
                 <button class="page-link" data-page="${p}">${p}</button></li>`;
    }
    html += `<li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
               <button class="page-link" data-page="${currentPage + 1}">Next</button></li>`;
    pagination.innerHTML = html;
  }

  // Clicking a page button
  pagination.addEventListener("click", event => {
    const button = event.target.closest("button[data-page]");
    if (!button || button.parentElement.classList.contains("disabled")) return;
    currentPage = parseInt(button.dataset.page, 10);
    render();
  });

  // Changing "Show N entries" goes back to page 1
  sizeSelect.addEventListener("change", () => {
    currentPage = 1;
    render();
  });

  return {
    // Give the pager a new list of rows (after a search or filter).
    // keepPage = true stays on the same page (used when a task is ticked).
    setData(rows, keepPage) {
      allRows = rows;
      if (!keepPage) currentPage = 1;
      render();
    }
  };
}
