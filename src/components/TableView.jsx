import React from 'react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  MessageSquare,
  Sparkles,
  Inbox
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { STATUSES, STATUS_CONFIG } from '../constants';
import { getCompanyInitials, getCompanyColorClass, formatDate } from '../utils/helpers';

export default function TableView({
  applications,
  onEdit,
  onDelete,
  onOpenNotes,
  onUpdateStatus,
  showToast
}) {
  const handleStatusChange = (app, newStatus) => {
    if (newStatus === app.status) return;

    if (newStatus === STATUSES.OFFER) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
      showToast(`🎉 Congratulations! Offer received from ${app.company}!`, 'success');
    } else {
      showToast(`Updated ${app.company} status to ${newStatus}`, 'info');
    }

    onUpdateStatus(app.id, newStatus);
  };

  if (applications.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-400 dark:text-slate-600">
        <Inbox className="w-10 h-10 mx-auto stroke-1 mb-2" />
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">No applications match your criteria</h4>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Try resetting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden transition-colors">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4">Company & Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Salary</th>
              <th className="py-3 px-4">Date Applied</th>
              <th className="py-3 px-4">Notes</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-sm">
            {applications.map((app) => {
              const statusConf = STATUS_CONFIG[app.status] || STATUS_CONFIG[STATUSES.APPLIED];
              const companyInitials = getCompanyInitials(app.company);
              const companyColor = getCompanyColorClass(app.company);
              const notesCount = (app.notesHistory?.length) || (app.notes ? 1 : 0);

              return (
                <tr 
                  key={app.id} 
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                >
                  {/* Company & Role */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 shadow-sm ${companyColor}`}>
                        {companyInitials}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white leading-tight">
                          {app.role}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {app.company}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-3 px-4">
                    <div className="inline-block relative">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-xl border appearance-none cursor-pointer pr-6 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${statusConf.badge}`}
                      >
                        {Object.values(STATUSES).map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] opacity-70">
                        ▼
                      </div>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="py-3 px-4 text-xs text-slate-600 dark:text-slate-400">
                    {app.location || '—'}
                  </td>

                  {/* Salary */}
                  <td className="py-3 px-4 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    {app.salary || '—'}
                  </td>

                  {/* Date Applied */}
                  <td className="py-3 px-4 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {formatDate(app.applicationDate)}
                  </td>

                  {/* Notes */}
                  <td className="py-3 px-4 max-w-[200px]">
                    <button
                      onClick={() => onOpenNotes(app)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-colors ${
                        notesCount > 0
                          ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-medium hover:bg-amber-100 dark:hover:bg-amber-900/60'
                          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                      }`}
                      title="View notes"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{notesCount > 0 ? `${notesCount} note${notesCount > 1 ? 's' : ''}` : '+ Add'}</span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      {app.jobUrl && (
                        <a
                          href={app.jobUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Open job posting"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => onEdit(app)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Edit application"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(app)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete application"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
