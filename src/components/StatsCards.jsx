import React from 'react';
import { 
  FileText, 
  Send, 
  CalendarClock, 
  Trophy, 
  XCircle,
  TrendingUp 
} from 'lucide-react';
import { STATUSES } from '../constants';

export default function StatsCards({ applications, activeStatusFilter, onSelectStatusFilter }) {
  const total = applications.length;
  const wishlistCount = applications.filter(a => a.status === STATUSES.WISHLIST).length;
  const appliedCount = applications.filter(a => a.status === STATUSES.APPLIED).length;
  const interviewCount = applications.filter(a => a.status === STATUSES.INTERVIEWING).length;
  const offerCount = applications.filter(a => a.status === STATUSES.OFFER).length;
  const rejectedCount = applications.filter(a => a.status === STATUSES.REJECTED).length;

  // Response rate: (interviews + offers) / (total - wishlist)
  const sentApplications = total - wishlistCount;
  const responseRate = sentApplications > 0 
    ? Math.round(((interviewCount + offerCount) / sentApplications) * 100) 
    : 0;

  const stats = [
    {
      label: 'Total Saved',
      value: total,
      filterValue: 'ALL',
      icon: FileText,
      color: 'blue',
      borderColor: 'border-blue-200 dark:border-blue-900',
      iconBg: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
    },
    {
      label: 'Applied',
      value: appliedCount,
      filterValue: STATUSES.APPLIED,
      icon: Send,
      color: 'slate',
      borderColor: 'border-slate-200 dark:border-slate-800',
      iconBg: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
    },
    {
      label: 'Interviewing',
      value: interviewCount,
      filterValue: STATUSES.INTERVIEWING,
      icon: CalendarClock,
      color: 'amber',
      borderColor: 'border-amber-200 dark:border-amber-900',
      iconBg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
    },
    {
      label: 'Offers',
      value: offerCount,
      filterValue: STATUSES.OFFER,
      icon: Trophy,
      color: 'emerald',
      borderColor: 'border-emerald-200 dark:border-emerald-900',
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
    },
    {
      label: 'Rejected',
      value: rejectedCount,
      filterValue: STATUSES.REJECTED,
      icon: XCircle,
      color: 'rose',
      borderColor: 'border-rose-200 dark:border-rose-900',
      iconBg: 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
    },
    {
      label: 'Interview Rate',
      value: `${responseRate}%`,
      subtitle: `${interviewCount + offerCount} positive signals`,
      icon: TrendingUp,
      color: 'indigo',
      borderColor: 'border-indigo-200 dark:border-indigo-900',
      iconBg: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400',
      nonFilterable: true
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 my-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        const isSelected = activeStatusFilter === stat.filterValue;

        return (
          <button
            key={idx}
            type="button"
            disabled={stat.nonFilterable}
            onClick={() => !stat.nonFilterable && onSelectStatusFilter(isSelected ? 'ALL' : stat.filterValue)}
            className={`flex flex-col p-4 rounded-2xl border text-left transition-all ${
              stat.nonFilterable 
                ? 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 opacity-90 cursor-default'
                : isSelected
                  ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-500 dark:border-blue-500 shadow-sm ring-2 ring-blue-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">
                {stat.label}
              </span>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${stat.iconBg}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="flex items-baseline gap-1 mt-auto">
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {stat.value}
              </span>
            </div>

            {stat.subtitle ? (
              <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 truncate">
                {stat.subtitle}
              </span>
            ) : (
              <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                {isSelected ? 'Active filter (click to reset)' : 'Click to filter'}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
