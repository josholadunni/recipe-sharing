import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

//AuthContext creates a link to a variable that can be imported from other components. Without a provider, it only has the default value assigned to it in createContext(null).

//AuthProvider is a function that brings this link to life, by assigning a state variable to the AuthContext's .Provider propoerty acessor. This allows the AuthContext to be accessed by any of the AuthProvider's children, by using the useContext method.
