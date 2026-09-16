import api from "./api";

// GET /api/workflow/:projectId
export const getWorkflow = async (projectId) => {
  const response = await api.get(`/workflow/${projectId}`);
  return response.data;
};

// POST /api/workflow/transition
export const transitionWorkflow = async ({
  projectId,
  nextStatus,
  comment,
  comments,
}) => {
  const response = await api.post("/workflow/transition", {
    projectId,
    nextStatus,
    // Maps the existing component's 'comment' to the API's required 'comments'
    comments: comments || comment, 
  });
  return response.data;
};