import api from "./api";

// POST /api/documents/upload
export const uploadDocument = async ({
  file,
  projectId,
  parcelId,
  documentType,
}) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("projectId", projectId);

  if (parcelId) {
    formData.append("parcelId", parcelId);
  }

  formData.append("documentType", documentType);

  const response = await api.post("/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// GET /api/documents/project/:projectId
export const getProjectDocuments = async (projectId) => {
  const response = await api.get(`/documents/project/${projectId}`);

  return response.data;
};