import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load saved user when application starts
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Invalid saved user:", error);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, []);

  // LOGIN
  const login = async (loginData) => {
    const response = await axiosInstance.post(
      "/user/login",
      loginData
    );

    console.log("FULL LOGIN RESPONSE:", response.data);

    const data = response.data;

    // Get token from backend response
    const token =
      data.token ||
      data.accessToken;

    if (!token) {
      throw new Error("Token was not received from server");
    }

    // Get user from backend response
    const loggedInUser =
      data.user ||
      data.data?.user ||
      data.data;

    if (!loggedInUser) {
      throw new Error("User data was not received from server");
    }

    // Save authentication information
    localStorage.setItem("token", token);
    localStorage.setItem(
      "user",
      JSON.stringify(loggedInUser)
    );

    // Update React state
    setUser(loggedInUser);

    return data;
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};