'use client';

import { useState, useMemo } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminTable } from '@/components/admin/AdminTable';
import { Pagination } from '@/components/shared/Pagination';
import { universities } from '@/lib/mockData';

const NOTES_PER_PAGE = 20;

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'subject', label: 'Subject' },
  { key: 'uploadedBy', label: 'Uploaded By' },
  { key: 'downloads', label: 'Downloads' },
];

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const allNotes = useMemo(
    () =>
      universities.flatMap((uni) =>
        uni.programs.flatMap((prog) =>
          prog.branches.flatMap((branch) =>
            branch.semesters.flatMap((semester) =>
              semester.subjects.flatMap((subject) =>
                subject.notes.map((note) => ({
                  id: note.id,
                  title: note.title,
                  subject: subject.name,
                  uploadedBy: note.uploadedBy.name,
                  downloads: note.downloads,
                })),
              ),
            ),
          ),
        ),
      ),
    [],
  );

  const filteredNotes = useMemo(
    () => allNotes.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase())),
    [allNotes, searchTerm],
  );

  const totalPages = Math.max(1, Math.ceil(filteredNotes.length / NOTES_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedNotes = filteredNotes.slice((safePage - 1) * NOTES_PER_PAGE, safePage * NOTES_PER_PAGE);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // reset to page 1 when searching
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminHeader
          title="Notes"
          description={`Manage all uploaded notes (${filteredNotes.length} total)`}
          searchPlaceholder="Search notes..."
          onSearch={handleSearch}
          onAdd={() => console.log('Add note')}
          addButtonLabel="Add Note"
        />

        <div className="px-6 space-y-4">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <AdminTable
              columns={columns}
              data={paginatedNotes}
              onEdit={(id) => console.log('Edit', id)}
              onDelete={(id) => console.log('Delete', id)}
              onView={(id) => console.log('View', id)}
            />
          </div>

          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
