import { useNavigate } from "react-router-dom";

function ElectionCard({ election }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <h2 className="text-xl font-bold">
        {election.name}
      </h2>

      <p className="mt-1 text-blue-600">
        {election.className}
      </p>

      <p className="mt-3 text-sm text-gray-500">
        {election.description ||
          "Private election"}
      </p>

      <button
        onClick={() =>
          navigate(
            `/private-election/${election.id}`
          )
        }
        className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Open Election
      </button>

    </div>
  );
}

export default ElectionCard;