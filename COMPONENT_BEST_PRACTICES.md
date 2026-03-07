# Component Refactoring & Best Practices Guide

## Overview
This document outlines the component architecture and best practices used throughout NotesPitara to ensure reusability, maintainability, and clean code.

## Upload Page Refactoring Example

### Before: Monolithic Component
The original upload page contained all logic, state, and UI in a single 400+ line component. This violated the Single Responsibility Principle and made the component difficult to test and reuse.

### After: Modular Components
The upload page is now split into focused, reusable components:

```
app/upload/page.tsx (Main page - orchestrates components)
├── components/upload/UploadStepIndicator.tsx
├── components/upload/ErrorAlert.tsx
├── components/upload/AcademicSelectionStep.tsx
├── components/upload/NoteDetailsStep.tsx
├── components/upload/ReviewStep.tsx
├── components/upload/UploadSuccessScreen.tsx
└── components/upload/UploadNavigationButtons.tsx
```

## Key Principles

### 1. Single Responsibility
Each component handles ONE concern:
- `UploadStepIndicator`: Only displays progress steps
- `ErrorAlert`: Only renders error messages
- `AcademicSelectionStep`: Only handles academic hierarchy selection
- `NoteDetailsStep`: Only handles note metadata and file upload

### 2. Props Over Logic
Components receive props instead of managing complex logic:
```tsx
// ❌ Bad: Component manages its own logic
<NoteDetailsStep userId={userId} />

// ✅ Good: Page manages state, component renders
<NoteDetailsStep
  formData={formData}
  file={file}
  onFormDataChange={setFormData}
  onFileChange={setFile}
/>
```

### 3. Reusability
Components are designed to be used in multiple contexts:
- `ErrorAlert` can be used on any form
- `ReviewStep` works with any review data structure
- `UploadStepIndicator` works with any step flow

### 4. Type Safety
All props are properly typed with TypeScript interfaces:
```tsx
interface NoteDetailsStepProps {
  formData: FormData;
  file: File | null;
  onFormDataChange: (data: FormData) => void;
  onFileChange: (file: File | null) => void;
}
```

## Page Structure

### Pages are Orchestrators
Pages (in `/app`) should:
- Manage state and complex logic
- Validate data
- Call child components with proper props
- NOT contain repetitive JSX

```tsx
// ✅ Good: Page orchestrates components
export default function UploadPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({...});
  
  return (
    <>
      <ErrorAlert message={error} />
      <AcademicSelectionStep {...props} />
      <NoteDetailsStep {...props} />
      <UploadNavigationButtons {...props} />
    </>
  );
}
```

### Components are Presentational
Components (in `/components`) should:
- Be stateless when possible
- Accept all data via props
- Call callbacks for changes
- NOT fetch data or manage complex state

```tsx
// ✅ Good: Component is presentational
export function NoteDetailsStep({ 
  formData, 
  file, 
  onFormDataChange, 
  onFileChange 
}) {
  return (
    <div>
      <input 
        value={formData.title}
        onChange={e => onFormDataChange({...formData, title: e.target.value})}
      />
    </div>
  );
}
```

## Callback Pattern

Use callback props for events:
```tsx
// ✅ Good: Callbacks for changes
<AcademicSelectionStep
  onUniversityChange={setSelectedUniversity}
  onProgramChange={setSelectedProgram}
  onBranchChange={setSelectedBranch}
/>

// Page handles validation and state updates
const handleNext = () => {
  if (validateStep(currentStep)) {
    setCurrentStep(currentStep + 1);
  }
};
```

## File Organization

```
components/
├── shared/              # Layout & common components
│   ├── Container.tsx
│   ├── Section.tsx
│   └── Breadcrumb.tsx
├── cards/               # Reusable card components
│   ├── NoteCard.tsx
│   ├── SubjectCard.tsx
│   └── UniversityCard.tsx
├── admin/               # Admin-specific components
│   ├── AdminLayout.tsx
│   ├── AdminTable.tsx
│   └── StatCard.tsx
└── upload/              # Upload flow components
    ├── UploadStepIndicator.tsx
    ├── ErrorAlert.tsx
    ├── AcademicSelectionStep.tsx
    ├── NoteDetailsStep.tsx
    ├── ReviewStep.tsx
    ├── UploadSuccessScreen.tsx
    └── UploadNavigationButtons.tsx
```

## Do's and Don'ts

### Do:
- ✅ Keep components under 150 lines
- ✅ Extract repeated patterns into components
- ✅ Use TypeScript interfaces for props
- ✅ Pass data via props, not context (unless global)
- ✅ Use callbacks for user interactions
- ✅ Document prop interfaces

### Don't:
- ❌ Mix business logic with UI rendering
- ❌ Create wrapper components that don't add value
- ❌ Use `any` types
- ❌ Create deeply nested component trees
- ❌ Fetch data inside presentational components
- ❌ Store UI state in database/backend state

## When to Extract a Component

Extract a component when it:
1. Is used in multiple places
2. Has its own state and logic
3. Can be understood independently
4. Is more than 100 lines of code
5. Becomes harder to name (signals unclear responsibility)

## Testing Implications

Components designed this way are easier to test:
```tsx
// Easy to test - all props provided
<NoteDetailsStep
  formData={mockFormData}
  file={mockFile}
  onFormDataChange={jest.fn()}
  onFileChange={jest.fn()}
/>
```

## Migration Path

For existing components, follow this pattern:
1. Identify page-level state management
2. Extract presentational components
3. Pass state as props
4. Use callbacks for updates
5. Remove component-level state (except UI state like open/close)

## Further Reading
- React Docs: Thinking in React (https://react.dev/learn/thinking-in-react)
- Single Responsibility Principle: https://en.wikipedia.org/wiki/Single-responsibility_principle
