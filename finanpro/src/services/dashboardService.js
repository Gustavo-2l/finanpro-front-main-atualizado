import api from "./api";

export const getDashboard = () => api.get("/dashboard/dashboard/");
export const getSavings = () => api.get("/dashboard/savings/");
