import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

//ROLE VERIFICATION AND SETTING
  const hasRole =(role) =>{
    return user && user.role === role;
  };

  const isCustomer =() => hasRole("Customer");
  const isAdmin =() => hasRole("Admin");
  const isManager =() => hasRole("Manager");
  const isDriver =() => hasRole("Driver");
  const isClerk =() => hasRole("Clerk");



  return (
    <AuthContext.Provider value={{
      user, login, logout, isCustomer,
      isAdmin, isManager, isDriver, isClerk }}>
      {children}
    </AuthContext.Provider>
  );
};
