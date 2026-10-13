export const STATUSES = {
  WISHLIST: 'Wishlist',
  APPLIED: 'Applied',
  INTERVIEWING: 'Interviewing',
  OFFER: 'Offer',
  REJECTED: 'Rejected'
};

export const STATUS_CONFIG = {
  [STATUSES.WISHLIST]: {
    label: 'Wishlist',
    color: 'slate',
    bg: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
    badge: 'bg-slate-100 text-slate-700 dark:bg-slate-800/80 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    dot: 'bg-slate-400',
    border: 'border-slate-300 dark:border-slate-700',
    accent: '#64748b'
  },
  [STATUSES.APPLIED]: {
    label: 'Applied',
    color: 'blue',
    bg: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60',
    badge: 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    dot: 'bg-blue-500',
    border: 'border-blue-300 dark:border-blue-700',
    accent: '#3b82f6'
  },
  [STATUSES.INTERVIEWING]: {
    label: 'Interviewing',
    color: 'amber',
    bg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
    badge: 'bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    dot: 'bg-amber-500',
    border: 'border-amber-300 dark:border-amber-700',
    accent: '#f59e0b'
  },
  [STATUSES.OFFER]: {
    label: 'Offer',
    color: 'emerald',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
    badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    dot: 'bg-emerald-500',
    border: 'border-emerald-300 dark:border-emerald-700',
    accent: '#10b981'
  },
  [STATUSES.REJECTED]: {
    label: 'Rejected',
    color: 'rose',
    bg: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/60',
    badge: 'bg-rose-50 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    dot: 'bg-rose-500',
    border: 'border-rose-300 dark:border-rose-700',
    accent: '#f43f5e'
  }
};

export const EMPLOYMENT_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Freelance'
];

export const INITIAL_SAMPLE_APPLICATIONS = [
  {
    id: 'app-1',
    company: 'Stripe',
    role: 'Frontend Engineer',
    status: STATUSES.INTERVIEWING,
    location: 'San Francisco, CA (Remote)',
    employmentType: 'Full-time',
    salary: '$145,000 - $170,000',
    applicationDate: '2026-09-28',
    jobUrl: 'https://stripe.com/jobs',
    notes: 'Recruiter screen went great on Oct 3rd. Technical screen scheduled for system design and React performance.',
    notesHistory: [
      {
        id: 'note-1-1',
        text: 'Applied via employee referral from Alex on LinkedIn.',
        createdAt: '2026-09-28T10:00:00Z'
      },
      {
        id: 'note-1-2',
        text: 'Recruiter screen went great on Oct 3rd. Technical screen scheduled for system design and React performance.',
        createdAt: '2026-10-03T16:30:00Z'
      }
    ],
    updatedAt: '2026-10-03T16:30:00Z'
  },
  {
    id: 'app-2',
    company: 'Linear',
    role: 'Product Engineer',
    status: STATUSES.OFFER,
    location: 'Remote (Global)',
    employmentType: 'Full-time',
    salary: '$160,000 - $185,000',
    applicationDate: '2026-09-15',
    jobUrl: 'https://linear.app/careers',
    notes: 'Received written offer! Base $165k + equity package. Reviewing terms before Friday.',
    notesHistory: [
      {
        id: 'note-2-1',
        text: 'Submitted take-home project highlighting keyboard shortcuts and optimistic UI.',
        createdAt: '2026-09-20T11:15:00Z'
      },
      {
        id: 'note-2-2',
        text: 'Received written offer! Base $165k + equity package. Reviewing terms before Friday.',
        createdAt: '2026-10-10T14:00:00Z'
      }
    ],
    updatedAt: '2026-10-10T14:00:00Z'
  },
  {
    id: 'app-3',
    company: 'Vercel',
    role: 'Full Stack Developer',
    status: STATUSES.APPLIED,
    location: 'Remote (US/EU)',
    employmentType: 'Full-time',
    salary: '$150,000 - $175,000',
    applicationDate: '2026-10-08',
    jobUrl: 'https://vercel.com/careers',
    notes: 'Tailored resume emphasizing Next.js App Router and Edge Functions experience. Waiting for recruiter response.',
    notesHistory: [
      {
        id: 'note-3-1',
        text: 'Tailored resume emphasizing Next.js App Router and Edge Functions experience. Waiting for recruiter response.',
        createdAt: '2026-10-08T09:45:00Z'
      }
    ],
    updatedAt: '2026-10-08T09:45:00Z'
  },
  {
    id: 'app-4',
    company: 'Figma',
    role: 'Software Engineer - Canvas Platform',
    status: STATUSES.INTERVIEWING,
    location: 'New York, NY (Hybrid)',
    employmentType: 'Full-time',
    salary: '$170,000 - $195,000',
    applicationDate: '2026-09-22',
    jobUrl: 'https://figma.com/careers',
    notes: 'Completed behavioral interview with Engineering Manager. Final round on WebGL and state synchronization next Tuesday.',
    notesHistory: [
      {
        id: 'note-4-1',
        text: 'Completed behavioral interview with Engineering Manager. Final round on WebGL and state synchronization next Tuesday.',
        createdAt: '2026-10-05T13:20:00Z'
      }
    ],
    updatedAt: '2026-10-05T13:20:00Z'
  },
  {
    id: 'app-5',
    company: 'Spotify',
    role: 'Web Developer',
    status: STATUSES.REJECTED,
    location: 'Stockholm / Remote',
    employmentType: 'Full-time',
    salary: '$130,000 - $150,000',
    applicationDate: '2026-09-10',
    jobUrl: 'https://spotify.com/jobs',
    notes: 'Automated rejection email received after 3 weeks. Role was put on hold according to team update.',
    notesHistory: [
      {
        id: 'note-5-1',
        text: 'Automated rejection email received after 3 weeks. Role was put on hold according to team update.',
        createdAt: '2026-10-01T08:00:00Z'
      }
    ],
    updatedAt: '2026-10-01T08:00:00Z'
  },
  {
    id: 'app-6',
    company: 'Google',
    role: 'Frontend Software Engineer III',
    status: STATUSES.WISHLIST,
    location: 'Mountain View, CA (Hybrid)',
    employmentType: 'Full-time',
    salary: '$180,000 - $210,000',
    applicationDate: '2026-10-12',
    jobUrl: 'https://careers.google.com',
    notes: 'Connecting with campus recruiter on LinkedIn first before submitting official application.',
    notesHistory: [
      {
        id: 'note-6-1',
        text: 'Connecting with campus recruiter on LinkedIn first before submitting official application.',
        createdAt: '2026-10-12T17:10:00Z'
      }
    ],
    updatedAt: '2026-10-12T17:10:00Z'
  }
];
