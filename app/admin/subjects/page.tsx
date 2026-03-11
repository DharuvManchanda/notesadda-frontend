'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { SubjectForm } from '@/components/admin/forms/SubjectForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { PageLoader } from '@/components/ui/PageLoader';
import { notespitaraApi } from '@/store/services/notespitara';
import { GetSubjectsResponse, GetAllSemestersResponse, Subject, Semester } from '@/components/types/types';

export default function SubjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any>(null);

  const { data: subjectsData, isLoading: isSubjectsLoading, refetch: refetchSubjects } = notespitaraApi.useGetSubjectsQuery({ page: 0, size: 20 });
  const { data: semestersData, isLoading: isSemestersLoading } = notespitaraApi.useGetAllSemestersQuery({ page: 0, size: 100 });

  const typedSubData = subjectsData as any;
  const typedSemData = semestersData as any;

  const subjects: Subject[] = Array.isArray(typedSubData) ? typedSubData : typedSubData?.data?.subjects?.content || typedSubData?.data?.content || typedSubData?.content || [];
  const semesters: Semester[] = Array.isArray(typedSemData) ? typedSemData : typedSemData?.data?.semesters?.content || typedSemData?.data?.content || typedSemData?.content || [];

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSuccess = () => {
    refetchSubjects();
  };

  if (isSubjectsLoading || isSemestersLoading) {
    return (
      <AdminLayout>
        <PageLoader />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminHeader
          title="Subjects"
          description="Manage academic subjects"
          searchPlaceholder="Search subjects..."
          onSearch={setSearchTerm}
          onAdd={() => {
            setEditingSubject(null);
            setOpenDialog(true);
          }}
          addButtonLabel="Add Subject"
        />

        <div className="px-6">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Code</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Semester</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Credits</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Notes</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubjects.map((subject) => (
                  <tr key={subject.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-3 text-sm text-foreground font-medium">{subject.name}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">
                      <Badge variant="outline">{subject.code}</Badge>
                    </td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{subject.semester?.number ? `Semester ${subject.semester.number}` : subject.semesterName}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">
                      <Badge>{subject.credits}</Badge>
                    </td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">
                      {/* Removed notes badge if count is not returned directly */}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => console.log('View', subject.id)}
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingSubject({
                              id: subject.id,
                              name: subject.name,
                              code: subject.code,
                              credits: subject.credits?.toString(),
                              semesterId: subject.semester?.id || subject.semesterId,
                              description: '',
                              syllabusUrl: subject.syllabusUrl || '',
                            });
                            setOpenDialog(true);
                          }}
                          title="Edit subject"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          onClick={() => console.log('Delete', subject.id)}
                          title="Delete subject"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredSubjects.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                No subjects found
              </div>
            )}
          </div>
        </div>
      </div>

      <SubjectForm
        open={openDialog}
        onOpenChange={(open) => {
          setOpenDialog(open);
          if (!open) setEditingSubject(null);
        }}
        onSuccess={handleAddSuccess}
        initialData={editingSubject}
      />
    </AdminLayout>
  );
}
