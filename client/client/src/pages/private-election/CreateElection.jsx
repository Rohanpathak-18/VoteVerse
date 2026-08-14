import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createElection,
} from "../../services/electionService";

function CreateElection() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    className: "",
    description: "",
    password: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.className ||
      !formData.password
    ) {
      alert(
        "Election name, class name and password are required."
      );
      return;
    }

    try {
      setLoading(true);

      const data =
        await createElection(formData);

      alert(
        `Election created successfully!\n\nElection Code: ${data.election.code}`
      );

      navigate(
        `/private-election/${data.election.id}`
      );
    } catch (error) {
      console.error(
        "Create election error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to create election."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">

      <div className="mx-auto max-w-2xl">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Create Private Election
          </h1>

          <p className="mt-2 text-gray-500">
            Create an election for your class or private group.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-8 shadow"
        >

          <div className="space-y-5">

            <div>
              <label className="mb-2 block font-semibold">
                Election Name
              </label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="CSE-B CR Election"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Class / Group
              </label>

              <input
                name="className"
                value={formData.className}
                onChange={handleChange}
                placeholder="B.Tech CSE B"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Class representative election"
                rows="3"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Join Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Share this password with your class"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block font-semibold">
                  Start Date
                </label>

                <input
                  type="datetime-local"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  End Date
                </label>

                <input
                  type="datetime-local"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3"
                />
              </div>

            </div>

          </div>

          <button
            disabled={loading}
            className="mt-7 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Election"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default CreateElection;