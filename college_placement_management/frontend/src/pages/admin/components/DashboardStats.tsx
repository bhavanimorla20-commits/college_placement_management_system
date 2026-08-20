type DashboardStatsProps = {
  totalStudents: number;
  totalCompanies: number;
  activeJobs: number;
  totalApplications: number;
  shortlistedStudents: number;
  selectedStudents: number;
  placementPercentage: number;
};

export default function DashboardStats({
  totalStudents,
  totalCompanies,
  activeJobs,
  totalApplications,
  shortlistedStudents,
  selectedStudents,
  placementPercentage,
}: DashboardStatsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Students */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Total Students
        </p>

        <h2 className="mt-2 text-3xl font-bold text-[#0B1F3A]">
          {totalStudents}
        </h2>
      </div>

      {/* Total Companies */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Total Companies
        </p>

        <h2 className="mt-2 text-3xl font-bold text-[#0B1F3A]">
          {totalCompanies}
        </h2>
      </div>

      {/* Active Jobs */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Active Jobs
        </p>

        <h2 className="mt-2 text-3xl font-bold text-[#0B1F3A]">
          {activeJobs}
        </h2>
      </div>

      {/* Total Applications */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Total Applications
        </p>

        <h2 className="mt-2 text-3xl font-bold text-[#0B1F3A]">
          {totalApplications}
        </h2>
      </div>

      {/* Shortlisted Students */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Shortlisted Students
        </p>

        <h2 className="mt-2 text-3xl font-bold text-[#0B1F3A]">
          {shortlistedStudents}
        </h2>
      </div>

      {/* Selected Students */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Selected Students
        </p>

        <h2 className="mt-2 text-3xl font-bold text-[#0B1F3A]">
          {selectedStudents}
        </h2>
      </div>

      {/* Placement Percentage */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Placement Percentage
        </p>

        <h2 className="mt-2 text-3xl font-bold text-[#F97316]">
          {placementPercentage}%
        </h2>
      </div>
    </div>
  );
}