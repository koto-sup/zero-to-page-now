import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export type UserRole = "customer" | "driver";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

interface DriverDetails {
  truckModel?: string;
  licensePlate?: string;
  refrigerationCapacity?: string;
  truckImages?: string[];
  location?: {
    lat: number;
    lng: number;
  };
  available?: boolean;
}

export interface AuthContextType {
  user: User | null;
  driverDetails: DriverDetails | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateDriverDetails: (details: Partial<DriverDetails>) => void;
  resetPassword: (email: string) => Promise<void>; // Added resetPassword function
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demo purposes
const MOCK_USERS = [
  {
    id: "driver-1",
    email: "driver@example.com",
    password: "password",
    name: "John Driver",
    role: "driver" as UserRole,
    profileImage: "/placeholder.svg",
  },
  {
    id: "customer-1",
    email: "customer@example.com",
    password: "password",
    name: "Customer User",
    role: "customer" as UserRole,
  },
];

const MOCK_DRIVER_DETAILS = {
  "driver-1": {
    truckModel: "Refrigerated Truck XL",
    licensePlate: "RF-1234",
    refrigerationCapacity: "5 tons",
    truckImages: ["/placeholder.svg"],
    location: {
      lat: 40.712776,
      lng: -74.005974,
    },
    available: true,
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [driverDetails, setDriverDetails] = useState<DriverDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for saved auth on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("moprd_user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser) as User;
        setUser(parsedUser);
        
        // If driver, load driver details
        if (parsedUser.role === "driver" && MOCK_DRIVER_DETAILS[parsedUser.id]) {
          setDriverDetails(MOCK_DRIVER_DETAILS[parsedUser.id]);
        }
      } catch (error) {
        console.error("Failed to parse saved user:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = MOCK_USERS.find(
        u => u.email === email && u.password === password && u.role === role
      );
      
      if (!foundUser) {
        throw new Error("Invalid credentials or user type");
      }
      
      // Remove password from user object
      const { password: _, ...secureUser } = foundUser;
      
      setUser(secureUser);
      localStorage.setItem("moprd_user", JSON.stringify(secureUser));
      
      // Load driver details if applicable
      if (role === "driver" && MOCK_DRIVER_DETAILS[secureUser.id]) {
        setDriverDetails(MOCK_DRIVER_DETAILS[secureUser.id]);
      }
      
      toast.success(`Welcome back, ${secureUser.name}!`);
    } catch (error) {
      toast.error(error.message || "Login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const userExists = MOCK_USERS.some(u => u.email === email);
      if (userExists) {
        throw new Error("User already exists with this email");
      }
      
      // Create new user
      const newUser = {
        id: `${role}-${Date.now()}`,
        name,
        email,
        role,
      };
      
      setUser(newUser);
      localStorage.setItem("moprd_user", JSON.stringify(newUser));
      
      // Initialize empty driver details if driver
      if (role === "driver") {
        setDriverDetails({});
      }
      
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(error.message || "Registration failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setDriverDetails(null);
    localStorage.removeItem("moprd_user");
    toast.info("You've been logged out");
  };

  const updateDriverDetails = (details: Partial<DriverDetails>) => {
    if (user?.role !== "driver") return;
    
    setDriverDetails(prev => ({ ...prev, ...details }));
    toast.success("Driver details updated");
  };

  // Add resetPassword function
  const resetPassword = async (email: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email exists in mock users
      const userExists = MOCK_USERS.some(u => u.email === email);
      if (!userExists) {
        // Still return success to prevent email enumeration attacks
        console.log("User not found, but returning success for security");
      }
      
      // In a real app, this would send a reset email
      console.log(`Password reset link would be sent to: ${email}`);
      
      toast.success("تم إرسال رابط إعادة تعيين كلمة المرور");
    } catch (error) {
      toast.error("فشل إرسال رابط إعادة تعيين كلمة المرور");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        driverDetails,
        isLoading,
        login,
        register,
        logout,
        updateDriverDetails,
        resetPassword, // Add the new function to the context
      }}
    >
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
