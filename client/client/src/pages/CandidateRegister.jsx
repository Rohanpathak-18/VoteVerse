import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerAsCandidate } from "../services/candidateService";
import { useAuth } from "../store/AuthContext";


function CandidateRegister() {

    const navigate = useNavigate();

    const {
        user,
        updateUser,
    } = useAuth();

    const [party, setParty] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!party.trim()) {
            alert("Please enter party name.");
            return;
        }

        try {

            setLoading(true);

            const response =
                await registerAsCandidate({
                    party: party.trim(),
                });


            /*
             * Backend has changed the user's role
             * from voter -> candidate.
             *
             * Fetch the latest profile.
             */

            const profileResponse =
                await fetchUserProfile();


            updateUser(
                profileResponse
            );


            localStorage.setItem(
                "user",
                JSON.stringify(
                    profileResponse
                )
            );


            alert(
                "You are now registered as a candidate!"
            );


            navigate(
                "/candidate-dashboard"
            );


        } catch (error) {

            console.error(
                "Candidate registration error:",
                error
            );

            alert(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Candidate registration failed"
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

                <h1 className="text-3xl font-bold text-gray-900">
                    Become a Candidate
                </h1>

                <p className="mt-2 text-gray-500">
                    Register yourself as a candidate.
                </p>


                <div className="mt-5 rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
                    <strong>
                        Name:
                    </strong>{" "}
                    {user?.name}
                </div>


                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >

                    <div>

                        <label className="mb-2 block font-medium">
                            Party Name
                        </label>

                        <input
                            type="text"
                            value={party}
                            onChange={(e) =>
                                setParty(
                                    e.target.value
                                )
                            }
                            placeholder="Enter party name"
                            required
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />

                    </div>


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                    >

                        {loading
                            ? "Registering..."
                            : "Register as Candidate"}

                    </button>

                </form>

            </div>

        </div>
    );
}


// ============================================
// GET CURRENT USER
// ============================================

async function fetchUserProfile() {

    const axiosInstance =
        (
            await import(
                "../api/axiosInstance"
            )
        ).default;

    const response =
        await axiosInstance.get(
            "/user/profile"
        );

    return response.data.user;
}


export default CandidateRegister;