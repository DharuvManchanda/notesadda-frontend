'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { universities } from '@/lib/mockData';
import { UploadStepIndicator } from '@/components/upload/UploadStepIndicator';
import { ErrorAlert } from '@/components/upload/ErrorAlert';
import { AcademicSelectionStep } from '@/components/upload/AcademicSelectionStep';
import { NoteDetailsStep } from '@/components/upload/NoteDetailsStep';
import { ReviewStep } from '@/components/upload/ReviewStep';
import { UploadSuccessScreen } from '@/components/upload/UploadSuccessScreen';
import { UploadNavigationButtons } from '@/components/upload/UploadNavigationButtons';

const STEPS = [
  { number: 1, label: 'Select Course' },
  { number: 2, label: 'Note Details' },
  { number: 3, label: 'Review' },
];

const TOTAL_STEPS = 4; // including success screen

export default function UploadPage() {
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

  const university = universities.find((u) => u.id === selectedUniversity);
  const program = university?.programs.find((p) => p.id === selectedProgram);
  const branch = program?.branches.find((b) => b.id === selectedBranch);
  const semester = branch?.semesters.find((s) => s.number === parseInt(selectedSemester));
  const subject = semester?.subjects.find((s) => s.id === selectedSubject);

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
      if (file.type !== 'application/pdf') {
        setError('Only PDF files are allowed');
        return false;
      }
      if (file.size > 50 * 1024 * 1024) {
        setError('File size must be less than 50MB');
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

  const handleSubmit = () => {
    console.log('Submitting note:', {
      university: selectedUniversity,
      program: selectedProgram,
      branch: selectedBranch,
      semester: selectedSemester,
      subject: selectedSubject,
      ...formData,
      file: file?.name,
    });
    setCurrentStep(4);
  };

  const reviewItems = [
    { label: 'University', value: university?.name || 'N/A' },
    { label: 'Program', value: program?.name || 'N/A' },
    { label: 'Branch', value: branch?.name || 'N/A' },
    { label: 'Semester', value: `Semester ${selectedSemester}` },
    { label: 'Subject', value: subject?.name || 'N/A' },
    { label: 'Title', value: formData.title },
    { label: 'Description', value: formData.description },
    { label: 'File', value: file?.name || 'N/A' },
  ];

  return (
    <>
      <Header />
      <main>
        <Section className="pt-8 md:pt-12 lg:pt-16 pb-12 md:pb-16 lg:pb-20">
          <Container>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Upload Notes' }]} />

            <div className="max-w-2xl mx-auto mt-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Upload Your Notes</h1>
                <p className="text-lg text-muted-foreground">Share your study materials with the community</p>
              </div>

              <UploadStepIndicator currentStep={currentStep} steps={STEPS} />
              <ErrorAlert message={error} />

              {currentStep === 1 && (
                <AcademicSelectionStep
                  universities={universities}
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

              {currentStep === 4 && <UploadSuccessScreen onReturn={() => (window.location.href = '/')} />}

              <UploadNavigationButtons
                currentStep={currentStep}
                totalSteps={TOTAL_STEPS}
                onBack={handleBack}
                onNext={handleNext}
                onSubmit={handleSubmit}
                isLastStep={currentStep === TOTAL_STEPS}
              />
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
