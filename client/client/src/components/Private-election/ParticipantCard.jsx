function ParticipantCard({
  participant,
  onRoleChange,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-5">

      <div>
        <h3 className="font-bold">
          {participant.name}
        </h3>

        <p className="text-sm text-gray-500">
          {participant.email}
        </p>

        <p className="text-sm capitalize text-blue-600">
          {participant.role}
        </p>
      </div>

      {participant.role !== "organizer" && (
        <div className="flex gap-2">

          <button
            onClick={() =>
              onRoleChange(
                participant.userId,
                "voter"
              )
            }
            className="rounded-lg border px-3 py-2 text-sm"
          >
            Voter
          </button>

          <button
            onClick={() =>
              onRoleChange(
                participant.userId,
                "candidate"
              )
            }
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white"
          >
            Candidate
          </button>

        </div>
      )}

    </div>
  );
}

export default ParticipantCard;