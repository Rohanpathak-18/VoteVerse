import { useAuth } from "../store/AuthContext";


function CandidateDashboard() {

  const { user, logout } = useAuth();


  return (

    <div className="min-h-screen bg-gray-50">

      <div className="mx-auto max-w-6xl px-6 py-12">

        <div className="rounded-3xl bg-white p-8 shadow">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">
                Candidate Dashboard
              </p>

              <h1 className="text-3xl font-bold">
                {user?.name}
              </h1>

              <p className="mt-2 text-blue-600">
                Candidate
              </p>

            </div>


            <button
              onClick={logout}
              className="rounded-xl bg-red-500 px-5 py-2 text-white"
            >
              Logout
            </button>

          </div>


          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border p-6">

              <h2 className="text-xl font-bold">
                Candidate Profile
              </h2>

              <p className="mt-3 text-gray-500">
                Name: {user?.name}
              </p>

              <p className="text-gray-500">
                Email: {user?.email}
              </p>

            </div>


            <div className="rounded-2xl border p-6">

              <h2 className="text-xl font-bold">
                Election Status
              </h2>

              <p className="mt-3 text-gray-500">
                Your candidate account is active.
              </p>

            </div>


            <div className="rounded-2xl border p-6">

              <h2 className="text-xl font-bold">
                Results
              </h2>

              <p className="mt-3 text-gray-500">
                Election results will appear here.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


export default CandidateDashboard;