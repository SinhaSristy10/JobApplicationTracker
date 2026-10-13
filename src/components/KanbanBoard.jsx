import React from 'react';
import { Plus, Inbox } from 'lucide-react';
import { STATUSES, STATUS_CONFIG } from '../constants';
import ApplicationCard from './ApplicationCard';

export default function KanbanBoard({
  applications,
  onEdit,
  onDelete,
  onOpenNotes,
  onUpdateStatus,
  onAddNewWithStatus,
  showToast
}) {
  const columns = [
    STATUSES.WISHLIST,
    STATUSES.APPLIED,
    STATUSES.INTERVIEWING,
    STATUSES.OFFER,
    STATUSES.REJECTED
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-start">
      {columns.map((status) => {
        const config = STATUS_CONFIG[status];
        const statusApplications = applications.filter((app) => app.status === status);

        return (
          <div
            key={status}
            className="flex flex-col bg-slate-100/70 dark:bg-slate-900/40 rounded-2xl p-3 border border-slate-200/60 dark:border-slate-800/60 min-h-[500px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between px-2 py-1.5 mb-3">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {config.label}
                </h3>
                <span className="px-1.5 py-0.5 rounded-md bg-white dark:bg-slate-800 text-[11px] font-semibold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  {statusApplications.length}
                </span>
              </div>

              <button
                onClick={() => onAddNewWithStatus(status)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-colors"
                title={`Add application with status: ${config.label}`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Applications List */}
            <div className="space-y-3 flex-1 overflow-y-auto">
              {statusApplications.length === 0 ? (
                <div className="h-36 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 text-xs gap-1.5 p-4 text-center">
                  <Inbox className="w-5 h-5 stroke-1" />
                  <span>No applications</span>
                  <button
                    onClick={() => onAddNewWithStatus(status)}
                    className="text-blue-500 hover:underline text-[11px] font-medium mt-1"
                  >
                    + Add one here
                  </button>
                </div>
              ) : (
                statusApplications.map((app) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onOpenNotes={onOpenNotes}
                    onUpdateStatus={onUpdateStatus}
                    showToast={showToast}
                  />
                ))
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
}
