import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  loadApplications, 
  saveApplications, 
  resetToSampleData, 
  clearAllApplications, 
  generateId,
  exportToJSON,
  exportToCSV
} from './storage';
import { INITIAL_SAMPLE_APPLICATIONS, STATUSES } from '../constants';

describe('Storage & Persistence Utility Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads sample data when localStorage is empty', () => {
    const apps = loadApplications();
    expect(apps).toHaveLength(INITIAL_SAMPLE_APPLICATIONS.length);
    expect(apps[0]).toHaveProperty('company');
  });

  it('saves and reloads applications from localStorage', () => {
    const testData = [
      {
        id: 'test-1',
        company: 'Test Corp',
        role: 'Tester',
        status: STATUSES.APPLIED,
        notes: 'Initial note'
      }
    ];

    saveApplications(testData);
    const loaded = loadApplications();
    expect(loaded).toHaveLength(1);
    expect(loaded[0].company).toBe('Test Corp');
  });

  it('resets to sample data', () => {
    saveApplications([]);
    expect(loadApplications()).toHaveLength(0);

    const reset = resetToSampleData();
    expect(reset.length).toBeGreaterThan(0);
    expect(loadApplications().length).toBe(INITIAL_SAMPLE_APPLICATIONS.length);
  });

  it('clears all applications', () => {
    saveApplications(INITIAL_SAMPLE_APPLICATIONS);
    const cleared = clearAllApplications();
    expect(cleared).toHaveLength(0);
    expect(loadApplications()).toHaveLength(0);
  });

  it('generates unique IDs', () => {
    const id1 = generateId('app');
    const id2 = generateId('app');
    expect(id1).not.toBe(id2);
    expect(id1).toMatch(/^app-/);
  });

  it('triggers exportToJSON and exportToCSV without throwing', () => {
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

    exportToJSON(INITIAL_SAMPLE_APPLICATIONS);
    expect(clickSpy).toHaveBeenCalled();

    exportToCSV(INITIAL_SAMPLE_APPLICATIONS);
    expect(clickSpy).toHaveBeenCalledTimes(2);

    clickSpy.mockRestore();
  });
});
