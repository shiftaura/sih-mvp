import api from "./api";

// GET /api/rnr/project/:projectId
export const getRnrByProject = async (projectId) => {
  const response = await api.get(`/rnr/project/${projectId}`);

  return response.data;
};

// GET /api/families?projectId=:projectId
export const getFamilies = async (projectId) => {
  const response = await api.get("/families", {
    params: {
      projectId,
    },
  });

  return response.data;
};

// GET /api/families/:familyId
export const getFamilyById = async (familyId) => {
  const response = await api.get(`/families/${familyId}`);

  return response.data;
};

// POST /api/families
export const createFamily = async (familyData) => {
  const response = await api.post("/families", {
    projectId: familyData.projectId,
    parcelId: familyData.parcelId,
    familyCode: familyData.familyCode,
    affectedArea: familyData.affectedArea,
    displacementStatus: familyData.displacementStatus,
  });

  return response.data;
};

// PATCH /api/rnr/:id
export const updateRnr = async (familyId, rnrData) => {
  const response = await api.patch(`/rnr/${familyId}`, {
    rehabilitationStatus: rnrData.rehabilitationStatus,
    resettlementStatus: rnrData.resettlementStatus,
    housingAssistance: rnrData.housingAssistance,
  });

  return response.data;
};