/* data.js
   All the data for the site lives here.
   Edit this file when your tasks or deadlines change. */

// ---- Semester settings ----
const TOTAL_WEEKS  = 14;  // teaching weeks in the semester (a deadline can fall after Week 14, e.g. IMS561 group assignment in Week 15)
const CURRENT_WEEK = 8;   // EDIT: change this to the week you are in now

// ---- Dataset 1: subjects ----
// "code" is used to link each task to its subject below
const subjects = [
  { code: "IMS560", name: "Advanced Database Management System", credits: 3,
    focus: "Database II: advanced database management." },

  { code: "IMS561", name: "Web Publishing", credits: 3,
    focus: "Planning, designing and building a functional multi-page website using an open-source content management system (CMS)." },

  { code: "IMS564", name: "User Experience Design", credits: 3,
    focus: "Applying UX design principles and methods, from user needs and personas to the five planes of UX design." },

  { code: "IMS565", name: "Information System Project Management", credits: 3,
    focus: "Applying project management theories, knowledge areas and tools to information system projects." },

  { code: "IMS566", name: "Advanced Web Design Development And Content Management", credits: 4,
    focus: "Responsive web design with Bootstrap, JavaScript and content management." },

  { code: "TAC451", name: "Introductory Arabic (Level II)", credits: 2,
    focus: "Second level of introductory Arabic language." },

  { code: "LCC501", name: "English For Professional Correspondence", credits: 2,
    focus: "English for writing professional correspondence." },

  { code: "CTU554", name: "Values And Civilization II", credits: 2,
    focus: "University course on values and civilization (part II)." }
];

// ---- Dataset 2: tasks and assessments ----
// Every task has the same fields, so the Task Plan always looks the same:
//   week    = the week the task is due (1 to 15)
//   subject = must match a "code" in the subjects list above
//   task    = short title in Title Case (put extra details in "note")
//   type    = "Individual", "Group", "Test", "Project" or "Roleplay"
//   due     = the due date as "YYYY-MM-DD", or "" if it is not announced yet (shows as TBA)
//   weight  = the percentage as a number (20 means 20%), or null if not announced yet (shows as TBA)
//   status  = exactly "Done", "In Progress" or "Upcoming"
//   note    = optional extra detail, shown as an info icon in the table
// Not added yet (not announced): IMS560 group assignment, IMS565 group report and presentation.
const tasks = [
  { id: 1,  week: 5,  subject: "IMS565", task: "Individual Assignment (Turnitin Check)", type: "Individual", due: "2026-10-30", weight: null, status: "Done",        note: "Deadline: 5 PM" },
  { id: 2,  week: 6,  subject: "IMS565", task: "Individual Assignment (Submission)",     type: "Individual", due: "2026-11-07", weight: null, status: "Done",        note: "Deadline: 5 PM" },
  { id: 3,  week: 8,  subject: "IMS566", task: "Individual Assignment",                  type: "Individual", due: "2026-11-20", weight: 20,   status: "In Progress", note: "Web application interface" },
  { id: 4,  week: 8,  subject: "CTU554", task: "Group Assignment",                       type: "Group",      due: "2026-11-22", weight: null, status: "In Progress", note: "" },
  { id: 5,  week: 8,  subject: "LCC501", task: "Internal Test",                          type: "Test",       due: "2026-11-18", weight: 20,   status: "Done",        note: "Assessment 1, 1 hour" },
  { id: 6,  week: 8,  subject: "TAC451", task: "Listening Test",                         type: "Test",       due: "2026-11-18", weight: 30,   status: "Done",        note: "" },
  { id: 7,  week: 9,  subject: "IMS564", task: "Individual Assignment",                  type: "Individual", due: "2026-11-24", weight: null, status: "Upcoming",    note: "" },
  { id: 8,  week: 9,  subject: "IMS560", task: "Individual Assignment",                  type: "Individual", due: "2026-11-27", weight: null, status: "Upcoming",    note: "" },
  { id: 9,  week: 9,  subject: "IMS565", task: "Group Project Interview",                type: "Group",      due: "",           weight: null, status: "Upcoming",    note: "Must be done before Week 10. After Week 10 there is no interview: proceed with the proposal, but marks are deducted." },
  { id: 10, week: 10, subject: "LCC501", task: "External Test",                          type: "Test",       due: "2026-12-02", weight: 40,   status: "Upcoming",    note: "Assessment 2, 2 hours" },
  { id: 11, week: 10, subject: "TAC451", task: "Roleplay Script Submission",             type: "Roleplay",   due: "2026-12-02", weight: null, status: "Upcoming",    note: "" },
  { id: 12, week: 12, subject: "IMS561", task: "Individual Assignment",                  type: "Individual", due: "",           weight: null, status: "Upcoming",    note: "" },
  { id: 13, week: 12, subject: "TAC451", task: "Written Test",                           type: "Test",       due: "2026-12-16", weight: 30,   status: "Upcoming",    note: "" },
  { id: 14, week: 13, subject: "TAC451", task: "Roleplay (Part 1)",                      type: "Roleplay",   due: "",           weight: null, status: "Upcoming",    note: "Week 13 or 14" },
  { id: 15, week: 13, subject: "IMS566", task: "Group Presentation",                     type: "Group",      due: "",           weight: null, status: "Upcoming",    note: "" },
  { id: 16, week: 13, subject: "CTU554", task: "Test",                                   type: "Test",       due: "",           weight: null, status: "Upcoming",    note: "Week 13 or 14" },
  { id: 17, week: 14, subject: "TAC451", task: "Roleplay (Part 2)",                      type: "Roleplay",   due: "",           weight: null, status: "Upcoming",    note: "Week 13 or 14" },
  { id: 18, week: 14, subject: "LCC501", task: "Project (Pairwork)",                     type: "Project",    due: "",           weight: 40,   status: "Upcoming",    note: "Assessment 3, Week 12 to 14" },
  { id: 19, week: 14, subject: "IMS564", task: "Group Assignment",                       type: "Group",      due: "2027-01-05", weight: null, status: "Upcoming",    note: "" },
  { id: 20, week: 14, subject: "IMS566", task: "Group Assignment",                       type: "Group",      due: "",           weight: null, status: "Upcoming",    note: "" },
  { id: 21, week: 14, subject: "IMS566", task: "Final Test",                             type: "Test",       due: "",           weight: null, status: "Upcoming",    note: "" },
  { id: 22, week: 15, subject: "IMS561", task: "Group Assignment",                       type: "Group",      due: "",           weight: null, status: "Upcoming",    note: "" }
];

// ---- Helpers ----

// Find a subject by its code
function subjectByCode(code) {
  return subjects.find(s => s.code === code);
}

// "2026-11-20" becomes "20 Nov 2026" (every date looks the same). No date shows "TBA".
const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function formatDue(iso) {
  if (!iso) return "TBA";
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${MONTH_ABBR[month - 1]} ${year}`;
}

// 20 becomes "20%". No percentage shows "TBA".
function formatWeight(percent) {
  return percent === null || percent === undefined ? "TBA" : percent + "%";
}