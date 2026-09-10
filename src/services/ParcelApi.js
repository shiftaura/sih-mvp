import api from "./api";

export const getParcels = async (params = {}) => {
  const response = await api.get("/parcels", {
    params: {
      projectId: params.projectId,
      status: params.status,
      search: params.search,
      page: params.page || 1,
      limit: params.limit || 20,
    },
  });

  return response.data;
};

export const getParcelById = async (parcelId) => {
  const response = await api.get(`/parcels/${parcelId}`);
  return response.data;
};

export const getParcelOwners = async (parcelId) => {
  const response = await api.get(`/parcels/${parcelId}/owners`);
  return response.data;
};

export const getGISParcels = async (projectId, status) => {
  const response = await api.get("/gis/parcels", {
    params: {
      projectId,
      status,
    },
  });

  return response.data;
};

export const getGISProjectBoundary = async (projectId) => {
  const response = await api.get(`/gis/projects/${projectId}`);
  return response.data;
};