'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export interface UsePaginationResult<T> {
    currentPage: number;
    totalPages: number;
    paginatedItems: T[];
    setPage: (page: number) => void;
}

export function usePagination<T>(items: T[], itemsPerPage: number): UsePaginationResult<T> {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentPage = useMemo(() => {
        const page = parseInt(searchParams.get('page') ?? '1', 10);
        return isNaN(page) || page < 1 ? 1 : page;
    }, [searchParams]);

    const totalPages = useMemo(() => Math.max(1, Math.ceil(items.length / itemsPerPage)), [items.length, itemsPerPage]);

    const paginatedItems = useMemo(() => {
        const safePage = Math.min(currentPage, totalPages);
        const start = (safePage - 1) * itemsPerPage;
        return items.slice(start, start + itemsPerPage);
    }, [items, currentPage, totalPages, itemsPerPage]);

    const setPage = useCallback(
        (page: number) => {
            const params = new URLSearchParams(searchParams.toString());
            if (page <= 1) {
                params.delete('page');
            } else {
                params.set('page', String(page));
            }
            const query = params.toString();
            router.push(`${pathname}${query ? `?${query}` : ''}`, { scroll: true });
        },
        [router, pathname, searchParams],
    );

    return { currentPage: Math.min(currentPage, totalPages), totalPages, paginatedItems, setPage };
}
