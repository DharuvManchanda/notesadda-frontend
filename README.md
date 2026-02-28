# Campus Notes Platform

## Product & Frontend Requirements Document

This document outlines the proposed structure, features, and frontend requirements for a structured academic notes-sharing platform. It is intended to serve as a reference for product, design, and engineering teams. Features can later be prioritized and divided into MVP and Phase 2 implementations.

---

# 1. Vision

To build a structured academic content platform where college students can upload, search, and access notes organized according to their academic hierarchy:

```
University → College → Program → Branch → Semester → Subject → Notes
```

### Objectives

* Make academic notes easy to discover and access.
* Encourage structured peer-to-peer knowledge sharing.
* Create a scalable academic repository organized according to real university structures.
* Build a long-term academic ecosystem around structured learning resources.

---

# 2. Problem Statement

Students commonly experience:

* Notes scattered across WhatsApp groups, Google Drive links, and personal storage.
* No centralized repository structured by semester and subject.
* Difficulty finding reliable subject-specific material.
* Lack of incentives for sharing high-quality notes.
* Limited discoverability of academic content within their own college.

The platform aims to solve these issues through structured categorization and contribution incentives.

---

# 3. User Roles

## 3.1 Student (Primary User)

Capabilities:

* Browse notes by academic hierarchy.
* Search for subject-specific material.
* Upload notes (admin will review).
* Download notes.
* Rate and review notes.
* Bookmark notes for later access.
* Track upload and download activity.

## 3.2 Admin

Capabilities:

* Approve and manage universities, programs, and subjects.
* Moderate uploads.
* Remove spam or inappropriate content.
* Manage platform taxonomy and structure.

## 3.3 College Ambassador (Optional – Phase 2)

Capabilities:

* Promote the platform within specific colleges.
* Verify and curate notes.
* Manage and grow content for assigned institutions.

---

# 4. Platform Architecture – Frontend Structure

## 4.1 Public Routes

```
/
```

Landing page.

```
/explore
```

Browse all universities.

```
/university/[universitySlug]
```

List programs (and optionally colleges).

```
/university/[universitySlug]/[programSlug]
```

List branches.

```
/university/[universitySlug]/[programSlug]/[branchSlug]
```

List semesters.

```
/university/[universitySlug]/[programSlug]/[branchSlug]/semester-[number]
```

List subjects within the selected semester.

```
/university/[...fullHierarchy]/[subjectSlug]
```

Subject detail page showing all related notes.

```
/note/[noteId]
```

Note preview and detail page.

```
/search?q=...
```

Global search page with filtering.

---

## 4.2 Authentication Routes

```
/login
/register
/forgot-password
```

---

## 4.3 User Dashboard Routes

```
/dashboard
```

Sub-routes:

```
/dashboard/profile
/dashboard/uploads
/dashboard/downloads
/dashboard/bookmarks
/dashboard/settings
```

---

## 4.4 Upload Flow

```
/upload
```

Multi-step structured upload form:

1. Select University
2. Select Program
3. Select Branch
4. Select Semester
5. Select Subject
6. Upload File (PDF)
7. Add Title and Description

Validation and preview should be included before submission.

---

# 5. Frontend Requirements

## 5.1 Landing Page

Sections:

* Hero section with search and primary call-to-action.
* Explanation of how the platform works.
* Featured or top universities.
* Trending or most downloaded notes.
* Testimonials or contributor highlights.
* Clear upload call-to-action.

---

## 5.2 Navigation

### Desktop Navigation

* Explore
* Upload
* Leaderboard (if enabled)
* Search
* Login / Profile

### Mobile Navigation

* Bottom navigation for Explore, Upload, and Profile.
* Search accessible prominently.

---

## 5.3 Search System

Search should support:

* University
* Program
* Branch
* Semester
* Subject
* File type
* Most downloaded
* Most rated

Additional features:

* Autocomplete suggestions.
* Subject-based quick access.
* Debounced input for performance.

---

## 5.4 Note Card Component

Each note card should display:

* Title
* Subject
* Semester
* Uploaded by
* Download count
* Rating
* File type
* Upload date

Cards should be responsive and optimized for mobile viewing.

---

## 5.5 Note Detail Page

Features:

* PDF preview (embedded viewer).
* Download button.
* Bookmark button.
* Report functionality.
* Rating and review section.
* Related notes suggestions.
* AI-generated summary (Phase 2).

---

# 6. Core Features (MVP Scope)

## 6.1 Structured Academic Hierarchy

* University
* Program
* Branch
* Semester
* Subject

## 6.2 Notes Upload

* PDF support.
* File size validation.
* Subject tagging.
* Basic moderation workflow.

## 6.3 Download Tracking

* Track total downloads per note.
* Track user download history.

## 6.4 Rating System

* 1–5 star ratings.
* Restrict duplicate ratings per user.

## 6.5 Bookmark System

* Save notes to personal dashboard.
* Access saved notes easily.

---

# 7. Advanced Features (Phase 2 and Beyond)

## 7.1 Gamification

* Points per upload.
* Leaderboards by college or branch.
* Achievement badges.

## 7.2 AI Enhancements

* Automated note summaries.
* Extraction of important questions.
* Flashcard generation.
* Exam-oriented highlights.

## 7.3 Recommendation System

Personalized suggestions based on:

* Semester.
* Branch.
* Past downloads.
* User activity.

## 7.4 Discussion Layer

* Q&A per subject.
* Comments under notes.
* Academic discussion threads.

## 7.5 Version Management

* Updated note versions.
* Version history and revision tracking.

---

# 8. User Analytics Dashboard

Dashboard should display:

* Total uploads.
* Total downloads.
* Performance of individual notes.
* Monthly activity graph.
* Points (if gamification is enabled).

---

# 9. Security and Moderation Requirements

* File validation and scanning.
* Rate limiting uploads.
* Role-based access control.
* Content moderation tools.
* Signed or protected file URLs for downloads.

---

# 10. Monetization Possibilities

## Freemium Model

* Limited downloads for free users.
* Unlock additional downloads by contributing.

## Premium Subscription

* Unlimited downloads.
* Priority access to trending or exam-ready notes.
* Enhanced profile visibility.

## Institutional Partnerships

* Sponsored colleges.
* Verified campus programs.

---

# 11. SEO Strategy

Each structured page should generate dynamic metadata.

Example page title:

```
BTech CSE Semester 3 Data Structures Notes – XYZ University
```

SEO requirements:

* Dynamic page titles and descriptions.
* Structured URLs reflecting academic hierarchy.
* Sitemap generation.
* Server-side rendering for subject and note pages.

---

# 12. High-Level Database Entities

* User
* University
* College (optional)
* Program
* Branch
* Semester
* Subject
* Note
* Rating
* DownloadHistory
* Bookmark
* Badge (optional)

---

# 13. UI/UX Requirements

* Mobile-first design approach.
* Fast load times.
* Lazy loading for PDF previews.
* Infinite scroll or paginated note listings.
* Skeleton loaders for improved perceived performance.
* Clean academic design language.

---

# 14. Performance Requirements

* CDN for file storage.
* Pagination for note lists.
* Server-side caching of subject pages.
* Debounced search queries.
* Optimized image and PDF rendering.

---

# 15. Growth Strategy

* Campus ambassador programs.
* Referral incentives.
* Semester-start onboarding campaigns.
* Exam-season targeted promotions.
* College-specific landing pages.

---

# 16. Suggested MVP Roadmap

### Week 1

* Database schema.
* Authentication system.
* University and hierarchy setup.

### Week 2

* Subject pages.
* Upload flow implementation.

### Week 3

* Search system.
* User dashboard.

### Week 4

* UI refinement.
* SEO implementation.
* Deployment and initial testing.

---

# 17. Future Expansion

* Previous year question papers.
* Placement preparation material.
* Internship listings.
* Study groups.
* AI-powered academic assistant.


