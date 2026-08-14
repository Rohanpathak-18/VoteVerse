function PrivateCandidateCard({
  candidate,
  hasVoted,
  onVote,
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
          {candidate.name
            ?.charAt(0)
            ?.toUpperCase()}
        </div>

        <div>
          <h2 className="text-xl font-bold">
            {candidate.name}
          </h2>

          <p className="text-sm text-gray-500">
            Candidate
          </p>
        </div>

      </div>

      <button
        disabled={hasVoted}
        onClick={() =>
          onVote(candidate.userId)
        }
        className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white disabled:bg-gray-300"
      >
        {hasVoted
          ? "Already Voted"
          : "Vote"}
      </button>

    </div>
  );
}

export default PrivateCandidateCard;