'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { notespitaraApi } from '@/store/services/notespitara';
import type { ApiResponse, NoteSummary, NotesPayload, PaginatedData } from '@/lib/api-types';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchBar({
  placeholder = 'Search notes, subjects, programs...',
  onSearch,
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [triggerSearch, { data, isFetching }] =
    notespitaraApi.useLazySearchNotesQuery();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.trim().length >= 3) {
      triggerSearch({ q: debouncedQuery, page: 0, size: 5 });
      setIsOpen(true);
      return;
    }

    setIsOpen(false);
  }, [debouncedQuery, triggerSearch]);

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();

    if (onSearch) {
      onSearch(query);
      setIsOpen(false);
      return;
    }

    if (query.trim().length >= 3) {
      triggerSearch({ q: query, page: 0, size: 5 });
      setIsOpen(true);
    }
  };

  const handleResultClick = (note: NoteSummary) => {
    setIsOpen(false);
    setQuery('');

    const {
      universitySlug,
      programSlug,
      branchSlug,
      semesterNumber,
      subjectSlug,
      slug,
    } = note;

    if (
      universitySlug &&
      programSlug &&
      branchSlug &&
      semesterNumber &&
      subjectSlug &&
      slug
    ) {
      router.push(
        `/university/${universitySlug}/${programSlug}/${branchSlug}/semester-${semesterNumber}/${subjectSlug}/${slug}`,
      );
      return;
    }

    console.warn('Missing nested slugs in search result.', note);
  };

  const response = data as
    | ApiResponse<PaginatedData<NoteSummary>>
    | ApiResponse<NotesPayload>
    | undefined;

  let searchResults: NoteSummary[] = [];

  if (response?.data) {
    if ('content' in response.data) {
      searchResults = response.data.content;
    } else if ('notes' in response.data) {
      searchResults = response.data.notes.content;
    }
  }

  return (
    <div ref={dropdownRef} className={cn('relative w-full max-w-md', className)}>
      <form onSubmit={handleSearch} className="flex w-full flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              if (event.target.value.trim().length < 3) {
                setIsOpen(false);
              }
            }}
            onFocus={() => {
              if (debouncedQuery.trim().length >= 3) {
                setIsOpen(true);
              }
            }}
            className="rounded-lg py-2 pl-10 pr-4"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        <Button type="submit" variant="default" className="min-h-11 w-full sm:w-auto">
          Search
        </Button>
      </form>

      {isOpen && query.trim().length >= 3 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-lg border border-border bg-popover shadow-lg">
          {isFetching ? (
            <div className="flex items-center justify-center gap-2 p-4 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Searching...</span>
            </div>
          ) : searchResults.length > 0 ? (
            <ul className="py-2">
              {searchResults.map((note) => (
                <li key={note.id}>
                  <button
                    type="button"
                    onClick={() => handleResultClick(note)}
                    className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted"
                    aria-label={`Open note ${note.title}`}
                  >
                    <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{note.title}</p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {note.subjectName || note.subjectSlug || 'Unknown subject'} •{' '}
                        {note.universitySlug
                          ? note.universitySlug.split('-').join(' ').toUpperCase()
                          : 'Unknown'}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notes found matching "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
