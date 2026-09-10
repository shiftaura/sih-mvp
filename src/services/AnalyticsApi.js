import api from "./api";

// GET /api/analytics/dashboard
export const getDashboardAnalytics = async () => {
  const response = await api.get("/analytics/dashboard");

  return response.data;
};

// GET /api/analytics/projects/:projectId
export const getProjectAnalytics = async (projectId) => {
  const response = await api.get(`/analytics/projects/${projectId}`);

  return response.data;
};