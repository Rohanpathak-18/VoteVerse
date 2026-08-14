import { Link } from "react-router-dom";

function ClassElectionSection() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-10 shadow-lg sm:px-10 lg:px-12">
          
          {/* Background decoration */}
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-white/5" />

          <div className="relative grid items-center gap-8 lg:grid-cols-2">

            {/* Left */}
            <div>
              <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-blue-100">
                PRIVATE ELECTIONS
              </span>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Run Your Own Class Election
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                Create a private election for your class, club, or group.
                Share a class password with selected members and allow
                students to participate as voters or candidates.
              </p>

              <Link
                to="/private-elections"
                className="mt-6 inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-600 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Create / Join Election
                <span className="ml-2 text-lg">→</span>
              </Link>
            </div>

            {/* Right */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">

              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-xl">
                  🔐
                </div>

                <h3 className="font-bold text-white">
                  Private & Secure
                </h3>

                <p className="mt-1 text-sm leading-5 text-blue-100">
                  Only members with the class password can access
                  your private election.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-xl">
                  👥
                </div>

                <h3 className="font-bold text-white">
                  Candidates & Voters
                </h3>

                <p className="mt-1 text-sm leading-5 text-blue-100">
                  Keep candidates and voters separate for an organized
                  class election.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClassElectionSection;