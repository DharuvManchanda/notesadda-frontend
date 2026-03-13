'use client';

import { useState } from 'react';
import { UploadStepIndicator } from '@/components/upload/UploadStepIndicator';
import { ErrorAlert } from '@/components/upload/ErrorAlert';
import { AcademicSelectionStep } from '@/components/upload/AcademicSelectionStep';
import { NoteDetailsStep } from '@/components/upload/NoteDetailsStep';
import { ReviewStep } from '@/components/upload/ReviewStep';
import { UploadSuccessScreen } from '@/components/upload/UploadSuccessScreen';
import { UploadNavigationButtons } from '@/components/upload/UploadNavigationButtons';
import { notespitaraApi } from '@/store/services/notespitara';

const STEPS = [
  { number: 1, label: 'Select Course' },
  { number: 2, label: 'Note Details' },
  { number: 3, label: 'Review' },
];

const TOTAL_STEPS = 4;
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

interface UploadNoteWizardProps {
  heading?: string;
  subtitle?: string;
  successReturnLabel?: string;
  onSuccessReturn: () => void;
  onUploadSuccess?: () => void;
  className?: string;
}

export function UploadNoteWizard({
  heading = 'Upload Your Notes',
  subtitle = 'Share your study materials with the community',
  successReturnLabel,
  onSuccessReturn,
  onUploadSuccess,
  className,
}: UploadNoteWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [uploadPdf, { isLoading: isUploading }] = notespitaraApi.useUploadPdfMutation();

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!selectedUniversity || !selectedProgram || !selectedBranch || !selectedSemester || !selectedSubject) {
        setError('Please select all fields');
        return false;
      }
    } else if (step === 2) {
      if (!file) {
        setError('Please upload a PDF file');
        return false;
      }

      const isPdfFile =
        file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

      if (!isPdfFile) {
        setError('Only PDF files are allowed');
        return false;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        setError('File size must be 10MB or less');
        return false;
      }

      if (!formData.title || !formData.description) {
        setError('Please fill in all required fields');
        return false;
      }
    }

    setError('');
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    setError('');
  };

  const handleSubmit = async () => {
    if (!file) return;
    setError('');

    try {
      const payload = new FormData();
      payload.append('file', file);

      await uploadPdf({
        title: formData.title,
        description: formData.description || undefined,
        subjectId: selectedSubject,
        body: payload as any,
      }).unwrap();

      onUploadSuccess?.();
      setCurrentStep(4);
    } catch (err: any) {
      setError(err?.data?.message || err?.data?.error || 'Failed to upload note');
    }
  };

  const reviewItems = [
    { label: 'University ID', value: selectedUniversity || 'N/A' },
    { label: 'Program ID', value: selectedProgram || 'N/A' },
    { label: 'Branch ID', value: selectedBranch || 'N/A' },
    { label: 'Semester ID', value: selectedSemester ? `Semester ID ${selectedSemester}` : 'N/A' },
    { label: 'Subject ID', value: selectedSubject || 'N/A' },
    { label: 'Title', value: formData.title },
    { label: 'Description', value: formData.description },
    { label: 'File', value: file?.name || 'N/A' },
  ];

  return (
    <div className={className}>
      <div className="mb-8 text-center sm:mb-12">
        <h1 className="mb-4 text-3xl font-bold text-balance sm:text-4xl md:text-5xl">{heading}</h1>
        <p className="text-base text-muted-foreground sm:text-lg">{subtitle}</p>
      </div>

      <UploadStepIndicator currentStep={currentStep} steps={STEPS} />
      <ErrorAlert message={error} />

      {currentStep === 1 && (
        <AcademicSelectionStep
          selectedUniversity={selectedUniversity}
          selectedProgram={selectedProgram}
          selectedBranch={selectedBranch}
          selectedSemester={selectedSemester}
          selectedSubject={selectedSubject}
          onUniversityChange={setSelectedUniversity}
          onProgramChange={setSelectedProgram}
          onBranchChange={setSelectedBranch}
          onSemesterChange={setSelectedSemester}
          onSubjectChange={setSelectedSubject}
        />
      )}

      {currentStep === 2 && (
        <NoteDetailsStep
          formData={formData}
          file={file}
          onFormDataChange={setFormData}
          onFileChange={setFile}
        />
      )}

      {currentStep === 3 && <ReviewStep items={reviewItems} />}

      {currentStep === 4 && (
        <UploadSuccessScreen
          onReturn={onSuccessReturn}
          returnLabel={successReturnLabel}
        />
      )}

      <UploadNavigationButtons
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        onBack={handleBack}
        onNext={handleNext}
        onSubmit={handleSubmit}
        isLastStep={currentStep === TOTAL_STEPS}
        isLoading={isUploading}
      />
    </div>
  );
}
