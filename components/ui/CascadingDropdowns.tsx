'use client';

import React from 'react';
import { notespitaraApi } from '@/store/services/notespitara';
import {
  GetAllUniversitiesResponse,
  GetProgramsByUniversityResponse,
  GetBranchesByProgramResponse,
  GetSemestersByBranchResponse,
  GetSubjectsBySemesterResponse,
  University,
  Program,
  Branch,
  Semester,
  Subject
} from '@/components/types/types';

export type DropdownLevel = 'UNIVERSITY' | 'PROGRAM' | 'BRANCH' | 'SEMESTER' | 'SUBJECT';

export interface CascadingDropdownsProps {
  level: DropdownLevel;
  selectedUniversityId?: string;
  selectedProgramId?: string;
  selectedBranchId?: string;
  selectedSemesterId?: string;
  selectedSubjectId?: string;
  
  onUniversityChange?: (val: string) => void;
  onProgramChange?: (val: string) => void;
  onBranchChange?: (val: string) => void;
  onSemesterChange?: (val: string) => void;
  onSubjectChange?: (val: string) => void;
}

export function CascadingDropdowns({
  level,
  selectedUniversityId = '',
  selectedProgramId = '',
  selectedBranchId = '',
  selectedSemesterId = '',
  selectedSubjectId = '',
  onUniversityChange,
  onProgramChange,
  onBranchChange,
  onSemesterChange,
  onSubjectChange,
}: CascadingDropdownsProps) {

  // 1. Fetch Universities
  const { data: uniData, isLoading: uniLoading } = notespitaraApi.useGetAllUniversitiesQuery({ page: 0, size: 100 });
  const universities: University[] = (uniData as unknown as GetAllUniversitiesResponse)?.data?.universities?.content || [];

  // 2. Fetch Programs by University
  const shouldFetchPrograms = ['PROGRAM', 'BRANCH', 'SEMESTER', 'SUBJECT'].includes(level) && !!selectedUniversityId;
  const { data: progData, isLoading: progLoading } = notespitaraApi.useGetProgramsByUniversityQuery(
    { id: selectedUniversityId, page: 0, size: 100 },
    { skip: !shouldFetchPrograms }
  );
  const programs: Program[] = (progData as unknown as GetProgramsByUniversityResponse)?.data?.programs?.content || [];

  // 3. Fetch Branches by Program
  const shouldFetchBranches = ['BRANCH', 'SEMESTER', 'SUBJECT'].includes(level) && !!selectedProgramId;
  const { data: branchData, isLoading: branchLoading } = notespitaraApi.useGetBranchesByProgramQuery(
    { id: selectedProgramId, page: 0, size: 100 },
    { skip: !shouldFetchBranches }
  );
  const branches: Branch[] = (branchData as unknown as GetBranchesByProgramResponse)?.data?.branches?.content || [];

  // 4. Fetch Semesters by Branch
  const shouldFetchSemesters = ['SEMESTER', 'SUBJECT'].includes(level) && !!selectedBranchId;
  const { data: semData, isLoading: semLoading } = notespitaraApi.useGetSemestersByBranchQuery(
    { id: selectedBranchId, page: 0, size: 100 },
    { skip: !shouldFetchSemesters }
  );
  const semesters: Semester[] = (semData as unknown as GetSemestersByBranchResponse)?.data?.semesters?.content || [];

  // 5. Fetch Subjects by Semester
  const shouldFetchSubjects = level === 'SUBJECT' && !!selectedSemesterId;
  const { data: subData, isLoading: subLoading } = notespitaraApi.useGetSubjectsBySemesterQuery(
    { id: selectedSemesterId, page: 0, size: 100 },
    { skip: !shouldFetchSubjects }
  );
  const subjects: Subject[] = (subData as unknown as GetSubjectsBySemesterResponse)?.data?.subjects?.content || [];


  const handleUniversityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUniversityChange?.(e.target.value);
    onProgramChange?.('');
    onBranchChange?.('');
    onSemesterChange?.('');
    onSubjectChange?.('');
  };

  const handleProgramChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onProgramChange?.(e.target.value);
    onBranchChange?.('');
    onSemesterChange?.('');
    onSubjectChange?.('');
  };

  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onBranchChange?.(e.target.value);
    onSemesterChange?.('');
    onSubjectChange?.('');
  };

  const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSemesterChange?.(e.target.value);
    onSubjectChange?.('');
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSubjectChange?.(e.target.value);
  };

  return (
    <div className="space-y-4">
      {/* Level 1: University */}
      {['UNIVERSITY', 'PROGRAM', 'BRANCH', 'SEMESTER', 'SUBJECT'].includes(level) && (
        <div>
          <label className="block text-sm font-medium mb-1">Select University *</label>
          <select
            value={selectedUniversityId}
            onChange={handleUniversityChange}
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-primary"
            disabled={uniLoading}
            required
          >
            <option value="">{uniLoading ? 'Loading...' : 'Select a university'}</option>
            {universities.map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Level 2: Program */}
      {['PROGRAM', 'BRANCH', 'SEMESTER', 'SUBJECT'].includes(level) && (
        <div>
          <label className="block text-sm font-medium mb-1">Select Program *</label>
          <select
            value={selectedProgramId}
            onChange={handleProgramChange}
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-primary"
            disabled={!selectedUniversityId || progLoading}
            required
          >
            <option value="">{progLoading ? 'Loading...' : !selectedUniversityId ? 'Please select university first' : 'Select a program'}</option>
            {programs.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Level 3: Branch */}
      {['BRANCH', 'SEMESTER', 'SUBJECT'].includes(level) && (
        <div>
          <label className="block text-sm font-medium mb-1">Select Branch *</label>
          <select
            value={selectedBranchId}
            onChange={handleBranchChange}
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-primary"
            disabled={!selectedProgramId || branchLoading}
            required
          >
            <option value="">{branchLoading ? 'Loading...' : !selectedProgramId ? 'Please select program first' : 'Select a branch'}</option>
            {branches.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Level 4: Semester */}
      {['SEMESTER', 'SUBJECT'].includes(level) && (
        <div>
          <label className="block text-sm font-medium mb-1">Select Semester *</label>
          <select
            value={selectedSemesterId}
            onChange={handleSemesterChange}
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-primary"
            disabled={!selectedBranchId || semLoading}
            required
          >
            <option value="">{semLoading ? 'Loading...' : !selectedBranchId ? 'Please select branch first' : 'Select a semester'}</option>
            {semesters.map(s => (
              <option key={s.id} value={s.id}>Semester {s.number}</option>
            ))}
          </select>
        </div>
      )}
      
      {/* Level 5: Subject */}
      {['SUBJECT'].includes(level) && (
        <div>
          <label className="block text-sm font-medium mb-1">Select Subject *</label>
          <select
            value={selectedSubjectId}
            onChange={handleSubjectChange}
            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-primary"
            disabled={!selectedSemesterId || subLoading}
            required
          >
            <option value="">{subLoading ? 'Loading...' : !selectedSemesterId ? 'Please select semester first' : 'Select a subject'}</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
