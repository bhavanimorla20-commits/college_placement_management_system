export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* Header */}
      <header className="bg-[#0B1F3A] text-white px-8 py-5">
        <h1 className="text-2xl font-bold">
          Placement Management System
        </h1>
      </header>

      {/* Dashboard */}
      <main className="p-8">
        <h2 className="text-3xl font-bold text-[#0B1F3A]">
          Dashboard
        </h2>

        <p className="mt-2 text-gray-600">
          Welcome to your placement dashboard.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="text-gray-600">Students</h3>
            <p className="text-3xl font-bold text-[#0B1F3A] mt-2">
              68+
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="text-gray-600">Recruiters</h3>
            <p className="text-3xl font-bold text-[#0B1F3A] mt-2">
              380+
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="text-gray-600">Placements</h3>
            <p className="text-3xl font-bold text-[#F97316] mt-2">
              450+
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}