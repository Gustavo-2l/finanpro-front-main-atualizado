import api from "./api";

export const registerUser = async (user) => {
  const res = await api.post("/auth/auth/register", user);
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await api.post("/auth/auth/login", { email, password });
  localStorage.setItem("token", res.data.access_token);
  return res.data;
};
