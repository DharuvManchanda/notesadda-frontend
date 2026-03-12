'use client';

import { Suspense, useState } from 'react';
import { UniversityCard } from '@/components/cards/UniversityCard';
import { Pagination } from '@/components/shared/Pagination';
import { notespitaraApi } from '@/store/services/notespitara';
import { PageLoader } from '@/components/ui/PageLoader';

const UNIVERSITIES_PER_PAGE = 6;

function UniversitiesListInner() {
    const [currentPage, setCurrentPage] = useState(1);
    
    const { data, isLoading, isError } = notespitaraApi.useGetAllUniversitiesQuery({
        page: currentPage - 1,
        size: UNIVERSITIES_PER_PAGE,
    });

    if (isLoading) {
        return <PageLoader />;
    }

    if (isError || !(data as any)?.data?.universities) {
        return <div className="text-center py-8 text-red-500">Failed to load universities.</div>;
    }

    const { content, totalPages } = (data as any).data.universities;

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.map((university: any) => (
                    <UniversityCard key={university.id} university={university} />
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={setCurrentPage} 
                />
            )}
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
