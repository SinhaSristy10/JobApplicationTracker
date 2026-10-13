// Helper to get initials from company name
export function getCompanyInitials(name = '') {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

// Generate consistent background color based on company name
export function getCompanyColorClass(name = '') {
  const colors = [
    'bg-blue-500 text-white',
    'bg-indigo-500 text-white',
    'bg-purple-500 text-white',
    'bg-emerald-500 text-white',
    'bg-amber-500 text-white',
    'bg-cyan-500 text-white',
    'bg-rose-500 text-white',
    'bg-teal-500 text-white',
    'bg-violet-500 text-white'
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

// Format date nicely e.g. "Oct 12, 2026"
export function formatDate(dateString) {
  if (!dateString) return 'Not set';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

// Format relative time e.g. "2 days ago"
export function formatRelativeTime(dateString) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.round(diffMs / 1000);
    const diffMins = Math.round(diffSecs / 60);
    const diffHours = Math.round(diffMins / 60);
    const diffDays = Math.round(diffHours / 24);

    if (diffDays > 30) return formatDate(dateString);
    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    if (diffMins > 0) return `${diffMins}m ago`;
    return 'Just now';
  } catch {
    return '';
  }
}
