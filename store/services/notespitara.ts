import { emptyApi as api } from "./emptyApi";
export const addTagTypes = [
  "Universities",
  "Subjects",
  "Semesters",
  "Programs",
  "Notes",
  "Branches",
  "Authentication",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      updateUniversity: build.mutation<
        UpdateUniversityApiResponse,
        UpdateUniversityApiArg
      >({
        query: (queryArg) => ({
          url: `/api/universities/${encodeURIComponent(String(queryArg.id))}`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Universities"],
      }),
      deleteUniversity: build.mutation<
        DeleteUniversityApiResponse,
        DeleteUniversityApiArg
      >({
        query: (queryArg) => ({
          url: `/api/universities/${encodeURIComponent(String(queryArg.id))}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Universities"],
      }),
      getSubjectById: build.query<
        GetSubjectByIdApiResponse,
        GetSubjectByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/subjects/${encodeURIComponent(String(queryArg.id))}`,
        }),
        providesTags: ["Subjects"],
      }),
      updateSubject: build.mutation<
        UpdateSubjectApiResponse,
        UpdateSubjectApiArg
      >({
        query: (queryArg) => ({
          url: `/api/subjects/${encodeURIComponent(String(queryArg.id))}`,
          method: "PUT",
          body: queryArg.subjectCreateRequest,
        }),
        invalidatesTags: ["Subjects"],
      }),
      deleteSubject: build.mutation<
        DeleteSubjectApiResponse,
        DeleteSubjectApiArg
      >({
        query: (queryArg) => ({
          url: `/api/subjects/${encodeURIComponent(String(queryArg.id))}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Subjects"],
      }),
      updateSemester: build.mutation<
        UpdateSemesterApiResponse,
        UpdateSemesterApiArg
      >({
        query: (queryArg) => ({
          url: `/api/semesters/${encodeURIComponent(String(queryArg.id))}`,
          method: "PUT",
          body: queryArg.semesterCreateRequest,
        }),
        invalidatesTags: ["Semesters"],
      }),
      deleteSemester: build.mutation<
        DeleteSemesterApiResponse,
        DeleteSemesterApiArg
      >({
        query: (queryArg) => ({
          url: `/api/semesters/${encodeURIComponent(String(queryArg.id))}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Semesters"],
      }),
      getProgramById: build.query<
        GetProgramByIdApiResponse,
        GetProgramByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/programs/${encodeURIComponent(String(queryArg.id))}`,
        }),
        providesTags: ["Programs"],
      }),
      updateProgram: build.mutation<
        UpdateProgramApiResponse,
        UpdateProgramApiArg
      >({
        query: (queryArg) => ({
          url: `/api/programs/${encodeURIComponent(String(queryArg.id))}`,
          method: "PUT",
          body: queryArg.programCreateRequest,
        }),
        invalidatesTags: ["Programs"],
      }),
      deleteProgram: build.mutation<
        DeleteProgramApiResponse,
        DeleteProgramApiArg
      >({
        query: (queryArg) => ({
          url: `/api/programs/${encodeURIComponent(String(queryArg.id))}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Programs"],
      }),
      updateNotes: build.mutation<UpdateNotesApiResponse, UpdateNotesApiArg>({
        query: (queryArg) => ({
          url: `/api/notes/${encodeURIComponent(String(queryArg.id))}`,
          method: "PUT",
          body: queryArg.notesCreateRequest,
        }),
        invalidatesTags: ["Notes"],
      }),
      deleteNotes: build.mutation<DeleteNotesApiResponse, DeleteNotesApiArg>({
        query: (queryArg) => ({
          url: `/api/notes/${encodeURIComponent(String(queryArg.id))}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Notes"],
      }),
      rejectNotes: build.mutation<RejectNotesApiResponse, RejectNotesApiArg>({
        query: (queryArg) => ({
          url: `/api/notes/${encodeURIComponent(String(queryArg.id))}/reject`,
          method: "PUT",
          params: {
            rejectionNote:
              queryArg.rejectionNote != null
                ? encodeURIComponent(String(queryArg.rejectionNote))
                : undefined,
          },
        }),
        invalidatesTags: ["Notes"],
      }),
      approveNotes: build.mutation<ApproveNotesApiResponse, ApproveNotesApiArg>(
        {
          query: (queryArg) => ({
            url: `/api/notes/${encodeURIComponent(String(queryArg.id))}/approve`,
            method: "PUT",
          }),
          invalidatesTags: ["Notes"],
        },
      ),
      getBranchById: build.query<GetBranchByIdApiResponse, GetBranchByIdApiArg>(
        {
          query: (queryArg) => ({
            url: `/api/branches/${encodeURIComponent(String(queryArg.id))}`,
          }),
          providesTags: ["Branches"],
        },
      ),
      updateBranch: build.mutation<UpdateBranchApiResponse, UpdateBranchApiArg>(
        {
          query: (queryArg) => ({
            url: `/api/branches/${encodeURIComponent(String(queryArg.id))}`,
            method: "PUT",
            body: queryArg.branchCreateRequest,
          }),
          invalidatesTags: ["Branches"],
        },
      ),
      deleteBranch: build.mutation<DeleteBranchApiResponse, DeleteBranchApiArg>(
        {
          query: (queryArg) => ({
            url: `/api/branches/${encodeURIComponent(String(queryArg.id))}`,
            method: "DELETE",
          }),
          invalidatesTags: ["Branches"],
        },
      ),
      getAllUniversities: build.query<
        GetAllUniversitiesApiResponse,
        GetAllUniversitiesApiArg
      >({
        query: (queryArg) => ({
          url: `/api/universities`,
          params: {
            page:
              queryArg.page != null
                ? encodeURIComponent(String(queryArg.page))
                : undefined,
            size:
              queryArg.size != null
                ? encodeURIComponent(String(queryArg.size))
                : undefined,
          },
        }),
        providesTags: ["Universities"],
      }),
      createUniversity: build.mutation<
        CreateUniversityApiResponse,
        CreateUniversityApiArg
      >({
        query: (queryArg) => ({
          url: `/api/universities`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Universities"],
      }),
      getSubjects: build.query<GetSubjectsApiResponse, GetSubjectsApiArg>({
        query: (queryArg) => ({
          url: `/api/subjects`,
          params: {
            page:
              queryArg.page != null
                ? encodeURIComponent(String(queryArg.page))
                : undefined,
            size:
              queryArg.size != null
                ? encodeURIComponent(String(queryArg.size))
                : undefined,
          },
        }),
        providesTags: ["Subjects"],
      }),
      createSubject: build.mutation<
        CreateSubjectApiResponse,
        CreateSubjectApiArg
      >({
        query: (queryArg) => ({
          url: `/api/subjects`,
          method: "POST",
          body: queryArg.subjectCreateRequest,
        }),
        invalidatesTags: ["Subjects"],
      }),
      getAllSemesters: build.query<
        GetAllSemestersApiResponse,
        GetAllSemestersApiArg
      >({
        query: (queryArg) => ({
          url: `/api/semesters`,
          params: {
            page:
              queryArg.page != null
                ? encodeURIComponent(String(queryArg.page))
                : undefined,
            size:
              queryArg.size != null
                ? encodeURIComponent(String(queryArg.size))
                : undefined,
          },
        }),
        providesTags: ["Semesters"],
      }),
      createSemester: build.mutation<
        CreateSemesterApiResponse,
        CreateSemesterApiArg
      >({
        query: (queryArg) => ({
          url: `/api/semesters`,
          method: "POST",
          body: queryArg.semesterCreateRequest,
        }),
        invalidatesTags: ["Semesters"],
      }),
      getAllPrograms: build.query<
        GetAllProgramsApiResponse,
        GetAllProgramsApiArg
      >({
        query: (queryArg) => ({
          url: `/api/programs`,
          params: {
            page:
              queryArg.page != null
                ? encodeURIComponent(String(queryArg.page))
                : undefined,
            size:
              queryArg.size != null
                ? encodeURIComponent(String(queryArg.size))
                : undefined,
          },
        }),
        providesTags: ["Programs"],
      }),
      createProgram: build.mutation<
        CreateProgramApiResponse,
        CreateProgramApiArg
      >({
        query: (queryArg) => ({
          url: `/api/programs`,
          method: "POST",
          body: queryArg.programCreateRequest,
        }),
        invalidatesTags: ["Programs"],
      }),
      uploadPdf: build.mutation<UploadPdfApiResponse, UploadPdfApiArg>({
        query: (queryArg) => ({
          url: `/api/notes/upload`,
          method: "POST",
          body: queryArg.body,
          params: {
            title:
              queryArg.title != null
                ? encodeURIComponent(String(queryArg.title))
                : undefined,
            description:
              queryArg.description != null
                ? encodeURIComponent(String(queryArg.description))
                : undefined,
            subjectId:
              queryArg.subjectId != null
                ? encodeURIComponent(String(queryArg.subjectId))
                : undefined,
          },
        }),
        invalidatesTags: ["Notes"],
      }),
      getAllBranches: build.query<
        GetAllBranchesApiResponse,
        GetAllBranchesApiArg
      >({
        query: (queryArg) => ({
          url: `/api/branches`,
          params: {
            page:
              queryArg.page != null
                ? encodeURIComponent(String(queryArg.page))
                : undefined,
            size:
              queryArg.size != null
                ? encodeURIComponent(String(queryArg.size))
                : undefined,
          },
        }),
        providesTags: ["Branches"],
      }),
      createBranch: build.mutation<CreateBranchApiResponse, CreateBranchApiArg>(
        {
          query: (queryArg) => ({
            url: `/api/branches`,
            method: "POST",
            body: queryArg.branchCreateRequest,
          }),
          invalidatesTags: ["Branches"],
        },
      ),
      verifyEmailOtp: build.mutation<
        VerifyEmailOtpApiResponse,
        VerifyEmailOtpApiArg
      >({
        query: (queryArg) => ({
          url: `/api/auth/verify-email-otp`,
          method: "POST",
          body: queryArg.verifyEmailOtpRequest,
        }),
        invalidatesTags: ["Authentication"],
      }),
      registerUser: build.mutation<RegisterUserApiResponse, RegisterUserApiArg>(
        {
          query: (queryArg) => ({
            url: `/api/auth/signup`,
            method: "POST",
            body: queryArg.signupRequest,
          }),
          invalidatesTags: ["Authentication"],
        },
      ),
      signoutUser: build.mutation<SignoutUserApiResponse, SignoutUserApiArg>({
        query: () => ({ url: `/api/auth/signout`, method: "POST" }),
        invalidatesTags: ["Authentication"],
      }),
      authenticateUser: build.mutation<
        AuthenticateUserApiResponse,
        AuthenticateUserApiArg
      >({
        query: (queryArg) => ({
          url: `/api/auth/signin`,
          method: "POST",
          body: queryArg.loginRequest,
        }),
        invalidatesTags: ["Authentication"],
      }),
      resetPassword: build.mutation<
        ResetPasswordApiResponse,
        ResetPasswordApiArg
      >({
        query: (queryArg) => ({
          url: `/api/auth/reset-password`,
          method: "POST",
          body: queryArg.resetPasswordRequest,
        }),
        invalidatesTags: ["Authentication"],
      }),
      resendEmailOtp: build.mutation<
        ResendEmailOtpApiResponse,
        ResendEmailOtpApiArg
      >({
        query: (queryArg) => ({
          url: `/api/auth/resend-email-otp`,
          method: "POST",
          body: queryArg.resendEmailOtpRequest,
        }),
        invalidatesTags: ["Authentication"],
      }),
      forgotPassword: build.mutation<
        ForgotPasswordApiResponse,
        ForgotPasswordApiArg
      >({
        query: (queryArg) => ({
          url: `/api/auth/forgot-password`,
          method: "POST",
          body: queryArg.forgotPasswordRequest,
        }),
        invalidatesTags: ["Authentication"],
      }),
      getProgramsByUniversity: build.query<
        GetProgramsByUniversityApiResponse,
        GetProgramsByUniversityApiArg
      >({
        query: (queryArg) => ({
          url: `/api/universities/${encodeURIComponent(String(queryArg.id))}/programs`,
          params: {
            page:
              queryArg.page != null
                ? encodeURIComponent(String(queryArg.page))
                : undefined,
            size:
              queryArg.size != null
                ? encodeURIComponent(String(queryArg.size))
                : undefined,
          },
        }),
        providesTags: ["Universities"],
      }),
      getUniversityBySlug: build.query<
        GetUniversityBySlugApiResponse,
        GetUniversityBySlugApiArg
      >({
        query: (queryArg) => ({
          url: `/api/universities/slug/${encodeURIComponent(String(queryArg.slug))}`,
        }),
        providesTags: ["Universities"],
      }),
      getNotesBySubject: build.query<
        GetNotesBySubjectApiResponse,
        GetNotesBySubjectApiArg
      >({
        query: (queryArg) => ({
          url: `/api/subjects/${encodeURIComponent(String(queryArg.id))}/notes`,
          params: {
            page:
              queryArg.page != null
                ? encodeURIComponent(String(queryArg.page))
                : undefined,
            size:
              queryArg.size != null
                ? encodeURIComponent(String(queryArg.size))
                : undefined,
          },
        }),
        providesTags: ["Subjects"],
      }),
      getSubjectBySlug: build.query<
        GetSubjectBySlugApiResponse,
        GetSubjectBySlugApiArg
      >({
        query: (queryArg) => ({
          url: `/api/subjects/slug/${encodeURIComponent(String(queryArg.slug))}`,
        }),
        providesTags: ["Subjects"],
      }),
      getSubjectsBySemester: build.query<
        GetSubjectsBySemesterApiResponse,
        GetSubjectsBySemesterApiArg
      >({
        query: (queryArg) => ({
          url: `/api/semesters/${encodeURIComponent(String(queryArg.id))}/subjects`,
          params: {
            page:
              queryArg.page != null
                ? encodeURIComponent(String(queryArg.page))
                : undefined,
            size:
              queryArg.size != null
                ? encodeURIComponent(String(queryArg.size))
                : undefined,
          },
        }),
        providesTags: ["Semesters"],
      }),
      getBranchesByProgram: build.query<
        GetBranchesByProgramApiResponse,
        GetBranchesByProgramApiArg
      >({
        query: (queryArg) => ({
          url: `/api/programs/${encodeURIComponent(String(queryArg.id))}/branches`,
          params: {
            page:
              queryArg.page != null
                ? encodeURIComponent(String(queryArg.page))
                : undefined,
            size:
              queryArg.size != null
                ? encodeURIComponent(String(queryArg.size))
                : undefined,
          },
        }),
        providesTags: ["Programs"],
      }),
      getProgramBySlug: build.query<
        GetProgramBySlugApiResponse,
        GetProgramBySlugApiArg
      >({
        query: (queryArg) => ({
          url: `/api/programs/slug/${encodeURIComponent(String(queryArg.slug))}`,
        }),
        providesTags: ["Programs"],
      }),
      getAllNotes: build.query<GetAllNotesApiResponse, GetAllNotesApiArg>({
        query: (queryArg) => ({
          url: `/api/notes`,
          params: {
            q:
              queryArg.q != null
                ? encodeURIComponent(String(queryArg.q))
                : undefined,
            query:
              queryArg.query != null
                ? encodeURIComponent(String(queryArg.query))
                : undefined,
            page:
              queryArg.page != null
                ? encodeURIComponent(String(queryArg.page))
                : undefined,
            size:
              queryArg.size != null
                ? encodeURIComponent(String(queryArg.size))
                : undefined,
          },
        }),
        providesTags: ["Notes"],
      }),
      getDownloadLink: build.query<
        GetDownloadLinkApiResponse,
        GetDownloadLinkApiArg
      >({
        query: (queryArg) => ({
          url: `/api/notes/${encodeURIComponent(String(queryArg.id))}/download`,
        }),
        providesTags: ["Notes"],
      }),
      getNotesBySlug: build.query<
        GetNotesBySlugApiResponse,
        GetNotesBySlugApiArg
      >({
        query: (queryArg) => ({
          url: `/api/notes/slug/${encodeURIComponent(String(queryArg.slug))}`,
        }),
        providesTags: ["Notes"],
      }),
      searchNotes: build.query<SearchNotesApiResponse, SearchNotesApiArg>({
        query: (queryArg) => ({
          url: `/api/notes/search`,
          params: {
            q:
              queryArg.q != null
                ? encodeURIComponent(String(queryArg.q))
                : undefined,
            query:
              queryArg.query != null
                ? encodeURIComponent(String(queryArg.query))
                : undefined,
            page:
              queryArg.page != null
                ? encodeURIComponent(String(queryArg.page))
                : undefined,
            size:
              queryArg.size != null
                ? encodeURIComponent(String(queryArg.size))
                : undefined,
          },
        }),
        providesTags: ["Notes"],
      }),
      getSemestersByBranch: build.query<
        GetSemestersByBranchApiResponse,
        GetSemestersByBranchApiArg
      >({
        query: (queryArg) => ({
          url: `/api/branches/${encodeURIComponent(String(queryArg.id))}/semesters`,
          params: {
            page:
              queryArg.page != null
                ? encodeURIComponent(String(queryArg.page))
                : undefined,
            size:
              queryArg.size != null
                ? encodeURIComponent(String(queryArg.size))
                : undefined,
          },
        }),
        providesTags: ["Branches"],
      }),
      getBranchBySlug: build.query<
        GetBranchBySlugApiResponse,
        GetBranchBySlugApiArg
      >({
        query: (queryArg) => ({
          url: `/api/branches/slug/${encodeURIComponent(String(queryArg.slug))}`,
        }),
        providesTags: ["Branches"],
      }),
      getAllUsers: build.query<GetAllUsersApiResponse, GetAllUsersApiArg>({
        query: (queryArg) => ({
          url: `/api/auth/users`,
          params: {
            page:
              queryArg.page != null
                ? encodeURIComponent(String(queryArg.page))
                : undefined,
            size:
              queryArg.size != null
                ? encodeURIComponent(String(queryArg.size))
                : undefined,
          },
        }),
        providesTags: ["Authentication"],
      }),
      currentUserName: build.query<
        CurrentUserNameApiResponse,
        CurrentUserNameApiArg
      >({
        query: () => ({ url: `/api/auth/username` }),
        providesTags: ["Authentication"],
      }),
      getUserDetails: build.query<
        GetUserDetailsApiResponse,
        GetUserDetailsApiArg
      >({
        query: () => ({ url: `/api/auth/user` }),
        providesTags: ["Authentication"],
      }),
      getSignupStatus: build.query<
        GetSignupStatusApiResponse,
        GetSignupStatusApiArg
      >({
        query: (queryArg) => ({
          url: `/api/auth/signup-status`,
          params: {
            email:
              queryArg.email != null
                ? encodeURIComponent(String(queryArg.email))
                : undefined,
          },
        }),
        providesTags: ["Authentication"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as notespitaraApi };
export type UpdateUniversityApiResponse = /** status 200 OK */ object;
export type UpdateUniversityApiArg = {
  id: string;
  body: {
    data: UniversityCreateRequest;
    logo?: Blob;
  };
};
export type DeleteUniversityApiResponse = /** status 200 OK */ object;
export type DeleteUniversityApiArg = {
  id: string;
};
export type GetSubjectByIdApiResponse = /** status 200 OK */ object;
export type GetSubjectByIdApiArg = {
  id: string;
};
export type UpdateSubjectApiResponse = /** status 200 OK */ object;
export type UpdateSubjectApiArg = {
  id: string;
  subjectCreateRequest: SubjectCreateRequest;
};
export type DeleteSubjectApiResponse = /** status 200 OK */ object;
export type DeleteSubjectApiArg = {
  id: string;
};
export type UpdateSemesterApiResponse = /** status 200 OK */ object;
export type UpdateSemesterApiArg = {
  id: string;
  semesterCreateRequest: SemesterCreateRequest;
};
export type DeleteSemesterApiResponse = /** status 200 OK */ object;
export type DeleteSemesterApiArg = {
  id: string;
};
export type GetProgramByIdApiResponse = /** status 200 OK */ object;
export type GetProgramByIdApiArg = {
  id: string;
};
export type UpdateProgramApiResponse = /** status 200 OK */ object;
export type UpdateProgramApiArg = {
  id: string;
  programCreateRequest: ProgramCreateRequest;
};
export type DeleteProgramApiResponse = /** status 200 OK */ object;
export type DeleteProgramApiArg = {
  id: string;
};
export type UpdateNotesApiResponse = /** status 200 OK */ object;
export type UpdateNotesApiArg = {
  id: string;
  notesCreateRequest: NotesCreateRequest;
};
export type DeleteNotesApiResponse = /** status 200 OK */ object;
export type DeleteNotesApiArg = {
  id: string;
};
export type RejectNotesApiResponse = /** status 200 OK */ object;
export type RejectNotesApiArg = {
  id: string;
  rejectionNote?: string;
};
export type ApproveNotesApiResponse = /** status 200 OK */ object;
export type ApproveNotesApiArg = {
  id: string;
};
export type GetBranchByIdApiResponse = /** status 200 OK */ object;
export type GetBranchByIdApiArg = {
  id: string;
};
export type UpdateBranchApiResponse = /** status 200 OK */ object;
export type UpdateBranchApiArg = {
  id: string;
  branchCreateRequest: BranchCreateRequest;
};
export type DeleteBranchApiResponse = /** status 200 OK */ object;
export type DeleteBranchApiArg = {
  id: string;
};
export type GetAllUniversitiesApiResponse = /** status 200 OK */ object;
export type GetAllUniversitiesApiArg = {
  page?: number;
  size?: number;
};
export type CreateUniversityApiResponse = /** status 200 OK */ object;
export type CreateUniversityApiArg = {
  body: {
    data: UniversityCreateRequest;
    logo?: Blob;
  };
};
export type GetSubjectsApiResponse = /** status 200 OK */ object;
export type GetSubjectsApiArg = {
  page?: number;
  size?: number;
};
export type CreateSubjectApiResponse = /** status 200 OK */ object;
export type CreateSubjectApiArg = {
  subjectCreateRequest: SubjectCreateRequest;
};
export type GetAllSemestersApiResponse = /** status 200 OK */ object;
export type GetAllSemestersApiArg = {
  page?: number;
  size?: number;
};
export type CreateSemesterApiResponse = /** status 200 OK */ object;
export type CreateSemesterApiArg = {
  semesterCreateRequest: SemesterCreateRequest;
};
export type GetAllProgramsApiResponse = /** status 200 OK */ object;
export type GetAllProgramsApiArg = {
  page?: number;
  size?: number;
};
export type CreateProgramApiResponse = /** status 200 OK */ object;
export type CreateProgramApiArg = {
  programCreateRequest: ProgramCreateRequest;
};
export type UploadPdfApiResponse = /** status 200 OK */ object;
export type UploadPdfApiArg = {
  title: string;
  description?: string;
  subjectId: string;
  body: {
    file: Blob;
  };
};
export type GetAllBranchesApiResponse = /** status 200 OK */ object;
export type GetAllBranchesApiArg = {
  page?: number;
  size?: number;
};
export type CreateBranchApiResponse = /** status 200 OK */ object;
export type CreateBranchApiArg = {
  branchCreateRequest: BranchCreateRequest;
};
export type VerifyEmailOtpApiResponse = /** status 200 OK */ object;
export type VerifyEmailOtpApiArg = {
  verifyEmailOtpRequest: VerifyEmailOtpRequest;
};
export type RegisterUserApiResponse = /** status 200 OK */ object;
export type RegisterUserApiArg = {
  signupRequest: SignupRequest;
};
export type SignoutUserApiResponse = /** status 200 OK */ object;
export type SignoutUserApiArg = void;
export type AuthenticateUserApiResponse = /** status 200 OK */ object;
export type AuthenticateUserApiArg = {
  loginRequest: LoginRequest;
};
export type ResetPasswordApiResponse = /** status 200 OK */ object;
export type ResetPasswordApiArg = {
  resetPasswordRequest: ResetPasswordRequest;
};
export type ResendEmailOtpApiResponse = /** status 200 OK */ object;
export type ResendEmailOtpApiArg = {
  resendEmailOtpRequest: ResendEmailOtpRequest;
};
export type ForgotPasswordApiResponse = /** status 200 OK */ object;
export type ForgotPasswordApiArg = {
  forgotPasswordRequest: ForgotPasswordRequest;
};
export type GetProgramsByUniversityApiResponse = /** status 200 OK */ object;
export type GetProgramsByUniversityApiArg = {
  id: string;
  page?: number;
  size?: number;
};
export type GetUniversityBySlugApiResponse = /** status 200 OK */ object;
export type GetUniversityBySlugApiArg = {
  slug: string;
};
export type GetNotesBySubjectApiResponse = /** status 200 OK */ object;
export type GetNotesBySubjectApiArg = {
  id: string;
  page?: number;
  size?: number;
};
export type GetSubjectBySlugApiResponse = /** status 200 OK */ object;
export type GetSubjectBySlugApiArg = {
  slug: string;
};
export type GetSubjectsBySemesterApiResponse = /** status 200 OK */ object;
export type GetSubjectsBySemesterApiArg = {
  id: string;
  page?: number;
  size?: number;
};
export type GetBranchesByProgramApiResponse = /** status 200 OK */ object;
export type GetBranchesByProgramApiArg = {
  id: string;
  page?: number;
  size?: number;
};
export type GetProgramBySlugApiResponse = /** status 200 OK */ object;
export type GetProgramBySlugApiArg = {
  slug: string;
};
export type GetAllNotesApiResponse = /** status 200 OK */ object;
export type GetAllNotesApiArg = {
  q?: string;
  query?: string;
  page?: number;
  size?: number;
};
export type GetDownloadLinkApiResponse = /** status 200 OK */ object;
export type GetDownloadLinkApiArg = {
  id: string;
};
export type GetNotesBySlugApiResponse = /** status 200 OK */ object;
export type GetNotesBySlugApiArg = {
  slug: string;
};
export type SearchNotesApiResponse = /** status 200 OK */ object;
export type SearchNotesApiArg = {
  q?: string;
  query?: string;
  page?: number;
  size?: number;
};
export type GetSemestersByBranchApiResponse = /** status 200 OK */ object;
export type GetSemestersByBranchApiArg = {
  id: string;
  page?: number;
  size?: number;
};
export type GetBranchBySlugApiResponse = /** status 200 OK */ object;
export type GetBranchBySlugApiArg = {
  slug: string;
};
export type GetAllUsersApiResponse = /** status 200 OK */ object;
export type GetAllUsersApiArg = {
  page?: number;
  size?: number;
};
export type CurrentUserNameApiResponse = /** status 200 OK */ string;
export type CurrentUserNameApiArg = void;
export type GetUserDetailsApiResponse = /** status 200 OK */ object;
export type GetUserDetailsApiArg = void;
export type GetSignupStatusApiResponse =
  /** status 200 OK */ SignupStatusResponse;
export type GetSignupStatusApiArg = {
  email: string;
};
export type UniversityCreateRequest = {
  name: string;
  code: string;
  description?: string;
  city?: string;
  state?: string;
  logoUrl?: string;
};
export type SubjectCreateRequest = {
  name: string;
  code: string;
  description?: string;
  semesterId: string;
};
export type SemesterCreateRequest = {
  number: number;
  branchId: string;
};
export type ProgramCreateRequest = {
  name: string;
  description?: string;
  type: string;
  duration: number;
  universityId: string;
};
export type NotesCreateRequest = {
  title: string;
  description?: string;
  fileUrl: string;
  fileKey: string;
  fileType: string;
  subjectId: string;
};
export type BranchCreateRequest = {
  name: string;
  code: string;
  description?: string;
  programId: string;
};
export type VerifyEmailOtpRequest = {
  email: string;
  otp: string;
};
export type SignupRequest = {
  username: string;
  email: string;
  role?: string[];
  password: string;
};
export type LoginRequest = {
  username: string;
  password: string;
};
export type ResetPasswordRequest = {
  token: string;
  newPassword: string;
};
export type ResendEmailOtpRequest = {
  email: string;
};
export type ForgotPasswordRequest = {
  email: string;
};
export type SignupStatusResponse = {
  status?: string;
  otpExpiresInSeconds?: number;
  resendCooldownSeconds?: number;
};
