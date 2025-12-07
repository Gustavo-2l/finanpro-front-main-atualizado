import api from "./api";

export const listGoals = () => api.get("/goals/");
export const addGoal = (goal) => api.post("/goals/", goal);
