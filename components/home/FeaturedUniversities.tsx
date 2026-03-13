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

  const universitiesResponse = (data as any).data.universities;
  const featuredUniversities = universitiesResponse.content;
  const hasMoreUniversities = universitiesResponse.totalElements > 3;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {featuredUniversities.map((uni: any) => (
          <UniversityCard key={uni.id} university={uni} />
        ))}
      </div>

      {hasMoreUniversities && (
        <div className="text-center">
          <a href="/explore">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
              View All Universities
            </button>
          </a>
        </div>
      )}
    </div>
  );
}
