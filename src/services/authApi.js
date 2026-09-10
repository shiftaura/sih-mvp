import api from "./api";

export const login = async (credentials) => {
  const response = await api.post("/auth/login", {
    email: credentials.email,
    password: credentials.password,
  });

  return response.data;
};

export const loginApi = login;

export const getCurrentUserApi = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};

export const getCurrentUser = getCurrentUserApi;