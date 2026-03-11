import { CascadingDropdowns } from '@/components/ui/CascadingDropdowns';

interface AcademicSelectionStepProps {
  selectedUniversity: string;
  selectedProgram: string;
  selectedBranch: string;
  selectedSemester: string;
  selectedSubject: string;
  onUniversityChange: (id: string) => void;
  onProgramChange: (id: string) => void;
  onBranchChange: (id: string) => void;
  onSemesterChange: (number: string) => void;
  onSubjectChange: (id: string) => void;
}

export function AcademicSelectionStep({
  selectedUniversity,
  selectedProgram,
  selectedBranch,
  selectedSemester,
  selectedSubject,
  onUniversityChange,
  onProgramChange,
  onBranchChange,
  onSemesterChange,
  onSubjectChange,
}: AcademicSelectionStepProps) {

  return (
    <div className="bg-card border border-border rounded-lg p-8 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Select Your Course</h2>

      <CascadingDropdowns
        level="SUBJECT"
        selectedUniversityId={selectedUniversity}
        selectedProgramId={selectedProgram}
        selectedBranchId={selectedBranch}
        selectedSemesterId={selectedSemester}
        selectedSubjectId={selectedSubject}
        onUniversityChange={onUniversityChange}
        onProgramChange={onProgramChange}
        onBranchChange={onBranchChange}
        onSemesterChange={onSemesterChange}
        onSubjectChange={onSubjectChange}
      />
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ id: string; name: string }>;
  placeholder: string;
}

function SelectField({ label, value, onChange, options, placeholder }: SelectFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label} <span className="text-red-600">*</span>
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
