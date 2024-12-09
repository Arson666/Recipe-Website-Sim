import React, { createContext, useState } from 'react';

const UserContext = createContext({ isGuest: false }); // Initial state

const UserProvider = ({ children }) => {
  const [isGuest, setIsGuest] = useState(false); // State for isGuest

  return (
    <UserContext.Provider value={{ isGuest, setIsGuest }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };