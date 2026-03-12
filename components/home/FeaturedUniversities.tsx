'use client';

import { UniversityCard } from '@/components/cards/UniversityCard';
import { notespitaraApi } from '@/store/services/notespitara';
import { Loader2 } from 'lucide-react';

export function FeaturedUniversities() {
  const { data, isLoading, isError } = notespitaraApi.useGetAllUniversitiesQuery({ page: 0, size: 3 });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !(data as any)?.data?.universities?.content) {
    return null;
  }

  const featuredUniversities = (data as any).data.universities.content;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {featuredUniversities.map((uni: any) => (
        <UniversityCard key={uni.id} university={uni} />
      ))}
    </div>
  );
}
