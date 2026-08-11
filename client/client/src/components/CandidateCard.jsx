function CandidateCard({ candidate }) {

    return (

        <div className="rounded-2xl bg-white p-6 shadow-md">

            <div className="flex h-32 items-center justify-center rounded-xl bg-blue-100">

                <span className="text-5xl">
                    👤
                </span>

            </div>


            <h3 className="mt-5 text-2xl font-bold">
                {candidate.name}
            </h3>


            <p className="mt-2 text-gray-500">
                Party: {candidate.party}
            </p>


            <p className="mt-1 text-gray-500">
                Age: {candidate.age}
            </p>


            <p className="mt-3 text-sm text-gray-400">
                Votes: {candidate.voteCount || 0}
            </p>

        </div>
    );
}


export default CandidateCard;