import api from "./api";

// GET /api/alerts
export const getAlerts = async (params = {}) => {
  const response = await api.get("/alerts", {
    params: {
      severity: params.severity || undefined,
      status: params.status || undefined,
      projectId: params.projectId || undefined,
    },
  });

  return response.data;
};

// PATCH /api/alerts/:id/read
export const markAlertAsRead = async (alertId) => {
  const response = await api.patch(`/alerts/${alertId}/read`);

  return response.data;
};