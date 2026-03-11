export type PaginatedData<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};

export type BaseApiResponse<T> = {
  message: string;
  status: boolean;
  data: T;
};

export type University = {
  id: string;
  name: string;
  slug: string;
  code: string;
  description: string | null;
  city: string | null;
  state: string | null;
  logoUrl: string | null;
  isActive: boolean;
  createdAt: string;
  programsCountTotal: number;
  programs: any[];
};

export type Program = {
  id: string;
  name: string;
  type: string;
  duration: number;
  universityId: string;
  universityName?: string;
  university?: { id: string; name: string };
};

export type Branch = {
  id: string;
  name: string;
  code: string;
  programId: string;
  programName?: string;
  program?: { id: string; name: string };
};

export type Semester = {
  id: string;
  number: number;
  branchId: string;
  branchName?: string;
  branch?: { id: string; name: string; code?: string };
};

export type Subject = {
  id: string;
  name: string;
  code: string;
  credits: number;
  semesterId: string;
  semesterName?: string;
  semester?: { id: string; number: number };
  syllabusUrl?: string;
  notes?: number;
};

export type GetAllUniversitiesResponse = BaseApiResponse<{ universities: PaginatedData<University>, programsCountTotal?: number }>;
export type GetAllProgramsResponse = BaseApiResponse<{ programs: PaginatedData<Program> }>;
export type GetAllBranchesResponse = BaseApiResponse<{ branches: PaginatedData<Branch> }>;
export type GetAllSemestersResponse = BaseApiResponse<{ semesters: PaginatedData<Semester> }>;
export type GetSubjectsResponse = BaseApiResponse<{ subjects: PaginatedData<Subject> }>;

export type GetProgramsByUniversityResponse = BaseApiResponse<{ programs: PaginatedData<Program> }>;
export type GetBranchesByProgramResponse = BaseApiResponse<{ branches: PaginatedData<Branch> }>;
export type GetSemestersByBranchResponse = BaseApiResponse<{ semesters: PaginatedData<Semester> }>;
export type GetSubjectsBySemesterResponse = BaseApiResponse<{ subjects: PaginatedData<Subject> }>;
