# Hybrid Routing Model for Notes - StudyHub

## Overview

StudyHub implements a professional hybrid routing model for notes that provides both stability and SEO strength through dual URLs pointing to the same content.

## Route Structure

### Primary Route (Canonical/Stable)
```
/note/[noteId]
```
- **Purpose**: Stable, permanent URL for direct note access
- **Format**: Short and simple
- **Example**: `/note/note-subject-cs101-1-1`
- **Usage**: Direct sharing, bookmarks, canonical link
- **Benefits**: 
  - Stable even if hierarchical structure changes
  - Fast lookups by ID
  - Handles broken hierarchies gracefully

### SEO Route (Readable/Contextual)
```
/university/[universitySlug]/[programSlug]/[branchSlug]/semester-[number]/[subjectSlug]/[noteSlug]
```
- **Purpose**: SEO-friendly, readable URL with full context
- **Format**: Shows complete hierarchy for understanding and sharing
- **Example**: `/university/stanford-university/bachelor-of-technology/computer-science/semester-1/data-structures/lecture-notes-part-1`
- **Usage**: Social sharing, marketing, breadcrumb navigation
- **Benefits**:
  - Excellent for SEO with all context in URL
  - User-friendly and readable
  - Shows complete academic hierarchy
  - Better for link sharing and discoverability

## How It Works

### URL Generation
Both routes render the same content and components. The routing decision is made in the `NoteCard` component:

```typescript
const href =
  universitySlug &&
  programSlug &&
  branchSlug &&
  semesterNumber &&
  subjectSlug
    ? `/university/${universitySlug}/${programSlug}/${branchSlug}/semester-${semesterNumber}/${subjectSlug}/${note.slug}`
    : `/note/${note.id}`;
```

### Canonical Link
The SEO route includes a canonical link pointing to the primary route in its metadata:

```typescript
alternates: {
  canonical: `/note/${note.id}`,
}
```

This ensures search engines treat the SEO route as an alias of the canonical route, preventing duplicate content issues.

### Static Generation
Both routes are pre-generated at build time using `generateStaticParams()`:

**Primary Route** (`/app/note/[noteId]/page.tsx`):
- Generates params for all note IDs
- Creates `/note/[noteId]` pages

**SEO Route** (`/app/university/.../[noteSlug]/page.tsx`):
- Generates full hierarchical params
- Creates `/university/.../[noteSlug]` pages
- Both routes share the same component logic

## Data Structure Changes

### New Fields Added

#### Note Type
```typescript
interface Note {
  id: string;
  slug: string;  // NEW: URL-friendly slug like "lecture-notes-part-1"
  title: string;
  // ... rest of fields
}
```

#### Subject Type
```typescript
interface Subject {
  id: string;
  slug: string;  // NEW: URL-friendly slug like "data-structures"
  name: string;
  // ... rest of fields
}
```

## Helper Functions

Located in `/lib/mockData.ts`:

### getNoteById(noteId: string)
Retrieves a note by its ID (for primary route)

### getNoteBySlug(subject: Subject, noteSlug: string)
Retrieves a note by its slug within a subject

### getNotePathInfo(noteId: string)
Returns full hierarchical path info for a note:
```typescript
{
  universitySlug: string;
  programSlug: string;
  branchSlug: string;
  semesterNumber: number;
  subjectSlug: string;
  noteSlug: string;
}
```

### getSubjectBySlug(branch: Branch, semesterNumber: number, subjectSlug: string)
Retrieves a subject by its slug (updated to use slug instead of ID matching)

## Component Updates

### NoteCard
Now accepts optional context props to determine which route to use:

```typescript
interface NoteCardProps {
  note: Note;
  universitySlug?: string;
  programSlug?: string;
  branchSlug?: string;
  semesterNumber?: number;
  subjectSlug?: string;
}
```

When all context props are provided, it links to the SEO route. Otherwise, it links to the canonical ID route.

## SEO Benefits

1. **Keyword Optimization**: URLs contain actual subject and note names
   - Example: `data-structures` and `lecture-notes-part-1` in URL
   
2. **Semantic Hierarchy**: Full academic path shows relevance
   - University → Program → Branch → Semester → Subject → Note

3. **User Experience**: Readable URLs that indicate content context
   - User can understand page hierarchy without loading it

4. **Link Strength**: Multiple URLs can naturally link to the same content
   - Aggregator sites can use SEO URL
   - Direct sharing can use canonical URL

5. **Canonical Tags**: Prevents duplicate content penalties
   - Search engines recognize SEO URL as alias of canonical

## Implementation Details

### URL Slug Generation
Slugs are generated using the `createSlug` helper function:
```typescript
const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
};
```

Example conversions:
- "Lecture Notes" → "lecture-notes"
- "Data Structures" → "data-structures"
- "Computer Science" → "computer-science"

### Dynamic Route Matching
The SEO route uses dynamic segments that match Next.js conventions:
- `[universitySlug]`, `[programSlug]`, `[branchSlug]` - standard dynamic segments
- `semester-[number]` - literal prefix with dynamic number
- `[subjectSlug]`, `[noteSlug]` - standard dynamic segments

This creates URLs like:
```
/university/stanford-university/bachelor-of-technology/computer-science/semester-1/data-structures/lecture-notes-part-1
```

## Benefits of This Approach

### For Users
- Readable, shareable URLs
- Clear hierarchy in the address bar
- Works with or without context
- Bookmarkable both ways

### For Developers
- Stable primary route won't break
- Multiple views of same content
- Easy to generate breadcrumbs
- Type-safe with full TypeScript support

### For SEO
- Keyword-rich URLs
- Semantic structure shown
- No duplicate content penalties
- Better crawlability

### For Scalability
- Easy to add metadata to hierarchy
- Can track engagement on both routes
- Flexible for future features
- Handles note duplication across subjects

## Future Enhancements

1. **Analytics**: Track which URL users prefer
2. **Redirects**: Auto-redirect old URLs if hierarchy changes
3. **Aliases**: Support alternative subject slugs
4. **Search**: Index both URL versions for better results
5. **Sharing**: Intelligent URL selection based on context
