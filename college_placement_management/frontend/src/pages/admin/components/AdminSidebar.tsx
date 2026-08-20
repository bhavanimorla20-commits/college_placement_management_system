type AdminSidebarProps = {
  activePage: "dashboard" | "students";
  onPageChange: (
    page: "dashboard" | "students",
  ) => void;
};

export default function AdminSidebar({
  activePage,
  onPageChange,
}: AdminSidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 bg-[#0B1F3A] text-white md:block">
      {/* Logo / Title */}
      <div className="p-6">
        <h1 className="text-xl font-bold">
          Placement
          <br />
          Management
        </h1>

        <p className="mt-2 text-sm text-slate-300">
          Admin Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="px-4">
        {/* Dashboard */}
        <button
          type="button"
          onClick={() =>
            onPageChange("dashboard")
          }
          className={`mb-2 w-full rounded-lg px-4 py-3 text-left font-medium transition ${
            activePage === "dashboard"
              ? "bg-[#F97316] text-white"
              : "text-slate-300 hover:bg-white/10"
          }`}
        >
          Dashboard
        </button>

        {/* Students */}
        <button
          type="button"
          onClick={() =>
            onPageChange("students")
          }
          className={`w-full rounded-lg px-4 py-3 text-left font-medium transition ${
            activePage === "students"
              ? "bg-[#F97316] text-white"
              : "text-slate-300 hover:bg-white/10"
          }`}
        >
          Students
        </button>
      </nav>
    </aside>
  );
}