import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Clock, 
  MessageSquare, 
  Building2, 
  Send,
  Calendar
} from 'lucide-react';
import { generateId } from '../utils/storage';
import { formatRelativeTime, formatDate } from '../utils/helpers';

export default function NotesModal({ 
  isOpen, 
  onClose, 
  application, 
  onUpdateApplication 
}) {
  const [newNoteText, setNewNoteText] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setNewNoteText('');
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !application) return null;

  const notesHistory = application.notesHistory || (application.notes ? [
    {
      id: generateId('note'),
      text: application.notes,
      createdAt: application.updatedAt || new Date().toISOString()
    }
  ] : []);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newNoteObj = {
      id: generateId('note'),
      text: newNoteText.trim(),
      createdAt: new Date().toISOString()
    };

    const updatedNotesList = [...notesHistory, newNoteObj];

    const updatedApplication = {
      ...application,
      notes: newNoteText.trim(), // keep latest note as main summary
      notesHistory: updatedNotesList,
      updatedAt: new Date().toISOString()
    };

    onUpdateApplication(updatedApplication);
    setNewNoteText('');
  };

  const handleDeleteNote = (noteId) => {
    const updatedNotesList = notesHistory.filter(n => n.id !== noteId);
    const updatedApplication = {
      ...application,
      notes: updatedNotesList.length > 0 ? updatedNotesList[updatedNotesList.length - 1].text : '',
      notesHistory: updatedNotesList,
      updatedAt: new Date().toISOString()
    };
    onUpdateApplication(updatedApplication);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Notes & Timeline
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                  {notesHistory.length}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {application.company} • {application.role}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notes Timeline List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {notesHistory.length === 0 ? (
            <div className="py-8 text-center text-slate-400 dark:text-slate-500 space-y-2">
              <MessageSquare className="w-8 h-8 mx-auto stroke-1" />
              <p className="text-sm font-medium">No notes recorded yet</p>
              <p className="text-xs">Add your first interview prep, recruiter contacts, or reminders below.</p>
            </div>
          ) : (
            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              {notesHistory.map((note) => (
                <div key={note.id} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 bg-blue-500 ring-2 ring-blue-100 dark:ring-blue-950" />
                  
                  <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-4 transition-all">
                    <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 mb-2">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatRelativeTime(note.createdAt)}</span>
                        <span>•</span>
                        <span>{formatDate(note.createdAt)}</span>
                      </div>

                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-opacity p-1"
                        title="Delete this note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                      {note.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input area to add note */}
        <form onSubmit={handleAddNote} className="p-4 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800">
          <div className="space-y-2">
            <textarea
              ref={textareaRef}
              rows={2}
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="Add a new note, interview feedback, or follow-up task..."
              className="w-full p-3 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none shadow-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  handleAddNote(e);
                }
              }}
            />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                Press <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px]">Ctrl+Enter</kbd> to save
              </span>
              <button
                type="submit"
                disabled={!newNoteText.trim()}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 text-white font-medium text-xs rounded-xl shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Save Note</span>
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
