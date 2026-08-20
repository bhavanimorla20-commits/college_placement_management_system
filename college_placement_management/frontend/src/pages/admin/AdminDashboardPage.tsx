import { useEffect, useMemo, useState } from "react";

import AdminSidebar from "./components/AdminSidebar";
import DashboardStats from "./components/DashboardStats";
import StudentForm from "./components/StudentForm";
import StudentFilters from "./components/StudentFilters";
import StudentTable from "./components/StudentTable";
import StudentProfile from "./components/StudentProfile";
import Pagination from "./components/Pagination";

// =========================================================
// TYPES
// =========================================================

type User = {
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

// =========================================================
// API
// =========================================================

const API_URL = "http://127.0.0.1:8000";

// =========================================================
// COMPONENT
// =========================================================

export default function AdminDashboardPage() {
  // =========================================================
  // NAVIGATION
  // =========================================================

  const [activePage, setActivePage] = useState<
    "dashboard" | "students"
  >("dashboard");

  // =========================================================
  // LOADING / ERROR
  // =========================================================

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // STUDENTS
  // =========================================================

  const [students, setStudents] = useState<Student[]>([]);

  const [showAddStudent, setShowAddStudent] =
    useState(false);

  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  const [editingStudentId, setEditingStudentId] =
    useState<number | null>(null);

  // =========================================================
  // PASSWORD
  // =========================================================

  const [showPassword, setShowPassword] =
    useState(false);

  // =========================================================
  // SEARCH / FILTERS
  // =========================================================

  const [searchTerm, setSearchTerm] =
    useState("");

  const [departmentFilter, setDepartmentFilter] =
    useState("all");

  const [cgpaFilter, setCgpaFilter] =
    useState("all");

  const [graduationFilter, setGraduationFilter] =
    useState("all");

  const [placementFilter, setPlacementFilter] =
    useState("all");

  const [skillsFilter, setSkillsFilter] =
    useState("");

  // =========================================================
  // PAGINATION
  // =========================================================

  const [pageSize, setPageSize] =
    useState(10);

  const [currentPage, setCurrentPage] =
    useState(1);

  // =========================================================
  // STUDENT FORM
  // =========================================================

  const [studentName, setStudentName] =
    useState("");

  const [studentId, setStudentId] =
    useState("");

  const [studentEmail, setStudentEmail] =
    useState("");

  const [studentPhone, setStudentPhone] =
    useState("");

  const [studentPassword, setStudentPassword] =
    useState("");

  const [department, setDepartment] =
    useState("");

  const [course, setCourse] =
    useState("");

  const [cgpa, setCgpa] =
    useState("");

  const [graduationYear, setGraduationYear] =
    useState("");

  const [skills, setSkills] =
    useState("");

  // PDF resume base64
  const [resume, setResume] =
    useState("");

  const [resumeFileName, setResumeFileName] =
    useState("");

  const [backlogs, setBacklogs] =
    useState("");

  const [placementStatus, setPlacementStatus] =
    useState("Not Placed");

  const [formMessage, setFormMessage] =
    useState("");

  // =========================================================
  // FETCH STUDENTS
  // =========================================================

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/users`,
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch users",
          );
        }

        const data: User[] =
          await response.json();

        const existingStudents: Student[] =
          data
            .filter(
              (user) =>
                user.role.toLowerCase() ===
                "student",
            )
            .map((user) => ({
              id: user.id,
              studentId:
              user.student_id || `STU-${user.id}`,
              name: user.name,
              email: user.email,
              
              phone: user.phone || "",
              department: user.department || "",
              course: user.course || "",
              cgpa: user.cgpa || "",
              graduationYear: user.graduation_year || "",
              skills: user.skills || "",
              resume: user.resume || "",
              backlogs: user.backlogs || "",
              placementStatus:
              user.placement_status || "Not Placed",
              is_active:
                user.is_active,
            }));

        setStudents(existingStudents);
      } catch (err) {
        console.error(err);
        setError(
          "Failed to load students",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // =========================================================
  // DASHBOARD STATISTICS
  // =========================================================

  const totalStudents =
    students.length;

  // Static values for now
  const totalCompanies = 12;
  const activeJobs = 18;
  const totalApplications = 45;
  const shortlistedStudents = 15;
  const selectedStudents = 8;

  const placementPercentage =
    totalStudents > 0
      ? Math.round(
          (selectedStudents /
            totalStudents) *
            100,
        )
      : 0;

  // =========================================================
  // FILTER STUDENTS
  // =========================================================

  const filteredStudents = useMemo(() => {
    const search =
      searchTerm.toLowerCase().trim();

    const skillSearch =
      skillsFilter.toLowerCase().trim();

    return students.filter((student) => {
      // Search
      const matchesSearch =
        student.name
          .toLowerCase()
          .includes(search) ||
        student.email
          .toLowerCase()
          .includes(search) ||
        student.studentId
          .toLowerCase()
          .includes(search);

      // Department
      const matchesDepartment =
        departmentFilter === "all" ||
        student.department
          .toLowerCase() ===
          departmentFilter.toLowerCase();

      // CGPA
      let matchesCgpa = true;

      if (cgpaFilter === "below6") {
        matchesCgpa =
          Number(student.cgpa || 0) <
          6;
      }

      if (cgpaFilter === "6to7") {
        matchesCgpa =
          Number(student.cgpa || 0) >=
            6 &&
          Number(student.cgpa || 0) <
            7;
      }

      if (cgpaFilter === "7to8") {
        matchesCgpa =
          Number(student.cgpa || 0) >=
            7 &&
          Number(student.cgpa || 0) <
            8;
      }

      if (cgpaFilter === "above8") {
        matchesCgpa =
          Number(student.cgpa || 0) >=
          8;
      }

      // Graduation
      const matchesGraduation =
        graduationFilter === "all" ||
        student.graduationYear ===
          graduationFilter;

      // Placement
      const matchesPlacement =
        placementFilter === "all" ||
        student.placementStatus
          .toLowerCase() ===
          placementFilter.toLowerCase();

      // Skills
      const matchesSkills =
        skillSearch === "" ||
        student.skills
          .toLowerCase()
          .includes(skillSearch);

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesCgpa &&
        matchesGraduation &&
        matchesPlacement &&
        matchesSkills
      );
    });
  }, [
    students,
    searchTerm,
    departmentFilter,
    cgpaFilter,
    graduationFilter,
    placementFilter,
    skillsFilter,
  ]);

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredStudents.length /
        pageSize,
    ),
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const paginatedStudents =
    filteredStudents.slice(
      (safeCurrentPage - 1) *
        pageSize,
      safeCurrentPage * pageSize,
    );

  // =========================================================
  // RESET FORM
  // =========================================================

  const resetStudentForm = () => {
    setStudentName("");
    setStudentId("");
    setStudentEmail("");
    setStudentPhone("");
    setStudentPassword("");

    setDepartment("");
    setCourse("");
    setCgpa("");
    setGraduationYear("");

    setSkills("");

    setResume("");
    setResumeFileName("");

    setBacklogs("");
    setPlacementStatus(
      "Not Placed",
    );

    setEditingStudentId(null);
    setFormMessage("");
    setShowPassword(false);
  };

  // =========================================================
  // PDF RESUME UPLOAD
  // =========================================================

  const handleResumeUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    // Only PDF
    if (
      file.type !==
      "application/pdf"
    ) {
      setFormMessage(
        "Please upload a PDF file only.",
      );

      e.target.value = "";
      return;
    }

    // 5 MB limit
    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setFormMessage(
        "Resume PDF must be less than 5 MB.",
      );

      e.target.value = "";
      return;
    }

    setResumeFileName(
      file.name,
    );

    const reader =
      new FileReader();

    reader.onload = () => {
      if (
        typeof reader.result ===
        "string"
      ) {
        setResume(
          reader.result,
        );

        setFormMessage("");
      }
    };

    reader.onerror = () => {
      setFormMessage(
        "Failed to read resume file.",
      );
    };

    reader.readAsDataURL(file);
  };

  // =========================================================
  // ADD / UPDATE STUDENT
  // =========================================================

  const handleStudentSubmit =
    async (
      e: React.FormEvent<HTMLFormElement>,
    ) => {
      e.preventDefault();

      setFormMessage("");

      if (
        !studentName.trim() ||
        !studentEmail.trim() ||
        (!studentPassword.trim() &&
          editingStudentId === null)
      ) {
        setFormMessage(
          "Name, email and password are required.",
        );

        return;
      }

      // =====================================================
      // UPDATE STUDENT
      // =====================================================

     if (editingStudentId !== null) {
  try {
    const response = await fetch(
      `${API_URL}/users/${editingStudentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: studentName,
          email: studentEmail,
          password:
            studentPassword || "unchanged",
          role: "student",
          student_id: studentId,
          phone: studentPhone,
          department,
          course,
          cgpa,
          graduation_year: graduationYear,
          skills,
          resume,
          backlogs,
          placement_status: placementStatus,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      setFormMessage(
        data.detail ||
          "Failed to update student",
      );
      return;
    }

    const updatedUser: User = data.user;

    const updatedStudent: Student = {
      id: updatedUser.id,
      studentId:
        updatedUser.student_id ||
        `STU-${updatedUser.id}`,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone || "",
      department:
        updatedUser.department || "",
      course: updatedUser.course || "",
      cgpa: updatedUser.cgpa || "",
      graduationYear:
        updatedUser.graduation_year || "",
      skills: updatedUser.skills || "",
      resume: updatedUser.resume || "",
      backlogs:
        updatedUser.backlogs || "0",
      placementStatus:
        updatedUser.placement_status ||
        "Not Placed",
      is_active: updatedUser.is_active,
    };

    setStudents((previousStudents) =>
      previousStudents.map((student) =>
        student.id === editingStudentId
          ? updatedStudent
          : student,
      ),
    );

    setSelectedStudent(updatedStudent);

    setFormMessage(
      "Student updated successfully!",
    );

    setTimeout(() => {
      setShowAddStudent(false);
      resetStudentForm();
    }, 800);
  } catch (err) {
    console.error(err);

    setFormMessage(
      "Failed to update student.",
    );
  }

  return;
}

      // =====================================================
      // CREATE STUDENT
      // =====================================================

      try {
        const response =
          await fetch(
            `${API_URL}/users`,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                name: studentName,
                email:
                  studentEmail,
                password:
                  studentPassword,
                role: "student",
                student_id: studentId,
                phone: studentPhone,
                department: department,
                course: course,
                cgpa: cgpa,
                graduation_year: graduationYear,
                skills: skills,
                resume: resume,
                backlogs: backlogs,
                placement_status: placementStatus,
              }),
            },
          );

        const data =
          await response.json();

        if (!response.ok) {
          setFormMessage(
            data.detail ||
              "Failed to create student",
          );

          return;
        }

        const createdUser: User =
          data.user;

        const newStudent: Student =
          {
            id: createdUser.id,

            studentId:
              studentId.trim() ||
              `STU-${createdUser.id}`,

            name:
              createdUser.name,

            email:
              createdUser.email,

            phone:
              studentPhone,

            password:
              studentPassword,

            department,

            course,

            cgpa,

            graduationYear,

            skills,

            resume,

            backlogs:
              backlogs || "0",

            placementStatus,

            is_active:
              createdUser.is_active,
          };

        setStudents(
          (previousStudents) => [
            ...previousStudents,
            newStudent,
          ],
        );

        setFormMessage(
          "Student created successfully!",
        );

        setCurrentPage(1);

        setTimeout(() => {
          setShowAddStudent(false);
          resetStudentForm();
        }, 1000);
      } catch (err) {
        console.error(err);

        setFormMessage(
          "Backend connection failed.",
        );
      }
    };

  // =========================================================
  // EDIT STUDENT
  // =========================================================

  const handleEditStudent = (
    student: Student,
  ) => {
    setEditingStudentId(
      student.id,
    );

    setStudentName(
      student.name,
    );

    setStudentId(
      student.studentId,
    );

    setStudentEmail(
      student.email,
    );

    setStudentPhone(
      student.phone,
    );

    setStudentPassword(
      student.password || "",
    );

    setDepartment(
      student.department,
    );

    setCourse(
      student.course,
    );

    setCgpa(
      student.cgpa,
    );

    setGraduationYear(
      student.graduationYear,
    );

    setSkills(
      student.skills,
    );

    setResume(
      student.resume,
    );

    setResumeFileName(
      student.resume
        ? "Existing resume"
        : "",
    );

    setBacklogs(
      student.backlogs,
    );

    setPlacementStatus(
      student.placementStatus,
    );

    setShowAddStudent(true);

    setSelectedStudent(null);
  };

  // =========================================================
  // DELETE STUDENT
  // =========================================================

  const handleDeleteStudent =
    async (
      student: Student,
    ) => {
      const confirmed =
        window.confirm(
          `Are you sure you want to delete ${student.name}?`,
        );

      if (!confirmed) {
        return;
      }

      try {
        const response =
          await fetch(
            `${API_URL}/users/${student.id}`,
            {
              method: "DELETE",
            },
          );

        if (!response.ok) {
          throw new Error(
            "Delete failed",
          );
        }

        setStudents(
          (previousStudents) =>
            previousStudents.filter(
              (item) =>
                item.id !==
                student.id,
            ),
        );

        setSelectedStudent(null);
      } catch (err) {
        console.error(err);

        setError(
          "Failed to delete student",
        );
      }
    };

  const handleStudentStatusChange = async (
  student: Student,
  isActive: boolean,
) => {
  try {
    const response = await fetch(
      `${API_URL}/users/${student.id}/status?is_active=${isActive}`,
      {
        method: "PUT",
      },
    );

    if (!response.ok) {
      throw new Error(
        "Failed to update student status",
      );
    }

    setStudents((previousStudents) =>
      previousStudents.map((item) =>
        item.id === student.id
          ? {
              ...item,
              is_active: isActive,
            }
          : item,
      ),
    );

    setSelectedStudent((previousStudent) =>
      previousStudent &&
      previousStudent.id === student.id
        ? {
            ...previousStudent,
            is_active: isActive,
          }
        : previousStudent,
    );
  } catch (error) {
    console.error(error);

    setError(
      "Failed to update student status",
    );
  }
};
  // =========================================================
  // RESET FILTERS
  // =========================================================

  const resetFilters = () => {
    setSearchTerm("");
    setDepartmentFilter("all");
    setCgpaFilter("all");
    setGraduationFilter("all");
    setPlacementFilter("all");
    setSkillsFilter("");
    setCurrentPage(1);
  };

  // =========================================================
  // DASHBOARD
  // =========================================================

  const renderDashboard = () => {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0B1F3A]">
            Dashboard
          </h1>

          <p className="mt-1 text-slate-500">
            Monitor placement activities
            and statistics.
          </p>
        </div>

        <DashboardStats
          totalStudents={
            totalStudents
          }
          totalCompanies={
            totalCompanies
          }
          activeJobs={
            activeJobs
          }
          totalApplications={
            totalApplications
          }
          shortlistedStudents={
            shortlistedStudents
          }
          selectedStudents={
            selectedStudents
          }
          placementPercentage={
            placementPercentage
          }
        />
      </div>
    );
  };

  // =========================================================
  // STUDENTS PAGE
  // =========================================================

  const renderStudents = () => {
    return (
      <div>
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0B1F3A]">
              Students
            </h1>

            <p className="mt-1 text-slate-500">
              Manage student accounts and
              details.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              resetStudentForm();
              setShowAddStudent(
                true,
              );
            }}
            className="rounded-lg bg-[#F97316] px-5 py-3 font-semibold text-white hover:bg-[#EA580C]"
          >
            + Add Student
          </button>
        </div>

        {/* Student Form */}
        {showAddStudent && (
          <StudentForm
            editingStudentId={
              editingStudentId
            }
            studentName={
              studentName
            }
            setStudentName={
              setStudentName
            }
            studentId={
              studentId
            }
            setStudentId={
              setStudentId
            }
            studentEmail={
              studentEmail
            }
            setStudentEmail={
              setStudentEmail
            }
            studentPhone={
              studentPhone
            }
            setStudentPhone={
              setStudentPhone
            }
            studentPassword={
              studentPassword
            }
            setStudentPassword={
              setStudentPassword
            }
            department={
              department
            }
            setDepartment={
              setDepartment
            }
            course={course}
            setCourse={setCourse}
            cgpa={cgpa}
            setCgpa={setCgpa}
            graduationYear={
              graduationYear
            }
            setGraduationYear={
              setGraduationYear
            }
            skills={skills}
            setSkills={setSkills}
            resumeFileName={
              resumeFileName
            }
            backlogs={
              backlogs
            }
            setBacklogs={
              setBacklogs
            }
            placementStatus={
              placementStatus
            }
            setPlacementStatus={
              setPlacementStatus
            }
            formMessage={
              formMessage
            }
            showPassword={
              showPassword
            }
            setShowPassword={
              setShowPassword
            }
            handleResumeUpload={
              handleResumeUpload
            }
            handleStudentSubmit={
              handleStudentSubmit
            }
            onClose={() => {
              setShowAddStudent(
                false,
              );
              resetStudentForm();
            }}
          />
        )}

        {/* Filters */}
        {!showAddStudent && (
          <>
            <StudentFilters
              searchTerm={
                searchTerm
              }
              setSearchTerm={(
                value,
              ) => {
                setSearchTerm(
                  value,
                );
                setCurrentPage(1);
              }}
              departmentFilter={
                departmentFilter
              }
              setDepartmentFilter={(
                value,
              ) => {
                setDepartmentFilter(
                  value,
                );
                setCurrentPage(1);
              }}
              cgpaFilter={
                cgpaFilter
              }
              setCgpaFilter={(
                value,
              ) => {
                setCgpaFilter(
                  value,
                );
                setCurrentPage(1);
              }}
              graduationFilter={
                graduationFilter
              }
              setGraduationFilter={(
                value,
              ) => {
                setGraduationFilter(
                  value,
                );
                setCurrentPage(1);
              }}
              placementFilter={
                placementFilter
              }
              setPlacementFilter={(
                value,
              ) => {
                setPlacementFilter(
                  value,
                );
                setCurrentPage(1);
              }}
              skillsFilter={
                skillsFilter
              }
              setSkillsFilter={(
                value,
              ) => {
                setSkillsFilter(
                  value,
                );
                setCurrentPage(1);
              }}
              resetFilters={
                resetFilters
              }
            />

            {/* Table */}
            <StudentTable
              students={
                paginatedStudents
              }
              loading={loading}
              error={error}
              onView={(
                student,
              ) =>
                setSelectedStudent(
                  student,
                )
              }
              onEdit={
                handleEditStudent
              }
              onDelete={
                handleDeleteStudent
              }
              onStatusChange={handleStudentStatusChange}
            />

            {/* Profile */}
            <StudentProfile
              student={
                selectedStudent
              }
              onClose={() =>
                setSelectedStudent(
                  null,
                )
              }
            />

            {/* Pagination */}
            <Pagination
              currentPage={
                safeCurrentPage
              }
              totalPages={
                totalPages
              }
              pageSize={
                pageSize
              }
              totalItems={
                filteredStudents.length
              }
              onPageChange={(
                page,
              ) =>
                setCurrentPage(
                  page,
                )
              }
              onPageSizeChange={(
                size,
              ) => {
                setPageSize(
                  size,
                );
                setCurrentPage(
                  1,
                );
              }}
            />
          </>
        )}
      </div>
    );
  };

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <AdminSidebar
          activePage={
            activePage
          }
          onPageChange={
            setActivePage
          }
        />

        {/* Main Content */}
        <main className="ml-0 min-h-screen flex-1 p-6 md:ml-64 md:p-8">
          {activePage ===
          "dashboard"
            ? renderDashboard()
            : renderStudents()}
        </main>
      </div>
    </div>
  );
}