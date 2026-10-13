import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import FilterControls from './components/FilterControls';
import KanbanBoard from './components/KanbanBoard';
import TableView from './components/TableView';
import ApplicationFormModal from './components/ApplicationFormModal';
import NotesModal from './components/NotesModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import { 
  loadApplications, 
  saveApplications, 
  resetToSampleData, 
  clearAllApplications 
} from './utils/storage';
import { STATUSES } from './constants';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Applications data state
  const [applications, setApplications] = useState(() => loadApplications());

  // Filter and view states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [sortBy, setSortBy] = useState('date-desc');
  const [viewMode, setViewMode] = useState('board'); // 'board' | 'table'

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [notesApplication, setNotesApplication] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingApplication, setDeletingApplication] = useState(null);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Sync theme to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Sync applications to localStorage
  useEffect(() => {
    saveApplications(applications);
  }, [applications]);

  // Keep notes modal application in sync if applications array updates
  useEffect(() => {
    if (notesApplication) {
      const refreshed = applications.find(a => a.id === notesApplication.id);
      if (refreshed) {
        setNotesApplication(refreshed);
      }
    }
  }, [applications]);

  // Generate unique companies list with frequency count
  const companiesList = useMemo(() => {
    const counts = {};
    applications.forEach(app => {
      if (app.company) {
        counts[app.company] = (counts[app.company] || 0) + 1;
      }
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [applications]);

  // Filter & sort applications
  const filteredApplications = useMemo(() => {
    let result = [...applications];

    // 1. Search term filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(app => 
        (app.company && app.company.toLowerCase().includes(term)) ||
        (app.role && app.role.toLowerCase().includes(term)) ||
        (app.location && app.location.toLowerCase().includes(term)) ||
        (app.notes && app.notes.toLowerCase().includes(term))
      );
    }

    // 2. Filter by Company
    if (selectedCompany !== 'ALL') {
      result = result.filter(app => app.company.toLowerCase() === selectedCompany.toLowerCase());
    }

    // 3. Filter by Status
    if (selectedStatus !== 'ALL') {
      result = result.filter(app => app.status === selectedStatus);
    }

    // 4. Sort
    result.sort((a, b) => {
      if (sortBy === 'date-desc') {
        return new Date(b.applicationDate || 0) - new Date(a.applicationDate || 0);
      }
      if (sortBy === 'date-asc') {
        return new Date(a.applicationDate || 0) - new Date(b.applicationDate || 0);
      }
      if (sortBy === 'company-asc') {
        return (a.company || '').localeCompare(b.company || '');
      }
      if (sortBy === 'company-desc') {
        return (b.company || '').localeCompare(a.company || '');
      }
      if (sortBy === 'status') {
        const order = [STATUSES.OFFER, STATUSES.INTERVIEWING, STATUSES.APPLIED, STATUSES.WISHLIST, STATUSES.REJECTED];
        return order.indexOf(a.status) - order.indexOf(b.status);
      }
      return 0;
    });

    return result;
  }, [applications, searchTerm, selectedCompany, selectedStatus, sortBy]);

  // Handlers
  const handleSaveApplication = (applicationRecord) => {
    if (editingApplication) {
      // Update existing
      setApplications(prev => prev.map(app => app.id === applicationRecord.id ? applicationRecord : app));
      showToast(`Updated ${applicationRecord.company} application`, 'success');
    } else {
      // Create new
      setApplications(prev => [applicationRecord, ...prev]);
      showToast(`Added ${applicationRecord.company} to pipeline`, 'success');
    }
    setEditingApplication(null);
  };

  const handleUpdateStatus = (appId, newStatus) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status: newStatus,
          updatedAt: new Date().toISOString()
        };
      }
      return app;
    }));
  };

  const handleUpdateApplicationRecord = (updatedRecord) => {
    setApplications(prev => prev.map(app => app.id === updatedRecord.id ? updatedRecord : app));
    showToast('Saved note update', 'success');
  };

  const handleDeleteConfirm = (appId) => {
    setApplications(prev => prev.filter(app => app.id !== appId));
    showToast('Application removed', 'info');
  };

  const handleResetData = () => {
    const data = resetToSampleData();
    setApplications(data);
    showToast('Reset to sample applications', 'success');
  };

  const handleClearData = () => {
    const data = clearAllApplications();
    setApplications(data);
    showToast('Cleared all applications', 'info');
  };

  const handleImportData = (importedList) => {
    setApplications(importedList);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCompany('ALL');
    setSelectedStatus('ALL');
  };

  const handleOpenAddModal = (status = STATUSES.APPLIED) => {
    setEditingApplication(null);
    setIsFormModalOpen(true);
  };

  const handleAddNewWithStatus = (status) => {
    setEditingApplication({
      company: '',
      role: '',
      status: status,
      location: '',
      employmentType: 'Full-time',
      salary: '',
      applicationDate: new Date().toISOString().slice(0, 10),
      jobUrl: '',
      notes: ''
    });
    setIsFormModalOpen(true);
  };

  const handleEditApplication = (app) => {
    setEditingApplication(app);
    setIsFormModalOpen(true);
  };

  const handleDeleteApplication = (app) => {
    setDeletingApplication(app);
    setIsDeleteModalOpen(true);
  };

  const handleOpenNotes = (app) => {
    setNotesApplication(app);
    setIsNotesModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      
      {/* Top Navigation */}
      <Navbar
        applications={applications}
        onNewApplication={() => handleOpenAddModal()}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onResetData={handleResetData}
        onClearData={handleClearData}
        onImportData={handleImportData}
        showToast={showToast}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Welcome & Overview Header */}
        <div className="mb-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Job Applications
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track your job hunt, manage interviews, filter by company, and log notes.
          </p>
        </div>

        {/* Stats Metrics Cards */}
        <StatsCards
          applications={applications}
          activeStatusFilter={selectedStatus}
          onSelectStatusFilter={(status) => setSelectedStatus(status)}
        />

        {/* Filter & Search Bar */}
        <FilterControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          companiesList={companiesList}
          onResetFilters={handleResetFilters}
          totalResults={filteredApplications.length}
          totalApplications={applications.length}
        />

        {/* Views: Kanban Board OR Table View */}
        {viewMode === 'board' ? (
          <KanbanBoard
            applications={filteredApplications}
            onEdit={handleEditApplication}
            onDelete={handleDeleteApplication}
            onOpenNotes={handleOpenNotes}
            onUpdateStatus={handleUpdateStatus}
            onAddNewWithStatus={handleAddNewWithStatus}
            showToast={showToast}
          />
        ) : (
          <TableView
            applications={filteredApplications}
            onEdit={handleEditApplication}
            onDelete={handleDeleteApplication}
            onOpenNotes={handleOpenNotes}
            onUpdateStatus={handleUpdateStatus}
            showToast={showToast}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200/80 dark:border-slate-800 text-center text-xs text-slate-400 dark:text-slate-600 transition-colors">
        <p>Job Application Tracker • Built with React, Tailwind CSS & LocalStorage Persistence</p>
      </footer>

      {/* Modals & Dialogs */}
      <ApplicationFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingApplication(null);
        }}
        onSave={handleSaveApplication}
        initialData={editingApplication}
      />

      <NotesModal
        isOpen={isNotesModalOpen}
        onClose={() => {
          setIsNotesModalOpen(false);
          setNotesApplication(null);
        }}
        application={notesApplication}
        onUpdateApplication={handleUpdateApplicationRecord}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingApplication(null);
        }}
        onConfirm={handleDeleteConfirm}
        application={deletingApplication}
      />

      {/* Feedback Toast */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
