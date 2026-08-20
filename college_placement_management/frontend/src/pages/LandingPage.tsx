function LandingPage({
  onLogin,
  onSignup,
}: {
  onLogin: () => void;
  onSignup: () => void;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/*  NAVBAR  */}
      <header className="sticky top-0 z-50border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5">

          <a
            href="#home"
            className="text-xl font-bold tracking-tight text-[#172554]"
          >
            College Placement
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#home"
              className="font-medium text-slate-600 transition hover:text-[#F97316]"
            >
              Home
            </a>

            <a
              href="#features"
              className="font-medium text-slate-600 transition hover:text-[#F97316]"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="font-medium text-slate-600 transition hover:text-[#F97316]"
            >
              How It Works
            </a>

            <a
              href="#roles"
              className="font-medium text-slate-600 transition hover:text-[#F97316]"
            >
              Roles
            </a>
            <a
              href="#contact"
              className="font-medium text-slate-600 transition hover:text-[#F97316]"
            >
              Contact
            </a>
          </div>
          <div className="flex items-center gap-3">
            
          <button
          onClick={onLogin}
          className="rounded-lg bg-[#F97316] px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-orange-600">
            Login
          </button>
          <button onClick={onSignup}
              className="rounded-lg border boarder-[#172554] px-5 py-2.5 font-semibold text-[#172554] hover:bg-[#172554] hover:text-white transition"
              >
              Sign Up
              </button>
          </div>
        </nav>
      </header>

      {/*  HERO  */}
      <section
        id="home"
        className="bg-gradient-to-br from-[#F8FAFC] via-white to-orange-50"
      >
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 py-24 md:grid-cols-2 lg:py-28">

          {/* LEFT */}
          <div>

            <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
              College Placement Management System
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-[1.1] tracking-tight text-[#172554] md:text-5xl lg:text-6xl">
              Build Your Career.
              <span className="mt-2 block text-[#F97316]">
                Find Your Opportunity.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              A smarter college placement platform connecting students,
              recruiters, TPOs, and placement teams through one seamless
              system.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <button className="rounded-xl bg-[#F97316] px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600">
                Get Started
              </button>

              <button className="rounded-xl border border-slate-300 bg-white px-7 py-3.5 font-semibold text-[#172554] transition hover:border-orange-300 hover:bg-orange-50">
                Explore Opportunities
              </button>

            </div>

            {/* Trust Stats */}
            <div className="mt-10 flex flex-wrap gap-7 text-sm text-slate-500">

              <div>
                <span className="font-bold text-[#172554]">
                  2,450+
                </span>
                <span className="ml-2">
                  Students
                </span>
              </div>

              <div>
                <span className="font-bold text-[#172554]">
                  68+
                </span>
                <span className="ml-2">
                  Recruiters
                </span>
              </div>

              <div>
                <span className="font-bold text-[#172554]">
                  380+
                </span>
                <span className="ml-2">
                  Placements
                </span>
              </div>

            </div>
          </div>

          {/* RIGHT DASHBOARD */}
          <div className="relative">

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200 md:p-7">

              {/* Dashboard Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Placement Dashboard
                  </p>

                  <h3 className="mt-1 text-2xl font-bold text-[#172554]">
                    Placement Overview
                  </h3>
                </div>

                <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
                  2026
                </span>

              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4">

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm font-medium text-slate-500">
                    Total Students
                  </p>

                  <p className="mt-2 text-3xl font-bold text-[#172554]">
                    2,450
                  </p>

                  <p className="mt-1 text-sm font-medium text-orange-600">
                    +12.5% this year
                  </p>
                </div>

                <div className="rounded-2xl bg-orange-50 p-5">
                  <p className="text-sm font-medium text-slate-500">
                    Recruiters
                  </p>

                  <p className="mt-2 text-3xl font-bold text-[#172554]">
                    68
                  </p>

                  <p className="mt-1 text-sm font-medium text-orange-600">
                    +8 new companies
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm font-medium text-slate-500">
                    Active Jobs
                  </p>

                  <p className="mt-2 text-3xl font-bold text-[#172554]">
                    42
                  </p>

                  <p className="mt-1 text-sm font-medium text-orange-600">
                    15 new this week
                  </p>
                </div>

                <div className="rounded-2xl bg-[#172554] p-5 text-white">
                  <p className="text-sm font-medium text-slate-300">
                    Students Placed
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    380
                  </p>

                  <p className="mt-1 text-sm font-medium text-orange-300">
                    82% placement rate
                  </p>
                </div>

              </div>

              {/* Progress */}
              <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-5">

                <div className="flex items-center justify-between">

                  <p className="font-semibold text-[#172554]">
                    Placement Progress
                  </p>

                  <p className="font-bold text-orange-600">
                    82%
                  </p>

                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[82%] rounded-full bg-orange-500" />
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/*  FEATURES  */}
      <section id="features" className="bg-white py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-2xl text-center">

            <p className="font-semibold text-orange-600">
              KEY FEATURES
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#172554] md:text-4xl">
              Everything You Need for Placements
            </h2>

            <p className="mt-4 text-slate-600">
              A complete platform designed to simplify and manage the entire
              placement journey.
            </p>

          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <FeatureCard
              icon="🎓"
              title="Student Profiles"
              description="Manage academic details, skills, certifications, projects and resumes."
            />

            <FeatureCard
              icon="✓"
              title="Smart Eligibility"
              description="Find opportunities based on department, CGPA, skills and eligibility."
            />

            <FeatureCard
              icon="💼"
              title="Job Applications"
              description="Apply for suitable opportunities and track your application status."
            />

            <FeatureCard
              icon="📊"
              title="Placement Tracking"
              description="Track interviews, selections and your complete placement journey."
            />

          </div>
        </div>
      </section>

      {/*  HOW IT WORKS  */}
      <section
        id="how-it-works"
        className="bg-slate-100 py-20"
      >

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <p className="font-semibold text-orange-600">
              HOW IT WORKS
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#172554] md:text-4xl">
              Simple Placement Process
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              From creating your profile to getting placed, manage every step
              through one platform.
            </p>

          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-4">

            <StepCard
              number="01"
              title="Create Profile"
              description="Add your academic details, skills, certifications and resume."
            />

            <StepCard
              number="02"
              title="Find Opportunities"
              description="Browse jobs and placement drives you are eligible for."
            />

            <StepCard
              number="03"
              title="Apply & Track"
              description="Apply for jobs and track your application status."
            />

            <StepCard
              number="04"
              title="Get Placed"
              description="Attend interviews and track your final selection."
            />

          </div>
        </div>
      </section>

      {/*  ROLES  */}
      <section id="roles" className="bg-white py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <p className="font-semibold text-orange-600">
              ROLE-BASED ACCESS
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#172554] md:text-4xl">
              One Platform. Four Roles.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Each role gets dedicated features and tools designed for their
              placement responsibilities.
            </p>

          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <RoleCard
              title="Placement Admin"
              description="Manage users, recruiters, jobs, placements and growth analytics."
            />

            <RoleCard
              title="TPO"
              description="Coordinate placement drives, students, companies, applications and interviews."
            />

            <RoleCard
              title="Student"
              description="Create your profile, find eligible jobs, apply and track your placement journey."
            />

            <RoleCard
              title="Recruiter"
              description="Register your company, post jobs, manage applicants and select candidates."
            />

          </div>
        </div>
      </section>

      {/*  CTA  */}
      <section className="bg-[#172554] py-20">

        <div className="mx-auto max-w-4xl px-6 text-center text-white">

          <p className="font-semibold text-orange-400">
            START YOUR PLACEMENT JOURNEY
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-5xl">
            Your Next Opportunity Starts Here.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Connect with recruiters, discover opportunities and manage your
            complete placement journey through one centralized platform.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <button className="rounded-xl bg-[#F97316] px-7 py-3.5 font-semibold text-white transition hover:bg-orange-600">
              Get Started
            </button>

            <button className="rounded-xl border border-slate-500 px-7 py-3.5 font-semibold text-white transition hover:border-orange-400 hover:text-orange-400">
              Explore Opportunities
            </button>

          </div>
        </div>
      </section>
      <section id="contact" className="bg-slate-50 py-20">
  <div className="mx-auto max-w-4xl px-6 text-center">

    <p className="font-semibold text-[#F97316]">
      CONTACT US
    </p>

    <h2 className="mt-2 text-3xl font-bold text-[#172554] md:text-4xl">
      Need Help With Placements?
    </h2>

    <p className="mx-auto mt-4 max-w-2xl text-slate-600">
      Contact the placement team for assistance with placement drives,
      recruiters, applications, and student opportunities.
    </p>

    <div className="mt-8 grid gap-4 sm:grid-cols-3">

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <p className="font-semibold text-[#172554]">Email</p>
        <p className="mt-2 text-sm text-slate-500">
          placement@college.edu
        </p>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <p className="font-semibold text-[#172554]">Phone</p>
        <p className="mt-2 text-sm text-slate-500">
          +91 9876543210
        </p>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <p className="font-semibold text-[#172554]">Placement Office</p>
        <p className="mt-2 text-sm text-slate-500">
          College Placement Cell
        </p>
      </div>

    </div>

    </div>
   </section>
      {/*  FOOTER  */}
      <footer className="bg-[#0F172A]">

        <div className="mx-auto max-w-7xl px-6 py-10">

          <div className="grid gap-8 md:grid-cols-3">

            <div>
              <h3 className="text-lg font-bold text-orange-400">
                College Placement
              </h3>

              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
                A centralized platform connecting students, recruiters and
                placement teams for a smarter recruitment experience.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white">
                Platform
              </h4>

              <div className="mt-3 space-y-2 text-sm text-slate-400">
                <p>Student Portal</p>
                <p>Recruiter Portal</p>
                <p>TPO Dashboard</p>
                <p>Admin Dashboard</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white">
                Quick Links
              </h4>

              <div className="mt-3 space-y-2 text-sm text-slate-400">

                <a
                  href="#home"
                  className="block hover:text-orange-400"
                >
                  Home
                </a>

                <a
                  href="#features"
                  className="block hover:text-orange-400"
                >
                  Features
                </a>

                <a
                  href="#how-it-works"
                  className="block hover:text-orange-400"
                >
                  How It Works
                </a>

                <a
                  href="#roles"
                  className="block hover:text-orange-400"
                >
                  Roles
                </a>
                <a
                href="#roles"
                className="block hover:text-orange-400"
                >
                Roles
                </a>

                <a
                href="#contact"
                className="block hover:text-orange-400"
               >
               Contact
               </a>

              </div>
            </div>

          </div>

          <div className="mt-10 border-t border-slate-800 pt-6">

            <p className="text-center text-sm text-slate-500">
              © 2026 College Placement Management System. All rights reserved.
            </p>

          </div>
        </div>
      </footer>
    </div>
  );
}

/*  FEATURE CARD  */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold text-[#172554]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {description}
      </p>

    </div>
  );
}

/*  STEP CARD  */

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg">

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#172554] font-bold text-white">
        {number}
      </div>

      <h3 className="mt-5 text-lg font-bold text-[#172554]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {description}
      </p>

    </div>
  );
}

/*  ROLE CARD */

function RoleCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg">

      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
        <span className="text-lg font-bold text-orange-600">
          {title.charAt(0)}
        </span>
      </div>

      <h3 className="text-lg font-bold text-[#172554]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {description}
      </p>

    </div>
  );
}

export default LandingPage;