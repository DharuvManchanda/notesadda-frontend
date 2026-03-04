import { University, Program, Branch, Semester } from '@/lib/types';

interface AcademicSelectionStepProps {
  universities: University[];
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
  universities,
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
  const university = universities.find((u) => u.id === selectedUniversity);
  const program = university?.programs.find((p) => p.id === selectedProgram);
  const branch = program?.branches.find((b) => b.id === selectedBranch);
  const semester = branch?.semesters.find((s) => s.number === parseInt(selectedSemester));

  return (
    <div className="bg-card border border-border rounded-lg p-8 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Select Your Course</h2>

      <SelectField
        label="University"
        value={selectedUniversity}
        onChange={(e) => {
          onUniversityChange(e.target.value);
          onProgramChange('');
          onBranchChange('');
        }}
        options={universities.map((u) => ({ id: u.id, name: u.name }))}
        placeholder="Choose a university..."
      />

      {university && (
        <SelectField
          label="Program"
          value={selectedProgram}
          onChange={(e) => {
            onProgramChange(e.target.value);
            onBranchChange('');
          }}
          options={university.programs.map((p) => ({ id: p.id, name: p.name }))}
          placeholder="Choose a program..."
        />
      )}

      {program && (
        <SelectField
          label="Branch"
          value={selectedBranch}
          onChange={(e) => onBranchChange(e.target.value)}
          options={program.branches.map((b) => ({ id: b.id, name: b.name }))}
          placeholder="Choose a branch..."
        />
      )}

      {branch && (
        <SelectField
          label="Semester"
          value={selectedSemester}
          onChange={(e) => onSemesterChange(e.target.value)}
          options={branch.semesters.map((s) => ({ id: s.number.toString(), name: `Semester ${s.number}` }))}
          placeholder="Choose a semester..."
        />
      )}

      {semester && (
        <SelectField
          label="Subject"
          value={selectedSubject}
          onChange={(e) => onSubjectChange(e.target.value)}
          options={semester.subjects.map((s) => ({ id: s.id, name: s.name }))}
          placeholder="Choose a subject..."
        />
      )}
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
