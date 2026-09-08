import api from "./api";

// Login
export async function login(credentials) {
  const response = await api.post("/auth/login", credentials);
  return response.data;
}

// CAPTCHA
export async function getCaptcha() {
  const response = await api.get("/auth/captcha");
  return response.data;
}