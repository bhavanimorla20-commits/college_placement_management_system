import { Eye, EyeOff } from "lucide-react";

type StudentFormProps = {
  editingStudentId: number | null;

  studentName: string;
  setStudentName: (value: string) => void;

  studentId: string;
  setStudentId: (value: string) => void;

  studentEmail: string;
  setStudentEmail: (value: string) => void;

  studentPhone: string;
  setStudentPhone: (value: string) => void;

  studentPassword: string;
  setStudentPassword: (value: string) => void;

  department: string;
  setDepartment: (value: string) => void;

  course: string;
  setCourse: (value: string) => void;

  cgpa: string;
  setCgpa: (value: string) => void;

  graduationYear: string;
  setGraduationYear: (value: string) => void;

  skills: string;
  setSkills: (value: string) => void;

  resumeFileName: string;

  backlogs: string;
  setBacklogs: (value: string) => void;

  placementStatus: string;
  setPlacementStatus: (value: string) => void;

  formMessage: string;

  showPassword: boolean;
  setShowPassword: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  handleResumeUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;

  handleStudentSubmit: (
    e: React.FormEvent<HTMLFormElement>,
  ) => void;

  onClose: () => void;
};

export default function StudentForm({
  editingStudentId,

  studentName,
  setStudentName,

  studentId,
  setStudentId,

  studentEmail,
  setStudentEmail,

  studentPhone,
  setStudentPhone,

  studentPassword,
  setStudentPassword,

  department,
  setDepartment,

  course,
  setCourse,

  cgpa,
  setCgpa,

  graduationYear,
  setGraduationYear,

  skills,
  setSkills,

  resumeFileName,

  backlogs,
  setBacklogs,

  placementStatus,
  setPlacementStatus,

  formMessage,

  showPassword,
  setShowPassword,

  handleResumeUpload,
  handleStudentSubmit,

  onClose,
}: StudentFormProps) {
  return (
    <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#0B1F3A]">
          {editingStudentId !== null
            ? "Edit Student"
            : "Add Student"}
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="text-sm font-medium text-red-500 hover:text-red-700"
        >
          Close
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleStudentSubmit}
        className="grid gap-4 md:grid-cols-2"
      >
        {/* Full Name */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#0B1F3A]">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter full name"
            value={studentName}
            onChange={(e) =>
              setStudentName(e.target.value)
            }
            className="w-full rounded-lg border p-3 outline-none focus:border-[#F97316]"
            required
          />
        </div>

        {/* Student ID */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#0B1F3A]">
            Student ID
          </label>

          <input
            type="text"
            placeholder="Enter student ID"
            value={studentId}
            onChange={(e) =>
              setStudentId(e.target.value)
            }
            className="w-full rounded-lg border p-3 outline-none focus:border-[#F97316]"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#0B1F3A]">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter email"
            value={studentEmail}
            onChange={(e) =>
              setStudentEmail(e.target.value)
            }
            className="w-full rounded-lg border p-3 outline-none focus:border-[#F97316]"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#0B1F3A]">
            Phone number
          </label>

          <input
            type="tel"
            placeholder="Enter phone number"
            value={studentPhone}
            onChange={(e) =>
              setStudentPhone(e.target.value)
            }
            className="w-full rounded-lg border p-3 outline-none focus:border-[#F97316]"
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#0B1F3A]">
            Password
          </label>

          <div className="relative">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Create password"
              value={studentPassword}
              onChange={(e) =>
                setStudentPassword(
                  e.target.value,
                )
              }
              className="w-full rounded-lg border p-3 pr-12 outline-none focus:border-[#F97316]"
              required={
                editingStudentId === null
              }
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (previous) => !previous,
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#0B1F3A]"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Department */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#0B1F3A]">
            Department
          </label>

          <input
            type="text"
            placeholder="e.g. CSE"
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
            className="w-full rounded-lg border p-3 outline-none focus:border-[#F97316]"
          />
        </div>

        {/* Course */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#0B1F3A]">
            Course
          </label>

          <input
            type="text"
            placeholder="e.g. B.Tech"
            value={course}
            onChange={(e) =>
              setCourse(e.target.value)
            }
            className="w-full rounded-lg border p-3 outline-none focus:border-[#F97316]"
          />
        </div>

        {/* CGPA */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#0B1F3A]">
            CGPA
          </label>

          <input
            type="number"
            step="0.01"
            min="5"
            max="10"
            placeholder="e.g. 8.5"
            value={cgpa}
            onChange={(e) =>
              setCgpa(e.target.value)
            }
            className="w-full rounded-lg border p-3 outline-none focus:border-[#F97316]"
          />
        </div>

        {/* Graduation Year */}
        
<div>
  <label className="mb-1 block text-sm font-medium text-[#0B1F3A]">
    Graduation Year
  </label>

  <input
    type="number"
    min="2020"
    max="2035"
    step="1"
    placeholder="e.g. 2026"
    value={graduationYear}
    onChange={(e) =>
      setGraduationYear(e.target.value)
    }
    className="w-full rounded-lg border p-3 outline-none focus:border-[#F97316]"
  />
</div>
        {/* Skills */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#0B1F3A]">
            Skills
          </label>

          <input
            type="text"
            placeholder="React, Python, SQL"
            value={skills}
            onChange={(e) =>
              setSkills(e.target.value)
            }
            className="w-full rounded-lg border p-3 outline-none focus:border-[#F97316]"
          />
        </div>

        {/* Resume PDF */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#0B1F3A]">
            Resume (PDF)
          </label>

          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleResumeUpload}
            className="w-full rounded-lg border bg-white p-3 outline-none focus:border-[#F97316]"
          />

          {resumeFileName && (
            <p className="mt-2 text-sm text-slate-500">
              Selected file:{" "}
              <span className="font-medium">
                {resumeFileName}
              </span>
            </p>
          )}
        </div>

        {/* Backlogs */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#0B1F3A]">
            Backlogs
          </label>

          <input
            type="number"
            min="0"
            placeholder="0"
            value={backlogs}
            onChange={(e) =>
              setBacklogs(e.target.value)
            }
            className="w-full rounded-lg border p-3 outline-none focus:border-[#F97316]"
          />
        </div>

        {/* Placement Status */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#0B1F3A]">
            Placement Status
          </label>

          <select
            value={placementStatus}
            onChange={(e) =>
              setPlacementStatus(
                e.target.value,
              )
            }
            className="w-full rounded-lg border bg-white p-3 outline-none focus:border-[#F97316]"
          >
            <option value="Not Placed">
              Not Placed
            </option>

            <option value="Shortlisted">
              Shortlisted
            </option>

            <option value="Selected">
              Selected
            </option>
          </select>
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="rounded-lg bg-[#F97316] px-6 py-3 font-semibold text-white hover:bg-[#EA580C]"
          >
            {editingStudentId !== null
              ? "Update Student"
              : "Create Student"}
          </button>
        </div>
      </form>

      {/* Message */}
      {formMessage && (
        <p
          className={`mt-4 text-sm font-medium ${
            formMessage.includes(
              "successfully",
            )
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {formMessage}
        </p>
      )}
    </div>
  );
}