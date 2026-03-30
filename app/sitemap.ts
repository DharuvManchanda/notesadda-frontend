import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://notespitara.com';
const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://api.notespitara.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/explore`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/upload`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  try {
    // Dynamic fetching for Universities
    const universitiesResponse = await fetch(`${API_URL}/api/universities?size=100`, { cache: 'no-store' });
    const universitiesData = await universitiesResponse.json();
    const universities = universitiesData.data?.content || [];

    const universityPages = universities.map((uni: any) => ({
      url: `${BASE_URL}/university/${uni.slug}`,
      lastModified: new Date(uni.updatedAt || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // For programs, subjects, and notes, since we might have many,
    // we could fetch them here if the API allows.
    // For now, let's include the top subjects and notes if possible.
    
    // Top Notes fetching
    // const notesResponse = await fetch(`${API_URL}/api/notes?size=100`, { cache: 'no-store' });
    // const notesData = await notesResponse.json();
    // const notes = notesData.data?.content || [];

    // const notePages = notes.map((note: any) => ({
    //   url: `${BASE_URL}/university/${note.subject?.semester?.branch?.program?.university?.slug}/${note.subject?.semester?.branch?.program?.slug}/${note.subject?.semester?.branch?.slug}/semester-${note.subject?.semester?.number}/${note.subject?.slug}/${note.slug}`,
    //   lastModified: new Date(note.updatedAt || new Date()),
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.6,
    // }));

    return [...staticPages, ...universityPages];
  } catch (error) {
    console.error('Error fetching data for sitemap:', error);
    return staticPages;
  }
}
