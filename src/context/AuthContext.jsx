import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUserApi,
  loginApi,
} from "../services/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem("nlas_access_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUserApi();

        if (response.success && response.data) {
          setUser(response.data);
          localStorage.setItem(
            "nlas_user",
            JSON.stringify(response.data)
          );
        } else {
          logout();
        }
      } catch {
        localStorage.removeItem("nlas_access_token");
        localStorage.removeItem("nlas_user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = async (credentials) => {
    const response = await loginApi(credentials);

    if (!response.success || !response.data) {
      throw new Error(
        response.error?.message || "Login failed."
      );
    }

    const { accessToken, user: loggedInUser } = response.data;

    localStorage.setItem("nlas_access_token", accessToken);
    localStorage.setItem(
      "nlas_user",
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);

    return loggedInUser;
  };

  const logout = () => {
    localStorage.removeItem("nlas_access_token");
    localStorage.removeItem("nlas_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}