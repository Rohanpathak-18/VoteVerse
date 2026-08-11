import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
    getCandidates,
} from "../services/candidateService";

import CandidateCard from "./CandidateCard";


function Candidates() {

    const [candidates, setCandidates] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        fetchCandidates();

    }, []);


    const fetchCandidates = async () => {

        try {

            const data =
                await getCandidates();

            setCandidates(data || []);

        } catch (error) {

            console.error(
                "Failed to fetch candidates:",
                error
            );

        } finally {

            setLoading(false);
        }
    };


    if (loading) {

        return (
            <section className="py-20 text-center">

                <p>
                    Loading candidates...
                </p>

            </section>
        );
    }


    return (

        <section className="bg-gray-50 px-6 py-20">

            <div className="mx-auto max-w-7xl">

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    className="mb-12 text-center"
                >

                    <h2 className="text-4xl font-bold text-gray-900">
                        Meet Our Candidates
                    </h2>

                    <p className="mt-4 text-gray-500">
                        Choose your preferred candidate and cast your vote.
                    </p>

                </motion.div>


                {candidates.length === 0 ? (

                    <p className="text-center text-gray-500">
                        No candidates registered yet.
                    </p>

                ) : (

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                        {candidates.map(
                            (candidate) => (

                                <CandidateCard
                                    key={candidate._id}
                                    candidate={candidate}
                                />

                            )
                        )}

                    </div>
                )}

            </div>

        </section>
    );
}


export default Candidates;