import { FileText, X } from "lucide-react";

type Student = {
  id: number;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  department: string;
  course: string;
  cgpa: string;
  graduationYear: string;
  skills: string;
  resume: string;
  backlogs: string;
  placementStatus: string;
  is_active: boolean;
};

type StudentProfileProps = {
  student: Student | null;
  onClose: () => void;
};

export default function StudentProfile({
  student,
  onClose,
}: StudentProfileProps) {
  if (!student) {
    return null;
  }

  const handleResumeView = () => {
    if (!student.resume) {
      return;
    }

    const newWindow = window.open();

    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>${student.name} - Resume</title>
          </head>
          <body style="margin:0">
            <iframe
              src="${student.resume}"
              style="width:100%;height:100vh;border:none"
            ></iframe>
          </body>
        </html>
      `);

      newWindow.document.close();
    }
  };

  return (
    <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#0B1F3A]">
          Student Profile
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-700"
        >
          <X className="h-4 w-4" />
          Close
        </button>
      </div>

      {/* Student Details */}
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <p>
          <strong>Student ID:</strong>{" "}
          {student.studentId}
        </p>

        <p>
          <strong>Name:</strong>{" "}
          {student.name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {student.email}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {student.phone || "-"}
        </p>

        <p>
          <strong>Department:</strong>{" "}
          {student.department || "-"}
        </p>

        <p>
          <strong>Course:</strong>{" "}
          {student.course || "-"}
        </p>

        <p>
          <strong>CGPA:</strong>{" "}
          {student.cgpa || "-"}
        </p>

        <p>
          <strong>Graduation:</strong>{" "}
          {student.graduationYear || "-"}
        </p>

        <p>
          <strong>Skills:</strong>{" "}
          {student.skills || "-"}
        </p>

        <p>
          <strong>Backlogs:</strong>{" "}
          {student.backlogs || "0"}
        </p>

        <p>
          <strong>Placement Status:</strong>{" "}
          {student.placementStatus}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {student.is_active
            ? "Active"
            : "Inactive"}
        </p>
      </div>

      {/* Resume */}
      <div className="mt-5 border-t pt-5">
        <p className="mb-2 font-semibold text-[#0B1F3A]">
          Resume
        </p>

        {student.resume ? (
          <button
            type="button"
            onClick={handleResumeView}
            className="flex items-center gap-2 rounded-lg bg-[#0B1F3A] px-4 py-2 text-sm font-medium text-white hover:bg-[#16365f]"
          >
            <FileText className="h-4 w-4" />
            View Resume
          </button>
        ) : (
          <p className="text-sm text-slate-500">
            No resume uploaded
          </p>
        )}
      </div>
    </div>
  );
}