import React, { useState, useRef, useEffect } from 'react';
import { 
  Briefcase, 
  Plus, 
  Sun, 
  Moon, 
  Download, 
  Upload, 
  RotateCcw, 
  Trash2, 
  MoreVertical,
  CheckCircle2,
  FileSpreadsheet,
  FileCode
} from 'lucide-react';
import { exportToJSON, exportToCSV } from '../utils/storage';

export default function Navbar({ 
  applications, 
  onNewApplication, 
  darkMode, 
  setDarkMode, 
  onResetData, 
  onClearData,
  onImportData,
  showToast
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExportJSON = () => {
    exportToJSON(applications);
    showToast('Exported applications as JSON', 'success');
    setMenuOpen(false);
  };

  const handleExportCSV = () => {
    exportToCSV(applications);
    showToast('Exported applications as CSV', 'success');
    setMenuOpen(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) {
          onImportData(imported);
          showToast(`Successfully imported ${imported.length} applications`, 'success');
        } else {
          showToast('Invalid file format: Expected an array of applications', 'error');
        }
      } catch (err) {
        showToast('Failed to parse JSON file', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Briefcase className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight leading-none">
                JobTracker
              </h1>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                {applications.length}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Application & Interview Pipeline
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Backup & Tools Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Backup, export and settings"
              aria-label="Settings and tools"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1.5 z-50 text-sm animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Data & Persistence
                </div>
                
                <button
                  onClick={handleExportJSON}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                >
                  <FileCode className="w-4 h-4 text-blue-500" />
                  <span>Export JSON</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                >
                  <Upload className="w-4 h-4 text-indigo-500" />
                  <span>Import JSON Backup</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInput}
                  accept=".json"
                  className="hidden"
                />

                <div className="my-1.5 border-t border-slate-200 dark:border-slate-800" />

                <button
                  onClick={() => {
                    onResetData();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                >
                  <RotateCcw className="w-4 h-4 text-amber-500" />
                  <span>Load Sample Data</span>
                </button>

                <button
                  onClick={() => {
                    onClearData();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear All Applications</span>
                </button>
              </div>
            )}
          </div>

          {/* New Application Primary Button */}
          <button
            onClick={onNewApplication}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm rounded-xl shadow-sm shadow-blue-500/20 transition-all hover:shadow-md hover:shadow-blue-500/30 active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Add Application</span>
            <span className="sm:hidden">Add</span>
          </button>

        </div>

      </div>
    </header>
  );
}
