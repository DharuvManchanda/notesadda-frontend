'use client';

import { Suspense } from 'react';
import { NoteCard } from '@/components/cards/NoteCard';
import { Pagination } from '@/components/shared/Pagination';
import { usePagination } from '@/hooks/usePagination';

const NOTES_PER_PAGE = 9;

interface NotesListProps {
    notes: any[];
    universitySlug: string;
    programSlug: string;
    branchSlug: string;
    semesterNumber: number | string;
    subjectSlug: string;
}

function NotesListInner({
    notes,
    universitySlug,
    programSlug,
    branchSlug,
    semesterNumber,
    subjectSlug,
}: NotesListProps) {
    const { currentPage, totalPages, paginatedItems, setPage } = usePagination(notes, NOTES_PER_PAGE);

    if (notes.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No notes available for this subject yet.</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedItems.map((note) => (
                    <NoteCard
                        key={note.id}
                        note={note}
                        universitySlug={universitySlug}
                        programSlug={programSlug}
                        branchSlug={branchSlug}
                        semesterNumber={semesterNumber as any}
                        subjectSlug={subjectSlug}
                    />
                ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
        </>
    );
}

export function NotesList(props: NotesListProps) {
    return (
        <Suspense fallback={<div className="text-center py-8 text-muted-foreground">Loading notes...</div>}>
            <NotesListInner {...props} />
        </Suspense>
    );
}
