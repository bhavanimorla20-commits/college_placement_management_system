import { useEffect, useState } from "react";

type Student = {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
  student_id?: string;
  phone?: string;
  department?: string;
  course?: string;
  cgpa?: string;
  graduation_year?: string;
  skills?: string;
  resume?: string;
  backlogs?: string;
  placement_status?: string;
};

const API_URL = "const API_URL = import.meta.env.VITE_API_URL;";

export default function StudentDashboardPage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          setError("Student login details not found.");
          setLoading(false);
          return;
        }

        const loggedInUser = JSON.parse(storedUser);

        const response = await fetch(`${API_URL}/users`);

        if (!response.ok) {
          throw new Error("Failed to fetch student details");
        }

        const users: Student[] = await response.json();

        const currentStudent = users.find(
          (user) =>
            user.id === loggedInUser.user_id &&
            user.role.toLowerCase() === "student"
        );

        if (!currentStudent) {
          setError("Student profile not found.");
          setLoading(false);
          return;
        }

        setStudent(currentStudent);
      } catch (error) {
        console.error(error);
        setError("Failed to load student profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // Open resume correctly
  const handleViewResume = async () => {
    if (!student?.resume) {
      alert("Resume not available");
      return;
    }

    try {
      const resume = student.resume;

      // If resume is already a normal URL
      if (
        resume.startsWith("http://") ||
        resume.startsWith("https://")
      ) {
        window.open(resume, "_blank");
        return;
      }

      // Convert Base64/Data URL into PDF Blob
      const response = await fetch(
        resume.startsWith("data:")
          ? resume
          : `data:application/pdf;base64,${resume}`
      );

      const blob = await response.blob();

      const pdfUrl = URL.createObjectURL(blob);

      window.open(pdfUrl, "_blank");

      // Clean the temporary URL after 1 minute
      setTimeout(() => {
        URL.revokeObjectURL(pdfUrl);
      }, 60000);
    } catch (error) {
      console.error("Failed to open resume:", error);
      alert("Unable to open resume");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">
          Loading student dashboard...
        </p>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-xl bg-white p-8 shadow">
          <p className="text-red-500">
            {error || "Student profile not found."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1F3A]">
              Student Dashboard
            </h1>

            <p className="text-sm text-slate-500">
              Welcome, {student.name}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-6">
        <div className="mb-6 rounded-xl bg-[#0B1F3A] p-6 text-white">
          <h2 className="text-2xl font-bold">
            Welcome, {student.name} 👋
          </h2>

          <p className="mt-2 text-slate-300">
            View your placement profile and account details here.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#0B1F3A]">
              My Profile
            </h2>

            <p className="text-sm text-slate-500">
              Your details added by the administrator
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <ProfileItem
              label="Full Name"
              value={student.name}
            />

            <ProfileItem
              label="Student ID"
              value={student.student_id}
            />

            <ProfileItem
              label="Email"
              value={student.email}
            />

            <ProfileItem
              label="Phone"
              value={student.phone}
            />

            <ProfileItem
              label="Department"
              value={student.department}
            />

            <ProfileItem
              label="Course"
              value={student.course}
            />

            <ProfileItem
              label="CGPA"
              value={student.cgpa}
            />

            <ProfileItem
              label="Graduation Year"
              value={student.graduation_year}
            />

            <ProfileItem
              label="Skills"
              value={student.skills}
            />

            <ProfileItem
              label="Backlogs"
              value={student.backlogs}
            />

            <ProfileItem
              label="Placement Status"
              value={student.placement_status}
            />

            <ProfileItem
              label="Account Status"
              value={
                student.is_active
                  ? "Active"
                  : "Inactive"
              }
            />
          </div>

          {/* Resume */}
          {student.resume && (
            <div className="mt-6 border-t pt-6">
              <h3 className="mb-2 font-semibold text-[#0B1F3A]">
                Resume
              </h3>

              <button
                type="button"
                onClick={handleViewResume}
                className="inline-block rounded-lg bg-[#F97316] px-4 py-2 font-semibold text-white hover:bg-[#EA580C]"
              >
                View Resume
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function ProfileItem({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-lg border bg-slate-50 p-4">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-semibold text-slate-800">
        {value || "Not provided"}
      </p>
    </div>
  );
}