import React from 'react';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';
import { INITIAL_SAMPLE_APPLICATIONS, STATUSES } from './constants';

describe('Job Application Tracker - End-to-End Feature Verification', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders application with sample data, stats, and controls', () => {
    render(<App />);

    // Header and title
    expect(screen.getByText('JobTracker')).toBeInTheDocument();
    expect(screen.getByText('Job Applications')).toBeInTheDocument();

    // Stats cards
    expect(screen.getByText('Total Saved')).toBeInTheDocument();
    expect(screen.getByText('Interview Rate')).toBeInTheDocument();

    // Default sample applications should be rendered
    expect(screen.getByText('Stripe')).toBeInTheDocument();
    expect(screen.getByText('Linear')).toBeInTheDocument();
    expect(screen.getByText('Vercel')).toBeInTheDocument();
  });

  it('Requirement 1: Add new application with form validation', async () => {
    render(<App />);

    // Click "Add Application" button in navbar
    const addBtn = screen.getByRole('button', { name: /^Add Application$/i });
    fireEvent.click(addBtn);

    // Modal should be open
    expect(screen.getByText('Add New Job Application')).toBeInTheDocument();

    // Fill the inputs
    const companyInput = screen.getByPlaceholderText(/e.g. Stripe, Google/i);
    const roleInput = screen.getByPlaceholderText(/e.g. Senior Frontend Developer/i);
    const locationInput = screen.getByPlaceholderText(/e.g. Remote, Seattle/i);
    const salaryInput = screen.getByPlaceholderText(/e.g. \$130,000/i);
    const notesInput = screen.getByPlaceholderText(/Log interview stages/i);

    fireEvent.change(companyInput, { target: { value: 'Netflix' } });
    fireEvent.change(roleInput, { target: { value: 'Staff UI Engineer' } });
    fireEvent.change(locationInput, { target: { value: 'Los Gatos, CA (Remote)' } });
    fireEvent.change(salaryInput, { target: { value: '$220,000 - $250,000' } });
    fireEvent.change(notesInput, { target: { value: 'Initial recruiter screening passed with flying colors.' } });

    // Submit form
    const submitBtn = screen.getByRole('button', { name: /Create Application/i });
    fireEvent.click(submitBtn);

    // Modal should close and Netflix should be in the list
    await waitFor(() => {
      expect(screen.queryByText('Add New Job Application')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Netflix')).toBeInTheDocument();
    expect(screen.getByText('Staff UI Engineer')).toBeInTheDocument();
  });

  it('Requirement 2: Update application status', async () => {
    render(<App />);

    // Find the Stripe application card
    const stripeText = screen.getByText('Stripe');
    const card = stripeText.closest('.group');
    expect(card).toBeInTheDocument();

    // Locate status badge button inside Stripe card
    const statusBtn = within(card).getByTitle('Click to change status');
    expect(statusBtn).toBeInTheDocument();

    // Click to open status menu
    fireEvent.click(statusBtn);

    // Select "Offer" status from the opened menu
    const offerOption = within(card).getByRole('button', { name: /Offer/i });
    fireEvent.click(offerOption);

    // Stripe should now be in the Offer column with Offer badge
    await waitFor(() => {
      const updatedCard = screen.getByText('Stripe').closest('.group');
      expect(within(updatedCard).getByTitle('Click to change status')).toHaveTextContent(/Offer/i);
    });
  });

  it('Requirement 3: Filter by company', async () => {
    render(<App />);

    // Select company filter dropdown
    const selectElements = screen.getAllByRole('combobox');
    const companySelect = selectElements.find(el => el.innerHTML.includes('All Companies'));
    expect(companySelect).toBeInTheDocument();

    // Filter by 'Linear'
    fireEvent.change(companySelect, { target: { value: 'Linear' } });

    // Linear should be visible
    expect(screen.getByText('Linear')).toBeInTheDocument();

    // Other companies like Stripe and Spotify should be filtered out
    expect(screen.queryByText('Stripe')).not.toBeInTheDocument();
    expect(screen.queryByText('Spotify')).not.toBeInTheDocument();

    // Reset filters
    const resetBtn = screen.getByText(/Reset filters/i);
    fireEvent.click(resetBtn);

    // All should be visible again
    expect(screen.getByText('Stripe')).toBeInTheDocument();
    expect(screen.getByText('Linear')).toBeInTheDocument();
  });

  it('Requirement 4: Save notes & view timeline history', async () => {
    render(<App />);

    // Find Vercel card and click its notes button
    const vercelText = screen.getByText('Vercel');
    const card = vercelText.closest('.group');
    const notesBtn = within(card).getByTitle('Open notes & timeline');
    fireEvent.click(notesBtn);

    // Notes modal should be visible
    expect(screen.getByText('Notes & Timeline')).toBeInTheDocument();
    expect(screen.getAllByText(/Vercel/i).length).toBeGreaterThan(0);

    // Add a new note
    const noteTextarea = screen.getByPlaceholderText(/Add a new note, interview feedback/i);
    fireEvent.change(noteTextarea, { 
      target: { value: 'Preparing system design for Next.js middleware caching on edge nodes.' } 
    });

    const saveNoteBtn = screen.getByRole('button', { name: /Save Note/i });
    fireEvent.click(saveNoteBtn);

    // Check that new note is added to timeline
    await waitFor(() => {
      expect(screen.getByText('Preparing system design for Next.js middleware caching on edge nodes.')).toBeInTheDocument();
    });
  });

  it('Requirement 5: Delete an application (CRUD)', async () => {
    render(<App />);

    // Find Google card
    const googleText = screen.getByText('Google');
    const card = googleText.closest('.group');

    // Open card 3-dot action menu
    const moreBtn = within(card).getByTitle('More options');
    fireEvent.click(moreBtn);

    // Click "Delete Application"
    const deleteBtn = within(card).getByRole('button', { name: /Delete Application/i });
    fireEvent.click(deleteBtn);

    // Delete confirmation modal should open
    expect(screen.getByText(/Are you sure you want to remove the application/i)).toBeInTheDocument();

    // Confirm deletion
    const confirmDeleteBtn = screen.getByRole('button', { name: /^Delete$/i });
    fireEvent.click(confirmDeleteBtn);

    // Google should now be removed from list
    await waitFor(() => {
      expect(screen.queryByText('Google')).not.toBeInTheDocument();
    });
  });

  it('Switches between Kanban Board and Table/List views', () => {
    render(<App />);

    // Click "List" view button
    const listViewBtn = screen.getByTitle('Table List View');
    fireEvent.click(listViewBtn);

    // Table headers should now be present
    expect(screen.getByText('Company & Role')).toBeInTheDocument();
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Date Applied')).toBeInTheDocument();

    // Switch back to Board view
    const boardViewBtn = screen.getByTitle('Kanban Board View');
    fireEvent.click(boardViewBtn);

    // Kanban columns should be visible
    expect(screen.getAllByText(/Wishlist/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Interviewing/i).length).toBeGreaterThan(0);
  });
});
