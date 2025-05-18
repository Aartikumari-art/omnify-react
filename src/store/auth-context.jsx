// src/store/auth-context.jsx
import React, { createContext, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  userName: null,
  login: (token, name) => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  // Don't parse token unless it's a stringified object (which it isn't)
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );

  const isLoggedIn = !!token;

  const login = (token, name) => {
    setToken(token);
    setUserName(name);
    localStorage.setItem("token", token); // Store as plain string
    localStorage.setItem("userName", name);
  };

  const logout = () => {
    setToken(null);
    setUserName("");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
