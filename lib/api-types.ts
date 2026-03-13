export interface ApiResponse<T> {
  message?: string;
  status?: boolean;
  data?: T;
}

export interface PaginatedData<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface UserSummary {
  id: string;
  name?: string;
  email?: string;
  uploadedNotesCount?: number;
}

export interface UniversitySummary {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  city?: string | null;
  state?: string | null;
  programsCountTotal?: number;
}

export interface SubjectSummary {
  id: string;
  slug: string;
  name: string;
  code?: string;
  description?: string | null;
  notesCountTotal?: number;
}

export interface NoteSummary {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  fileType?: string | null;
  fileSize?: string | null;
  createdAt?: string | null;
  subjectName?: string | null;
  subjectSlug?: string | null;
  universitySlug?: string | null;
  programSlug?: string | null;
  branchSlug?: string | null;
  semesterNumber?: number | string | null;
  uploaderName?: string | null;
  uploaderEmail?: string | null;
  uploaderTotalNotes?: number | null;
  user?: UserSummary | null;
  uploadedBy?: UserSummary | null;
}

export interface DownloadLinkPayload {
  downloadUrl?: string;
}

export interface UniversitiesPayload {
  universities: PaginatedData<UniversitySummary>;
}

export interface NotesPayload {
  notes: PaginatedData<NoteSummary>;
}
