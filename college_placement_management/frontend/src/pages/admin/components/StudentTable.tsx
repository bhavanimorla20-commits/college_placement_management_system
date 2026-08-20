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

type StudentTableProps = {
  students: Student[];
  loading: boolean;
  error: string;
  onView: (student: Student) => void;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
  onStatusChange: (student: Student,isActive: boolean,) =>  void;
};

export default function StudentTable({
  students,
  loading,
  error,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}: StudentTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
      <table className="w-full min-w-[950px] text-left">
        <thead>
          <tr className="border-b bg-slate-50 text-sm text-slate-600">
            <th className="px-4 py-3">
              Student ID
            </th>

            <th className="px-4 py-3">
              Name
            </th>

            <th className="px-4 py-3">
              Department
            </th>

            <th className="px-4 py-3">
              CGPA
            </th>

            <th className="px-4 py-3">
              Graduation
            </th>

            <th className="px-4 py-3">
              Placement Status
            </th>

            <th className="px-4 py-3">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={7}
                className="px-4 py-8 text-center text-slate-500"
              >
                Loading students...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td
                colSpan={7}
                className="px-4 py-8 text-center text-red-500"
              >
                {error}
              </td>
            </tr>
          ) : students.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="px-4 py-8 text-center text-slate-500"
              >
                No students found
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr
                key={student.id}
                className="border-b last:border-0"
              >
                <td className="px-4 py-3 font-medium text-[#0B1F3A]">
                  {student.studentId}
                </td>

                <td className="px-4 py-3">
                  {student.name}
                </td>

                <td className="px-4 py-3">
                  {student.department || "-"}
                </td>

                <td className="px-4 py-3">
                  {student.cgpa || "-"}
                </td>

                <td className="px-4 py-3">
                  {student.graduationYear || "-"}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={
                      student.placementStatus ===
                      "Selected"
                        ? "font-medium text-green-600"
                        : student.placementStatus ===
                            "Shortlisted"
                          ? "font-medium text-orange-500"
                          : "text-slate-500"
                    }
                  >
                    {student.placementStatus}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-2 whitespace-nowrap">
                    {/* View */}
                    <button
                      type="button"
                      onClick={() => onView(student)}
                      className="rounded-lg bg-[#0B1F3A] px-3 py-2 text-sm font-medium text-white hover:bg-[#16365f]"
                    >
                      View
                    </button>
                    
                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() => onEdit(student)}
                      className="rounded-lg border border-[#0B1F3A] px-3 py-2 text-sm font-medium text-[#0B1F3A] hover:bg-slate-100"
                    >
                      Edit
                    </button>
                    {/* Activate / Deactivate */}
                    <button
                      type="button"
                      onClick={() =>
                      onStatusChange(
                      student,
                      !student.is_active,
                      )
                      }
                      className="rounded-lg bg-[#0B1F3A] px-3 py-2 text-sm font-medium text-white hover:bg-[#16365f]"
                    >
                      {student.is_active
                      ? "Deactivate"
                      : "Activate"}
                    </button>
                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => onDelete(student)}
                      className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white hover:bg-orange-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}