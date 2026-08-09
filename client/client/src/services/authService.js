import axiosInstance from "../api/axiosInstance";

export const loginUser = async (aadharCardNumber, password) => {
  const response = await axiosInstance.post("/user/login", {
    aadharCardNumber,
    password,
  });

  const token = response.data.token;

  localStorage.setItem("token", token);

  // Get logged-in user's profile
  const profileResponse = await axiosInstance.get("/user/profile");

  const user = profileResponse.data.user;

  localStorage.setItem("user", JSON.stringify(user));

  return user;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};