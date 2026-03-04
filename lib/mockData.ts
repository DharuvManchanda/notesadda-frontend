import { University, Program, Branch, Semester, Subject, Note, User } from './types';

// Sample users for note uploaders
const sampleUsers: User[] = [
  {
    id: 'user1',
    name: 'Sarah Chen',
    email: 'sarah.chen@university.edu',
    avatar: '/placeholder-user.jpg',
    uploadedNotesCount: 24,
  },
  {
    id: 'user2',
    name: 'James Wilson',
    email: 'james.wilson@university.edu',
    avatar: '/placeholder-user.jpg',
    uploadedNotesCount: 18,
  },
  {
    id: 'user3',
    name: 'Maria Garcia',
    email: 'maria.garcia@university.edu',
    avatar: '/placeholder-user.jpg',
    uploadedNotesCount: 31,
  },
  {
    id: 'user4',
    name: 'Ahmed Khan',
    email: 'ahmed.khan@university.edu',
    avatar: '/placeholder-user.jpg',
    uploadedNotesCount: 15,
  },
];

// Helper function to create URL-friendly slug
export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
};

// Helper function to create notes
const createNotes = (subjectId: string, count: number): Note[] => {
  return Array.from({ length: count }, (_, i) => {
    const noteType = ['Lecture Notes', 'Study Guide', 'Summary', 'Practice Problems', 'Past Papers'][i % 5];
    const title = `${noteType} - Part ${Math.floor(i / 5) + 1}`;
    const slug = `${createSlug(noteType)}-part-${Math.floor(i / 5) + 1}`;
    
    return {
      id: `note-${subjectId}-${i + 1}`,
      slug,
      title,
      description: `Comprehensive notes covering key concepts and important topics from this subject.`,
      fileType: ['pdf', 'doc', 'docx'][i % 3] as 'pdf' | 'doc' | 'docx',
      uploadedBy: sampleUsers[i % sampleUsers.length],
      uploadedAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
      downloads: Math.floor(Math.random() * 500) + 50,
      rating: Number((Math.random() * 2 + 3).toFixed(1)),
      fileSize: `${Math.floor(Math.random() * 8) + 2}MB`,
      subjectId,
    };
  });
};

// Helper function to create subjects
const createSubjects = (semesterId: string, count: number): Subject[] => {
  const subjectNames = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'English Literature',
    'History',
    'Computer Science',
    'Economics',
    'Biology',
    'Programming',
    'Data Structures',
    'Web Development',
    'Database Systems',
  ];

  return Array.from({ length: count }, (_, i) => {
    const subjectId = `subject-${semesterId}-${i + 1}`;
    const subjectName = subjectNames[i % subjectNames.length];
    const slug = createSlug(subjectName);
    return {
      id: subjectId,
      slug,
      name: subjectName,
      code: `CS${Math.floor(i / 2) + 101}`,
      description: `An introductory course covering fundamental concepts and practical applications.`,
      totalNotes: Math.floor(Math.random() * 15) + 8,
      notes: createNotes(subjectId, Math.floor(Math.random() * 3) + 2),
      semesterId,
    };
  });
};

// Helper function to create semesters
const createSemesters = (branchId: string, count: number): Semester[] => {
  return Array.from({ length: count }, (_, i) => {
    const semesterId = `semester-${branchId}-${i + 1}`;
    const subjects = createSubjects(semesterId, Math.floor(Math.random() * 4) + 5);
    return {
      id: semesterId,
      number: i + 1,
      totalSubjects: subjects.length,
      totalNotes: subjects.reduce((sum, s) => sum + s.totalNotes, 0),
      subjects,
      branchId,
    };
  });
};

// Helper function to create branches
const createBranches = (programId: string, count: number): Branch[] => {
  const branchNames = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical'];

  return Array.from({ length: count }, (_, i) => {
    const branchId = `branch-${programId}-${i + 1}`;
    const branchName = branchNames[i % branchNames.length];
    const semesters = createSemesters(branchId, 8);
    return {
      id: branchId,
      slug: createSlug(branchName),
      name: branchName,
      description: `Specialization in ${branchName} engineering.`,
      totalSemesters: semesters.length,
      totalNotes: semesters.reduce((sum, s) => sum + s.totalNotes, 0),
      semesters,
      programId,
    };
  });
};

// Helper function to create programs
const createPrograms = (universityId: string, count: number): Program[] => {
  const programNames = ['Bachelor of Technology', 'Bachelor of Science', 'Master of Technology', 'Diploma'];

  return Array.from({ length: count }, (_, i) => {
    const programId = `program-${universityId}-${i + 1}`;
    const branches = createBranches(programId, Math.floor(Math.random() * 2) + 2);
    return {
      id: programId,
      slug: programNames[i % programNames.length].toLowerCase().replace(/\s+/g, '-'),
      name: programNames[i % programNames.length],
      description: `A comprehensive ${programNames[i % programNames.length]} program designed to equip students with industry-ready skills.`,
      duration: i % 2 === 0 ? '4 years' : '2 years',
      totalBranches: branches.length,
      totalNotes: branches.reduce((sum, b) => sum + b.totalNotes, 0),
      branches,
      universityId,
    };
  });
};

// Main universities data
export const universities: University[] = [
  {
    id: 'uni1',
    slug: 'stanford-university',
    name: 'Stanford University',
    location: 'California, USA',
    description: 'A leading research institution known for innovation and excellence in engineering, science, and technology.',
    foundedYear: 1885,
    totalPrograms: 3,
    totalNotes: 0,
    logo: '/placeholder-logo.svg',
    programs: [],
  },
  {
    id: 'uni2',
    slug: 'mit',
    name: 'Massachusetts Institute of Technology',
    location: 'Massachusetts, USA',
    description: 'The premier institution for science, engineering, and technology education and research.',
    foundedYear: 1861,
    totalPrograms: 3,
    totalNotes: 0,
    logo: '/placeholder-logo.svg',
    programs: [],
  },
  {
    id: 'uni3',
    slug: 'berkeley',
    name: 'University of California, Berkeley',
    location: 'California, USA',
    description: 'A public research university renowned for its groundbreaking research and diverse academic programs.',
    foundedYear: 1868,
    totalPrograms: 2,
    totalNotes: 0,
    logo: '/placeholder-logo.svg',
    programs: [],
  },
  {
    id: 'uni4',
    slug: 'oxford',
    name: 'University of Oxford',
    location: 'Oxford, UK',
    description: 'One of the oldest and most prestigious universities in the world, known for academic excellence.',
    foundedYear: 1096,
    totalPrograms: 2,
    totalNotes: 0,
    logo: '/placeholder-logo.svg',
    programs: [],
  },
  {
    id: 'uni5',
    slug: 'cambridge',
    name: 'University of Cambridge',
    location: 'Cambridge, UK',
    description: 'An ancient university with a rich tradition of intellectual achievement and pioneering research.',
    foundedYear: 1209,
    totalPrograms: 3,
    totalNotes: 0,
    logo: '/placeholder-logo.svg',
    programs: [],
  },
  {
    id: 'uni6',
    slug: 'iit-bombay',
    name: 'Indian Institute of Technology Bombay',
    location: 'Mumbai, India',
    description: 'A premier engineering and technology institution in India, known for world-class education.',
    foundedYear: 1958,
    totalPrograms: 2,
    totalNotes: 0,
    logo: '/placeholder-logo.svg',
    programs: [],
  },
];

// Populate programs for each university
universities.forEach((university) => {
  const programs = createPrograms(university.id, Math.floor(Math.random() * 2) + 2);
  university.programs = programs;
  university.totalPrograms = programs.length;
  university.totalNotes = programs.reduce((sum, p) => sum + p.totalNotes, 0);
});

// Export helper function to get university by slug
export const getUniversityBySlug = (slug: string): University | undefined => {
  return universities.find((uni) => uni.slug === slug);
};

// Export helper function to get program by slug within a university
export const getProgramBySlug = (university: University, slug: string): Program | undefined => {
  return university.programs.find((prog) => prog.slug === slug);
};

// Export helper function to get branch by slug within a program
export const getBranchBySlug = (program: Program, slug: string): Branch | undefined => {
  return program.branches.find((branch) => branch.slug === slug);
};

// Export helper function to get subject by slug within a branch
export const getSubjectBySlug = (branch: Branch, semesterNumber: number, subjectSlug: string): Subject | undefined => {
  const semester = branch.semesters.find((sem) => sem.number === semesterNumber);
  if (!semester) return undefined;
  return semester.subjects.find((subj) => subj.slug === subjectSlug);
};

// Export helper function to get note by ID
export const getNoteById = (noteId: string): Note | undefined => {
  for (const university of universities) {
    for (const program of university.programs) {
      for (const branch of program.branches) {
        for (const semester of branch.semesters) {
          for (const subject of semester.subjects) {
            const note = subject.notes.find((n) => n.id === noteId);
            if (note) return note;
          }
        }
      }
    }
  }
  return undefined;
};

// Export helper function to get note by slug within a subject
export const getNoteBySlug = (subject: Subject, noteSlug: string): Note | undefined => {
  return subject.notes.find((note) => note.slug === noteSlug);
};

// Export helper function to get full path info for a note
export const getNotePathInfo = (
  noteId: string
): {
  universitySlug: string;
  programSlug: string;
  branchSlug: string;
  semesterNumber: number;
  subjectSlug: string;
  noteSlug: string;
} | null => {
  for (const university of universities) {
    for (const program of university.programs) {
      for (const branch of program.branches) {
        for (const semester of branch.semesters) {
          for (const subject of semester.subjects) {
            const note = subject.notes.find((n) => n.id === noteId);
            if (note) {
              return {
                universitySlug: university.slug,
                programSlug: program.slug,
                branchSlug: branch.slug,
                semesterNumber: semester.number,
                subjectSlug: subject.slug,
                noteSlug: note.slug,
              };
            }
          }
        }
      }
    }
  }
  return null;
};

// Export all users
export { sampleUsers };
