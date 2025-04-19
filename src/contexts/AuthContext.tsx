
import React, { createContext, useState, useContext, useEffect } from "react";

export type UserRole = "customer" | "driver" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  phoneNumber?: string;
  isActive?: boolean;
  createdAt?: Date;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterUserData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phoneNumber?: string;
  profileImage?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to get registered users from localStorage
const getRegisteredUsers = (): RegisterUserData[] => {
  const usersString = localStorage.getItem('registeredUsers');
  return usersString ? JSON.parse(usersString) : [];
};

// Helper function to save registered users to localStorage
const saveRegisteredUsers = (users: RegisterUserData[]) => {
  localStorage.setItem('registeredUsers', JSON.stringify(users));
};

// Get the currently logged in user from localStorage
const getStoredUser = (): User | null => {
  const userString = localStorage.getItem('currentUser');
  return userString ? JSON.parse(userString) : null;
};

// Save the current user to localStorage
const saveCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getStoredUser());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Effect to persist user state
  useEffect(() => {
    saveCurrentUser(user);
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get registered users from localStorage
      const users = getRegisteredUsers();
      
      // Find user with matching email and password
      const foundUser = users.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!foundUser) {
        setError("Login failed. Please check your details and try again.");
        setIsLoading(false);
        return false;
      }

      // Create user object without the password
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Set the authenticated user
      setUser({
        ...userWithoutPassword,
        id: foundUser.email,
        isActive: true,
        createdAt: new Date()
      } as User);
      
      setIsLoading(false);
      return true;
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
      return false;
    }
  };

  const register = async (userData: RegisterUserData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get existing users
      const users = getRegisteredUsers();

      // Check if email already exists
      if (users.some(user => user.email.toLowerCase() === userData.email.toLowerCase())) {
        setError("Email already in use. Please use a different email or login.");
        setIsLoading(false);
        return false;
      }

      // Add the new user to the list
      users.push(userData);
      
      // Save the updated users list
      saveRegisteredUsers(users);

      // Create user object without the password
      const { password: _, ...userWithoutPassword } = userData;
      
      // Auto-login the new user
      setUser({
        ...userWithoutPassword,
        id: userData.email,
        isActive: true,
        createdAt: new Date()
      } as User);
      
      setIsLoading(false);
      return true;
    } catch (err) {
      setError("An unexpected error occurred during registration. Please try again.");
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    saveCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, error }}>
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
