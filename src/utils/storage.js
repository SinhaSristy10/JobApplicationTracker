import { INITIAL_SAMPLE_APPLICATIONS } from '../constants';

const STORAGE_KEY = 'job_application_tracker_data_v1';

/**
 * Load applications from LocalStorage.
 * Falls back to INITIAL_SAMPLE_APPLICATIONS if nothing is stored yet.
 */
export function loadApplications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First time loading - populate with rich sample data
      saveApplications(INITIAL_SAMPLE_APPLICATIONS);
      return INITIAL_SAMPLE_APPLICATIONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return INITIAL_SAMPLE_APPLICATIONS;
  } catch (error) {
    console.error('Failed to load applications from localStorage:', error);
    return INITIAL_SAMPLE_APPLICATIONS;
  }
}

/**
 * Save applications to LocalStorage.
 */
export function saveApplications(applications) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  } catch (error) {
    console.error('Failed to save applications to localStorage:', error);
  }
}

/**
 * Reset stored applications to default sample data
 */
export function resetToSampleData() {
  saveApplications(INITIAL_SAMPLE_APPLICATIONS);
  return INITIAL_SAMPLE_APPLICATIONS;
}

/**
 * Clear all applications
 */
export function clearAllApplications() {
  saveApplications([]);
  return [];
}

/**
 * Export applications as a downloadable JSON file
 */
export function exportToJSON(applications) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(applications, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `job-applications-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * Export applications as a downloadable CSV file
 */
export function exportToCSV(applications) {
  const headers = ['Company', 'Role', 'Status', 'Location', 'Employment Type', 'Salary', 'Date Applied', 'Job URL', 'Notes'];
  const rows = applications.map(app => [
    `"${(app.company || '').replace(/"/g, '""')}"`,
    `"${(app.role || '').replace(/"/g, '""')}"`,
    `"${(app.status || '').replace(/"/g, '""')}"`,
    `"${(app.location || '').replace(/"/g, '""')}"`,
    `"${(app.employmentType || '').replace(/"/g, '""')}"`,
    `"${(app.salary || '').replace(/"/g, '""')}"`,
    `"${(app.applicationDate || '').replace(/"/g, '""')}"`,
    `"${(app.jobUrl || '').replace(/"/g, '""')}"`,
    `"${(app.notes || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", encodedUri);
  downloadAnchor.setAttribute("download", `job-applications-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * Generate a unique ID for new applications or notes
 */
export function generateId(prefix = 'app') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
}
