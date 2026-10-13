import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Calendar, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  MessageSquare, 
  MoreHorizontal,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { STATUSES, STATUS_CONFIG } from '../constants';
import { getCompanyInitials, getCompanyColorClass, formatDate } from '../utils/helpers';

export default function ApplicationCard({
  application,
  onEdit,
  onDelete,
  onOpenNotes,
  onUpdateStatus,
  showToast
}) {
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const statusMenuRef = useRef(null);
  const actionsMenuRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (statusMenuRef.current && !statusMenuRef.current.contains(e.target)) {
        setStatusMenuOpen(false);
      }
      if (actionsMenuRef.current && !actionsMenuRef.current.contains(e.target)) {
        setActionsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStatusChange = (newStatus) => {
    setStatusMenuOpen(false);
    if (newStatus === application.status) return;

    if (newStatus === STATUSES.OFFER) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // fallback
      }
      showToast(`🎉 Congratulations! Offer status recorded for ${application.company}!`, 'success');
    } else {
      showToast(`Updated status to ${newStatus}`, 'info');
    }

    onUpdateStatus(application.id, newStatus);
  };

  const statusConfig = STATUS_CONFIG[application.status] || STATUS_CONFIG[STATUSES.APPLIED];
  const companyInitials = getCompanyInitials(application.company);
  const companyColor = getCompanyColorClass(application.company);
  const notesCount = (application.notesHistory?.length) || (application.notes ? 1 : 0);

  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between">
      
      {/* Top Header: Avatar + Title + Actions */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 shadow-sm ${companyColor}`}>
              {companyInitials}
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                {application.role}
              </h3>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-0.5">
                {application.company}
              </p>
            </div>
          </div>

          {/* Quick 3-dot Action Menu */}
          <div className="relative" ref={actionsMenuRef}>
            <button
              onClick={() => setActionsMenuOpen(!actionsMenuOpen)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="More options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {actionsMenuOpen && (
              <div className="absolute right-0 mt-1 w-44 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1 z-40 text-xs animate-in fade-in zoom-in-95 duration-100">
                <button
                  onClick={() => {
                    setActionsMenuOpen(false);
                    onEdit(application);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>

                <button
                  onClick={() => {
                    setActionsMenuOpen(false);
                    onOpenNotes(application);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Manage Notes</span>
                </button>

                {application.jobUrl && (
                  <a
                    href={application.jobUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setActionsMenuOpen(false)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Job Post</span>
                  </a>
                )}

                <div className="my-1 border-t border-slate-200 dark:border-slate-800" />

                <button
                  onClick={() => {
                    setActionsMenuOpen(false);
                    onDelete(application);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-left"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Application</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Status Dropdown Badge */}
        <div className="relative mb-3" ref={statusMenuRef}>
          <button
            onClick={() => setStatusMenuOpen(!statusMenuOpen)}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${statusConfig.badge} hover:brightness-95`}
            title="Click to change status"
          >
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${statusConfig.dot}`} />
              <span>{statusConfig.label}</span>
              {application.status === STATUSES.OFFER && (
                <Sparkles className="w-3 h-3 text-emerald-500 animate-pulse ml-0.5" />
              )}
            </div>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {statusMenuOpen && (
            <div className="absolute left-0 right-0 mt-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1 z-30 text-xs animate-in fade-in zoom-in-95 duration-100">
              <div className="px-2.5 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Change Status
              </div>
              {Object.values(STATUSES).map((status) => {
                const conf = STATUS_CONFIG[status];
                const isCurrent = application.status === status;
                return (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left ${
                      isCurrent ? 'font-bold bg-slate-50 dark:bg-slate-800/60' : 'font-normal'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${conf.dot}`} />
                    <span>{conf.label}</span>
                    {isCurrent && <span className="ml-auto text-blue-500 text-[10px]">Active</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Metadata Details (Location, Salary, Employment Type) */}
        <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 mb-3">
          {application.location && (
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{application.location}</span>
            </div>
          )}

          {application.salary && (
            <div className="flex items-center gap-1.5 truncate font-medium text-emerald-700 dark:text-emerald-400">
              <DollarSign className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="truncate">{application.salary}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Applied: {formatDate(application.applicationDate)}</span>
            {application.employmentType && (
              <>
                <span>•</span>
                <span className="truncate">{application.employmentType}</span>
              </>
            )}
          </div>
        </div>

        {/* Notes Preview */}
        {application.notes && (
          <div 
            onClick={() => onOpenNotes(application)}
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors mb-3"
            title="Click to view notes"
          >
            "{application.notes}"
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs mt-auto">
        
        {/* Notes button with count */}
        <button
          onClick={() => onOpenNotes(application)}
          className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-colors ${
            notesCount > 0 
              ? 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60' 
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
          title="Open notes & timeline"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span className="font-medium">{notesCount} {notesCount === 1 ? 'note' : 'notes'}</span>
        </button>

        <div className="flex items-center gap-1">
          {application.jobUrl && (
            <a
              href={application.jobUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Open external job link"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            onClick={() => onEdit(application)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Edit details"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
