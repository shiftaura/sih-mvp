import api from "./api";

// GET /api/audit-logs?projectId=
export const getAuditLogs = async (projectId) => {
  const response = await api.get("/audit-logs", {
    params: {
      projectId,
    },
  });

  return response.data;
};