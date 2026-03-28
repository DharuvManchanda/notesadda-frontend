import { Upload } from 'lucide-react';

interface FormData {
  title: string;
  description: string;
  tags: string;
}

interface NoteDetailsStepProps {
  formData: FormData;
  file: File | null;
  onFormDataChange: (data: FormData) => void;
  onFileChange: (file: File | null) => void;
}

export function NoteDetailsStep({ formData, file, onFormDataChange, onFileChange }: NoteDetailsStepProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onFileChange(selectedFile);
      e.target.value = '';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-8 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Note Details</h2>

      <TextField
        label="Title"
        value={formData.title}
        onChange={(value) => onFormDataChange({ ...formData, title: value })}
        placeholder="e.g., Chapter 5 Lecture Notes"
        required
      />

      <TextAreaField
        label="Description"
        value={formData.description}
        onChange={(value) => onFormDataChange({ ...formData, description: value })}
        placeholder="Describe the contents of your notes..."
        rows={5}
        required
      />

      <TextField
        label="Tags (Optional)"
        value={formData.tags}
        onChange={(value) => onFormDataChange({ ...formData, tags: value })}
        placeholder="e.g., important, exam-prep, formula-sheet"
      />

      <FileUploadField label="PDF File" file={file} onChange={handleFileChange} required />
    </div>
  );
}

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
}

function TextField({ label, value, onChange, placeholder, required }: TextFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rows: number;
  required?: boolean;
}

function TextAreaField({ label, value, onChange, placeholder, rows, required }: TextAreaFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

interface FileUploadFieldProps {
  label: string;
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

function FileUploadField({ label, file, onChange, required }: FileUploadFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
        <input
          type="file"
          accept="application/pdf,.pdf"
          onChange={onChange}
          className="hidden"
          id="file-input"
        />
        <label htmlFor="file-input" className="cursor-pointer">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
          <p className="font-medium">{file ? file.name : 'Click to upload or drag and drop'}</p>
          <p className="text-sm text-muted-foreground">PDF only, maximum size 10MB</p>
        </label>
      </div>
    </div>
  );
}
