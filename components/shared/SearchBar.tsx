'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { notespitaraApi } from '@/store/services/notespitara';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchBar({ placeholder = 'Search notes, subjects, programs...', onSearch, className }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [triggerSearch, { data, isFetching }] = notespitaraApi.useLazySearchNotesQuery();

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  // Trigger search
  useEffect(() => {
    if (debouncedQuery.trim().length >= 3) {
      triggerSearch({ q: debouncedQuery, page: 0, size: 5 });
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [debouncedQuery, triggerSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
      setIsOpen(false);
    } else if (query.trim().length >= 3) {
      triggerSearch({ q: query, page: 0, size: 5 });
      setIsOpen(true);
    }
  };

  const handleResultClick = (note: any) => {
    setIsOpen(false);
    setQuery('');
    
    // Construct nested URL using backend slugs
    const { universitySlug, programSlug, branchSlug, semesterNumber, subjectSlug, slug } = note;
    
    if (universitySlug && programSlug && branchSlug && semesterNumber && subjectSlug && slug) {
      router.push(`/university/${universitySlug}/${programSlug}/${branchSlug}/semester-${semesterNumber}/${subjectSlug}/${slug}`);
    } else {
      // Fallback if missing slugs
      console.warn("Missing nested slugs in search result.", note);
    }
  };

  const searchResults = (data as any)?.data?.content || (data as any)?.data?.notes?.content || [];

  return (
    <div ref={dropdownRef} className={cn('relative w-full max-w-md', className)}>
      <form onSubmit={handleSearch} className="flex gap-2 w-full">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.trim().length < 3) setIsOpen(false);
            }}
            onFocus={() => {
              if (debouncedQuery.trim().length >= 3) setIsOpen(true);
            }}
            className="pl-10 pr-4 py-2 rounded-lg"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <Button type="submit" variant="default">
          Search
        </Button>
      </form>

      {/* Auto-complete Dropdown */}
      {isOpen && (query.trim().length >= 3) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50 max-h-80 overflow-y-auto">
          {isFetching ? (
            <div className="p-4 flex items-center justify-center text-muted-foreground gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Searching...</span>
            </div>
          ) : searchResults.length > 0 ? (
            <ul className="py-2">
              {searchResults.map((note: any) => (
                <li key={note.id}>
                  <button
                    type="button"
                    onClick={() => handleResultClick(note)}
                    className="w-full text-left px-4 py-3 hover:bg-muted transition-colors flex items-start gap-3"
                  >
                    <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{note.title}</p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {note.subjectName || note.subjectSlug} • {note.universitySlug ? note.universitySlug.split('-').join(' ').toUpperCase() : 'Unknown'}
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
