
import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "driver" | "admin";
  profileImage?: string;
  phoneNumber?: string;
  provider?: "email" | "oauth";
  isAdmin?: boolean;
}

interface ProfileUpdateData {
  name?: string;
  email?: string;
  phoneNumber?: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: "customer" | "driver") => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  updateUserProfile?: (data: ProfileUpdateData) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getUserFromLocalStorage());

  // Get user from localStorage during initialization
  function getUserFromLocalStorage(): User | null {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }
  
  // Save user to localStorage
  function saveUserToLocalStorage(user: User | null) {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }

  // Check if user is admin
  const isAdmin = !!user && user.role === "admin";

  const login = async (email: string, password: string) => {
    // This is a mock implementation
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Determine role based on email
        let role: "customer" | "driver" | "admin" = "customer";
        
        if (email.includes("driver")) {
          role = "driver";
        } else if (email.includes("admin")) {
          role = "admin";
        }
        
        const newUser: User = {
          id: Math.random().toString(36).substring(2),
          name: email.split("@")[0],
          email,
          role,
          provider: "email",
          isAdmin: role === "admin"
        };
        
        setUser(newUser);
        saveUserToLocalStorage(newUser);
        resolve();
      }, 1000);
    });
  };

  const register = async (email: string, password: string, name: string, role: "customer" | "driver") => {
    // This is a mock implementation
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: Math.random().toString(36).substring(2),
          name,
          email,
          role,
          provider: "email",
          isAdmin: false
        };
        
        setUser(newUser);
        saveUserToLocalStorage(newUser);
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    saveUserToLocalStorage(null);
  };
  
  const updateUserProfile = (data: ProfileUpdateData) => {
    if (user) {
      const updatedUser = {
        ...user,
        ...data
      };
      setUser(updatedUser);
      saveUserToLocalStorage(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
