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
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const [uploadPdf, { isLoading: isUploading }] = notespitaraApi.useUploadPdfMutation();

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
        const msg = "File size exceeds 10MB. You can't upload files above 10MB.";
        setError(msg);
        toast({
          title: "File too large",
          description: msg,
          variant: "destructive",
        });
        setFile(null);
        return;
      }
      const isPdfFile =
        selectedFile.type === 'application/pdf' || selectedFile.name.toLowerCase().endsWith('.pdf');

      if (!isPdfFile) {
        const msg = 'Only PDF files are allowed';
        setError(msg);
        toast({
          title: "Invalid file type",
          description: msg,
          variant: "destructive",
        });
        setFile(null);
        return;
      }
    }
    setFile(selectedFile);
    setError('');
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!selectedUniversity || !selectedProgram || !selectedBranch || !selectedSemester || !selectedSubject) {
        const msg = 'Please select all fields';
        setError(msg);
        toast({
          title: "Selection required",
          description: msg,
          variant: "destructive",
        });
        return false;
      }
    } else if (step === 2) {
      if (!file) {
        if (!error) {
          const msg = "Please upload a PDF file (Maximum 10MB allowed).";
          setError(msg);
          toast({
            title: "File required",
            description: msg,
            variant: "destructive",
          });
        }
        return false;
      }

      if (!formData.title || !formData.description) {
        const msg = 'Please fill in all required fields';
        setError(msg);
        toast({
          title: "Incomplete details",
          description: msg,
          variant: "destructive",
        });
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

      toast({
        title: "Upload Successful",
        description: "Your notes have been shared with the community.",
      });
      onUploadSuccess?.();
      setCurrentStep(4);
    } catch (err: any) {
      const msg = err?.data?.message || err?.data?.error || 'Failed to upload note';
      setError(msg);
      toast({
        title: "Upload failed",
        description: msg,
        variant: "destructive",
      });
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
          onFileChange={handleFileChange}
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
