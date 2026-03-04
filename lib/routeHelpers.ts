import { notFound } from 'next/navigation';
import {
  getUniversityBySlug,
  getProgramBySlug,
  getBranchBySlug,
} from '@/lib/mockData';
import { University, Program, Branch, Semester, Subject } from '@/lib/types';

/**
 * Unified route resolver - finds entities and handles notFound errors
 * Prevents repeated slug lookups across all pages
 */
export interface RouteParams {
  universitySlug: string;
  programSlug: string;
  branchSlug: string;
  semesterSlug?: string;
  subjectSlug?: string;
}

export interface ResolvedRoute {
  university: University;
  program: Program;
  branch: Branch;
  semester?: Semester;
  subject?: Subject;
}

/**
 * Resolves all route parameters and returns entities
 * Throws notFound() if any entity is not found
 */
export function resolveRoute(params: Partial<RouteParams>): ResolvedRoute {
  const { universitySlug, programSlug, branchSlug, semesterSlug, subjectSlug } = params;

  if (!universitySlug) notFound();
  if (!programSlug) notFound();
  if (!branchSlug) notFound();

  const university = getUniversityBySlug(universitySlug);
  if (!university) notFound();

  const program = getProgramBySlug(university, programSlug);
  if (!program) notFound();

  const branch = getBranchBySlug(program, branchSlug);
  if (!branch) notFound();

  const resolved: ResolvedRoute = { university, program, branch };

  if (semesterSlug !== undefined && semesterSlug !== null && semesterSlug !== '') {
    const numberStr = semesterSlug.replace('semester-', '');
    const semesterNumber = parseInt(numberStr, 10);
    const semester = branch.semesters.find((s) => s.number === semesterNumber);
    if (!semester) notFound();
    resolved.semester = semester;

    // Optional: resolve subject if subjectSlug provided
    if (subjectSlug !== undefined && subjectSlug !== null && subjectSlug !== '') {
      const subject = semester.subjects.find((s) => s.slug === subjectSlug);
      if (!subject) notFound();
      resolved.subject = subject;
    }
  }

  return resolved;
}

/**
 * Generates breadcrumb items for any route level
 */
export function generateBreadcrumbs(params: Partial<RouteParams>, resolved: ResolvedRoute) {
  const { universitySlug, programSlug, branchSlug, semesterSlug, subjectSlug } = params;
  const { university, program, branch, semester, subject } = resolved;

  const items = [
    { label: 'Explore', href: '/explore' },
    { label: university.name, href: `/university/${university.slug}` },
    { label: program.name, href: `/university/${university.slug}/${program.slug}` },
    { label: branch.name, href: `/university/${university.slug}/${program.slug}/${branch.slug}` },
  ];

  if (semester) {
    items.push({
      label: `Semester ${semester.number}`,
      href: `/university/${universitySlug}/${programSlug}/${branchSlug}/semester-${semester.number}`,
    });
  }

  if (subject) {
    items.push({
      label: subject.name,
      href: `/university/${universitySlug}/${programSlug}/${branchSlug}/${semesterSlug}/${subjectSlug}`,
    });
  }

  // Last item is not a link
  if (items.length > 0) {
    const lastItem = items[items.length - 1];
    delete (lastItem as any).href;
  }

  return items;
}
