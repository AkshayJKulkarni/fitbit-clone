
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface UserAuthContextProps {
  isLoggedIn: boolean;
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
}

const UserAuthContext = createContext<UserAuthContextProps>({
  isLoggedIn: false,
  userEmail: null,
  login: () => {},
  logout: () => {},
});

export const UserAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user is already logged in
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setIsLoggedIn(true);
      setUserEmail(savedEmail);
    }
  }, []);
  
  const login = (email: string) => {
    localStorage.setItem("userEmail", email);
    setIsLoggedIn(true);
    setUserEmail(email);
  };
  
  const logout = () => {
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setUserEmail(null);
  };
  
  return (
    <UserAuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(UserAuthContext);
