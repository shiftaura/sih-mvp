import api from "./api";

// GET /api/compensation/project/:projectId
export const getCompensationByProject = async (projectId) => {
  const response = await api.get(`/compensation/project/${projectId}`);

  return response.data;
};

// GET /api/compensation/:id
export const getCompensationById = async (compensationId) => {
  const response = await api.get(`/compensation/${compensationId}`);

  return response.data;
};

// POST /api/compensation
export const createCompensation = async (compensationData) => {
  const response = await api.post("/compensation", {
    parcelId: compensationData.parcelId,
    assessedAmount: compensationData.assessedAmount,
    approvedAmount: compensationData.approvedAmount,
  });

  return response.data;
};

// POST /api/compensation/payment
export const recordPayment = async (paymentData) => {
  const response = await api.post("/compensation/payment", {
    compensationId: paymentData.compensationId,
    amount: paymentData.amount,
    paymentReference: paymentData.paymentReference,
    paymentDate: paymentData.paymentDate,
  });

  return response.data;
};