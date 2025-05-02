import React, { createContext, useState, useContext } from "react";

// Create a context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [currentUserEmail, setCurrentUserEmail] = useState(null);

  return (
    <UserContext.Provider value={{ currentUserEmail, setCurrentUserEmail }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUser = () => {
  return useContext(UserContext);
};
