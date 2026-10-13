# 💼 Job Application Tracker

A modern, responsive, and feature-rich **Job Application Tracker** built with **React**, **Tailwind CSS**, **Lucide Icons**, and **LocalStorage Persistence**.

🔗 **Live Demo:** [https://job-application-tracker-liard-beta.vercel.app](https://job-application-tracker-liard-beta.vercel.app)  
📦 **GitHub Repo:** [https://github.com/SinhaSristy10/JobApplicationTracker](https://github.com/SinhaSristy10/JobApplicationTracker)

---

## 🎯 Features & Requirements Implemented

| Requirement | Implementation Detail |
| :--- | :--- |
| **Add applications** | Comprehensive application form with validation (`Company`, `Job Title/Role`, `Status`, `Location`, `Employment Type`, `Salary`, `Date Applied`, `Job URL`, and `Notes`). |
| **Update status** | Change application status between **Wishlist**, **Applied**, **Interviewing**, **Offer**, and **Rejected** with 1-click status dropdown badges on both Kanban and Table views. Confetti celebrations on receiving an offer! |
| **Filter by company** | Dynamic company dropdown filter with application counts per company, plus real-time text search (company, role, location, notes). |
| **Save notes** | Dedicated Notes & Timeline modal with automatic timestamps, full history tracking, quick add (`Ctrl+Enter`), and note deletion. |
| **Forms** | Controlled components, form validation with inline visual error indicators, and modal ESC key dismissal. |
| **CRUD** | Full **Create**, **Read**, **Update**, and **Delete** lifecycle with confirmation dialogs to prevent accidental data loss. |
| **Filtering & Sorting** | Multi-criteria filtering by Status pills, Company dropdown, text search, and sort order (Newest/Oldest, Company A-Z, Status priority). |
| **Persistence** | Automatic LocalStorage synchronization, pre-populated realistic sample data, backup **Export to JSON & CSV**, and **Import from JSON**. |

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🏗️ Project Architecture

```
JobApplicationTracker/
├── index.html                 # Main HTML entry with Google Fonts
├── package.json               # Dependencies and build scripts
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js         # Tailwind CSS styling and theme configuration
├── vite.config.js             # Vite development server configuration
├── src/
│   ├── main.jsx               # React DOM mounting
│   ├── App.jsx                # Main application state & orchestration
│   ├── index.css              # Tailwind base & custom scrollbar styling
│   ├── constants/
│   │   └── index.js           # Statuses, badge themes, and realistic sample data
│   ├── utils/
│   │   ├── storage.js         # LocalStorage persistence, JSON/CSV exports & imports
│   │   └── helpers.js         # Company avatar colors, initials & date formatters
│   └── components/
│       ├── Navbar.jsx         # Header with theme toggle, backup tools, and Add button
│       ├── StatsCards.jsx     # Pipeline overview metrics with click-to-filter shortcuts
│       ├── FilterControls.jsx # Company filter, live search, status pills, and sort dropdown
│       ├── KanbanBoard.jsx    # Kanban column view by application status
│       ├── TableView.jsx      # High-density spreadsheet table view
│       ├── ApplicationCard.jsx# Kanban card with status changer, notes preview, and actions
│       ├── ApplicationFormModal.jsx # Create and edit modal with form validation
│       ├── NotesModal.jsx     # Timestamped notes log and timeline manager
│       ├── DeleteConfirmModal.jsx   # Safe deletion confirmation dialog
│       └── Toast.jsx          # Feedback notification toasts
```
