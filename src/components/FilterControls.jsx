import React from 'react';
import { 
  Search, 
  Building2, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  X, 
  ArrowUpDown 
} from 'lucide-react';
import { STATUSES, STATUS_CONFIG } from '../constants';

export default function FilterControls({
  searchTerm,
  setSearchTerm,
  selectedCompany,
  setSelectedCompany,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  companiesList,
  onResetFilters,
  totalResults,
  totalApplications
}) {
  const hasActiveFilters = searchTerm !== '' || selectedCompany !== 'ALL' || selectedStatus !== 'ALL';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm mb-6 space-y-3 transition-colors">
      
      {/* Top row: Search, Company Filter, Sort By, View toggle */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by company, role, location, or notes..."
            className="w-full pl-10 pr-9 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          
          {/* Filter by Company Dropdown */}
          <div className="relative flex items-center">
            <Building2 className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="pl-9 pr-8 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors appearance-none cursor-pointer"
            >
              <option value="ALL">All Companies ({companiesList.length})</option>
              {companiesList.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name} ({item.count})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2.5 text-slate-400 text-xs">▼</div>
          </div>

          {/* Sort By Dropdown */}
          <div className="relative flex items-center">
            <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-9 pr-8 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors appearance-none cursor-pointer"
            >
              <option value="date-desc">Newest Applied</option>
              <option value="date-asc">Oldest Applied</option>
              <option value="company-asc">Company (A-Z)</option>
              <option value="company-desc">Company (Z-A)</option>
              <option value="status">Status Order</option>
            </select>
            <div className="pointer-events-none absolute right-2.5 text-slate-400 text-xs">▼</div>
          </div>

          {/* View Toggle (Kanban vs Table) */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700">
            <button
              onClick={() => setViewMode('board')}
              className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === 'board'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Kanban Board View"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Board</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Table List View"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>

        </div>

      </div>

      {/* Bottom row: Status filter chips & Clear filters */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 mr-1 hidden sm:inline">
            Status:
          </span>
          <button
            onClick={() => setSelectedStatus('ALL')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              selectedStatus === 'ALL'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All
          </button>

          {Object.values(STATUSES).map((status) => {
            const config = STATUS_CONFIG[status];
            const isActive = selectedStatus === status;
            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(isActive ? 'ALL' : status)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'ring-2 ring-blue-500 shadow-sm font-semibold ' + config.badge
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                {config.label}
              </button>
            );
          })}
        </div>

        {/* Filter summary and Clear action */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 ml-auto">
          <span>
            Showing <strong className="text-slate-800 dark:text-slate-200">{totalResults}</strong> of {totalApplications}
          </span>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center gap-1 ml-1"
            >
              <X className="w-3 h-3" />
              Reset filters
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
