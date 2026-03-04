'use client';

import { Suspense } from 'react';
import { UniversityCard } from '@/components/cards/UniversityCard';
import { Pagination } from '@/components/shared/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { universities } from '@/lib/mockData';

const UNIVERSITIES_PER_PAGE = 6;

function UniversitiesListInner() {
    const { currentPage, totalPages, paginatedItems, setPage } = usePagination(universities, UNIVERSITIES_PER_PAGE);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedItems.map((university) => (
                    <UniversityCard key={university.id} university={university} />
                ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
        </>
    );
}

export function UniversitiesList() {
    return (
        <Suspense fallback={<div className="text-center py-8 text-muted-foreground">Loading universities...</div>}>
            <UniversitiesListInner />
        </Suspense>
    );
}
