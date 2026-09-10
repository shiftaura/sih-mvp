import api from "./api";

// GET /api/objections?projectId=&status=&parcelId=
export const getObjections = async (params = {}) => {
  const response = await api.get("/objections", {
    params: {
      projectId: params.projectId || undefined,
      status: params.status || undefined,
      parcelId: params.parcelId || undefined,
    },
  });

  return response.data;
};

// POST /api/objections
export const createObjection = async (objectionData) => {
  const response = await api.post("/objections", {
    projectId: objectionData.projectId,
    parcelId: objectionData.parcelId,
    reason: objectionData.reason,
    description: objectionData.description,
  });

  return response.data;
};

// PATCH /api/objections/:id
export const resolveObjection = async (objectionId, objectionData) => {
  const response = await api.patch(`/objections/${objectionId}`, {
    status: objectionData.status,
    resolutionNote: objectionData.resolutionNote,
  });

  return response.data;
};