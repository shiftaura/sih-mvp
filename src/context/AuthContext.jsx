import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("nlas_user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("nlas_user");
        localStorage.removeItem("nlas_token");
      }
    }

    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("nlas_token");
    localStorage.removeItem("nlas_user");
    setUser(null);
  };

  const value = {
    user,
    setUser,
    loading,
    logout,
    isAuthenticated: Boolean(user),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}