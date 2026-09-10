import api from "./api";

// GET /api/projects
export const getProjects = async (params = {}) => {
  const response = await api.get("/projects", {
    params: {
      page: params.page || 1,
      limit: params.limit || 20,
      search: params.search || undefined,
      state: params.state || undefined,
      district: params.district || undefined,
      status: params.status || undefined,
      type: params.type || undefined,
    },
  });

  return response.data;
};

// GET /api/projects/:projectId
export const getProjectById = async (projectId) => {
  const response = await api.get(`/projects/${projectId}`);

  return response.data;
};

// POST /api/projects
export const createProject = async (projectData) => {
  const response = await api.post("/projects", {
    name: projectData.name,
    type: projectData.type,
    department: projectData.department,
    state: projectData.state,
    district: projectData.district,
    requiredArea: projectData.requiredArea,
    targetDate: projectData.targetDate,
  });

  return response.data;
};

// PATCH /api/projects/:projectId
export const updateProject = async (projectId, projectData) => {
  const response = await api.patch(`/projects/${projectId}`, {
    name: projectData.name,
    type: projectData.type,
    department: projectData.department,
    state: projectData.state,
    district: projectData.district,
    requiredArea: projectData.requiredArea,
    targetDate: projectData.targetDate,
  });

  return response.data;
};