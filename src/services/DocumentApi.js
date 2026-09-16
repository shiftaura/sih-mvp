import api from "./api";

// 1. GET /api/documents/signature
// Fetch the secure Cloudinary signature from your backend
export const getUploadSignature = async () => {
  const response = await api.get("/documents/signature");
  return response.data;
};

// 2. POST /api/documents
// Save the document record to your database AFTER it successfully uploads to Cloudinary
export const saveDocumentRecord = async (documentData) => {
  const response = await api.post("/documents", {
    projectId: documentData.projectId,
    parcelId: documentData.parcelId, // Optional, send if applicable
    documentType: documentData.documentType,
    fileUrl: documentData.fileUrl, // The secure URL returned by Cloudinary
  });
  return response.data;
};

// 3. GET /api/documents/project/:projectId
// Fetch all documents for a specific project
export const getProjectDocuments = async (projectId) => {
  const response = await api.get(`/documents/project/${projectId}`);
  return response.data;
};