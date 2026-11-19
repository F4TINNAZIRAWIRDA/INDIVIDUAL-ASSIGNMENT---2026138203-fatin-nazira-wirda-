# SemTrack - Semester 4 Study Planner

**Course:** IMS566 Advanced Web Design Development and Content Management
**Name:** Fatin Nazira Wirda Binti Harizan | **Student ID:** 2026138203 | **Class:** SI2624A

## Project Description
SemTrack is a small web application prototype that helps me keep track of my Semester 4 subjects, tasks and assessments from Week 1 to Week 14. It shows what is done, what is in progress and which weeks are the busiest. The data is stored in a JavaScript file (no database).

## Features
- Simulated login page with hardcoded credentials and error feedback
- Protected pages (redirects to login if not signed in) and a logout button
- Responsive navigation bar shared across all pages
- Dashboard with a semester progress bar, summary cards and two charts (task status, workload per week)
- Task Plan page: table sorted by week, with live search, status filter, "Show 5/10/25 entries" and page numbers
- Tick boxes to mark tasks as Done (saved in the browser), a "Hide done tasks" switch, this-week highlight and one colour per subject
- Subjects page: each card links to the Task Plan filtered to that subject
- Task Plan timetable view: subject-by-week grid with the current week highlighted, status colours and click-for-details
- Login Activity page: table of every login attempt (time, username, success or failed) with summary cards, search, filter and paging; the password is never saved
- Subjects page: responsive card grid with task progress calculated from the task list
- Footer, page titles and meta tags on every page
- Mobile-friendly layout using Bootstrap grid

## How to Test the Login
1. Open the live site (link below).
2. The username (`nazira`) and password (`852369`) are already filled in on the login form.
3. Click **Login** to reach the dashboard.
4. To see the error message, change the password to a wrong one and click **Login** again.

## Frameworks / Libraries Used
- [Bootstrap 5.3](https://getbootstrap.com/) - layout, components, responsiveness
- [Bootstrap Icons](https://icons.getbootstrap.com/) - icons
- [Chart.js 4](https://www.chartjs.org/) - charts

## File Structure
```
index.html        Login page
dashboard.html    Dashboard (progress, summary, charts)
tasks.html        Data view 1: task plan table
subjects.html     Data view 2: subject cards
style.css         Custom styles
auth.js           Login / logout logic
data.js           Semester data (subjects and tasks)
dashboard.js      Dashboard cards, progress bar and charts
tasks.js          Task table, search, filter
colors.js         One colour per subject (shared by all pages)
progress.js       Saves the ticked tasks in the browser
timetable.js      Task Plan tabs + subject x week timetable
timetable.css     Timetable styles
pager.js          Reusable "Show entries" + page numbers
activity.html     Data view 3: login activity log
activity.js       Login log table and summary
subjects.js       Subject card rendering
```

## Links
- Live site: https://f4tinnazirawirda.github.io/INDIVIDUAL-ASSIGNMENT---2026138203-fatin-nazira-wirda-/
- Repository: https://github.com/F4TINNAZIRAWIRDA/INDIVIDUAL-ASSIGNMENT---2026138203-fatin-nazira-wirda-.git

*Developed and tested using Google Chrome.*
