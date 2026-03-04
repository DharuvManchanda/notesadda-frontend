export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  uploadedNotesCount: number;
}

export interface Note {
  id: string;
  slug: string;
  title: string;
  description: string;
  fileType: 'pdf' | 'doc' | 'docx' | 'jpg' | 'png';
  uploadedBy: User;
  uploadedAt: Date;
  downloads: number;
  rating: number;
  fileSize: string;
  subjectId: string;
}

export interface Subject {
  id: string;
  slug: string;
  name: string;
  code: string;
  description: string;
  totalNotes: number;
  notes: Note[];
  semesterId: string;
}

export interface Semester {
  id: string;
  number: number;
  totalSubjects: number;
  totalNotes: number;
  subjects: Subject[];
  branchId: string;
}

export interface Branch {
  id: string;
  slug: string;
  name: string;
  description: string;
  totalSemesters: number;
  totalNotes: number;
  semesters: Semester[];
  programId: string;
}

export interface Program {
  id: string;
  slug: string;
  name: string;
  description: string;
  duration: string;
  totalBranches: number;
  totalNotes: number;
  branches: Branch[];
  universityId: string;
}

export interface University {
  id: string;
  slug: string;
  name: string;
  location: string;
  description: string;
  foundedYear: number;
  totalPrograms: number;
  totalNotes: number;
  logo: string;
  programs: Program[];
}
