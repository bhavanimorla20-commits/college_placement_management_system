type StudentFiltersProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  departmentFilter: string;
  setDepartmentFilter: (value: string) => void;

  cgpaFilter: string;
  setCgpaFilter: (value: string) => void;

  graduationFilter: string;
  setGraduationFilter: (value: string) => void;

  placementFilter: string;
  setPlacementFilter: (value: string) => void;

  skillsFilter: string;
  setSkillsFilter: (value: string) => void;

  resetFilters: () => void;
};

export default function StudentFilters({
  searchTerm,
  setSearchTerm,

  departmentFilter,
  setDepartmentFilter,

  cgpaFilter,
  setCgpaFilter,

  graduationFilter,
  setGraduationFilter,

  placementFilter,
  setPlacementFilter,

  skillsFilter,
  setSkillsFilter,

  resetFilters,
}: StudentFiltersProps) {
  return (
    <div className="mb-6 rounded-xl border bg-white p-5 shadow-sm">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {/* Search */}
        <input
          type="text"
          placeholder="Search name, email or student ID"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="rounded-lg border p-3 outline-none focus:border-[#F97316]"
        />

        {/* Department */}
        <select
          value={departmentFilter}
          onChange={(e) =>
            setDepartmentFilter(e.target.value)
          }
          className="rounded-lg border bg-white p-3 outline-none focus:border-[#F97316]"
        >
          <option value="all">
            All Departments
          </option>

          <option value="CSE">CSE</option>
          <option value="AIML">AIML</option>
          <option value="DS">DS</option>
          <option value="AI&DS">AI&DS</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="MECH">MECH</option>
          <option value="CIVIL">CIVIL</option>
        </select>

        {/* CGPA */}
        <select
          value={cgpaFilter}
          onChange={(e) =>
            setCgpaFilter(e.target.value)
          }
          className="rounded-lg border bg-white p-3 outline-none focus:border-[#F97316]"
        >
          <option value="all">
            All CGPA
          </option>

          <option value="below6">
            Below 6
          </option>

          <option value="6to7">
            6 - 7
          </option>

          <option value="7to8">
            7 - 8
          </option>

          <option value="above8">
            8+
          </option>
        </select>

        {/* Graduation Year */}
        <select
          value={graduationFilter}
          onChange={(e) =>
            setGraduationFilter(e.target.value)
          }
          className="rounded-lg border bg-white p-3 outline-none focus:border-[#F97316]"
        >
          <option value="all">
            All Graduation Years
          </option>
          
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
        </select>

        {/* Placement Status */}
        <select
          value={placementFilter}
          onChange={(e) =>
            setPlacementFilter(e.target.value)
          }
          className="rounded-lg border bg-white p-3 outline-none focus:border-[#F97316]"
        >
          <option value="all">
            All Placement Status
          </option>

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

        {/* Skills */}
        <input
          type="text"
          placeholder="Filter by skills"
          value={skillsFilter}
          onChange={(e) =>
            setSkillsFilter(e.target.value)
          }
          className="rounded-lg border p-3 outline-none focus:border-[#F97316]"
        />
      </div>

      {/* Reset */}
      <button
        type="button"
        onClick={resetFilters}
        className="mt-4 rounded-lg border border-[#0B1F3A] px-4 py-2 text-sm font-medium text-[#0B1F3A] hover:bg-slate-100"
      >
        Reset Filters
      </button>
    </div>
  );
}