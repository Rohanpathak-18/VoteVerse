import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import axiosInstance from "../api/axiosInstance";


const AuthContext =
    createContext();


export const AuthProvider =
    ({ children }) => {

        const [user, setUser] =
            useState(null);

        const [loading, setLoading] =
            useState(true);


        useEffect(() => {

            const token =
                localStorage.getItem(
                    "token"
                );

            const storedUser =
                localStorage.getItem(
                    "user"
                );


            if (
                token &&
                storedUser
            ) {

                try {

                    setUser(
                        JSON.parse(
                            storedUser
                        )
                    );

                } catch (error) {

                    console.error(
                        "Invalid stored user"
                    );

                    localStorage.removeItem(
                        "user"
                    );
                }

            }

            setLoading(false);

        }, []);


        const updateUser =
            (updatedUser) => {

                setUser(
                    updatedUser
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        updatedUser
                    )
                );
            };


        const logout = () => {

            localStorage.removeItem(
                "token"
            );

            localStorage.removeItem(
                "user"
            );

            setUser(null);
        };


        return (

            <AuthContext.Provider
                value={{
                    user,
                    setUser,
                    updateUser,
                    logout,
                    loading,
                }}
            >

                {children}

            </AuthContext.Provider>
        );
    };


export const useAuth = () =>
    useContext(AuthContext);