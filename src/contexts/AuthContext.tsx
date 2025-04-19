
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

export type UserRole = "customer" | "driver" | "admin";

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
  resetPassword: (email: string) => Promise<void>;
  isAdmin: (userId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demo purposes - in a real app, this would be replaced with Supabase auth
const MOCK_USERS = [
  {
    id: "driver-1",
    email: "driver@example.com",
    password: "password",
    name: "John Driver",
    role: "driver" as UserRole,
    profileImage: "/placeholder.svg",
    isAdmin: true,
  },
  {
    id: "customer-1",
    email: "customer@example.com",
    password: "password",
    name: "Customer User",
    role: "customer" as UserRole,
    isAdmin: false,
  },
  {
    id: "admin-1",
    email: "admin@example.com",
    password: "password",
    name: "Admin User",
    role: "admin" as UserRole,
    isAdmin: true,
  }
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
  const { language } = useLanguage();

  // In a real app, this would be replaced with a Supabase-authenticated user
  const getRegisteredUsers = () => {
    const savedUsers = localStorage.getItem("moprd_registered_users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  };
  
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
      
      // Check mock users first
      let foundUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );
      
      // If not found in mock users, check registered users
      if (!foundUser) {
        const registeredUsers = getRegisteredUsers();
        foundUser = registeredUsers.find(
          (u: any) => u.email === email && u.password === password
        );
      }
      
      if (!foundUser) {
        throw new Error(language === "en" ? "Invalid credentials" : "بيانات اعتماد غير صالحة");
      }
      
      // Remove password from user object
      const { password: _, ...secureUser } = foundUser;
      
      setUser(secureUser);
      localStorage.setItem("moprd_user", JSON.stringify(secureUser));
      
      // Load driver details if applicable
      if (secureUser.role === "driver" && MOCK_DRIVER_DETAILS[secureUser.id]) {
        setDriverDetails(MOCK_DRIVER_DETAILS[secureUser.id]);
      }
      
      toast.success(language === "en" ? `Welcome back, ${secureUser.name}!` : `مرحبًا بعودتك، ${secureUser.name}!`);
    } catch (error) {
      toast.error(error.message || (language === "en" ? "Login failed" : "فشل تسجيل الدخول"));
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
      
      // Check if user already exists in mock users
      const userExistsInMock = MOCK_USERS.some(u => u.email === email);
      
      // Check if user already exists in registered users
      const registeredUsers = getRegisteredUsers();
      const userExistsInRegistered = registeredUsers.some((u: any) => u.email === email);
      
      if (userExistsInMock || userExistsInRegistered) {
        throw new Error(language === "en" ? "User already exists with this email" : "مستخدم موجود بالفعل بهذا البريد الإلكتروني");
      }
      
      // Create new user
      const newUser = {
        id: `${role}-${Date.now()}`,
        name,
        email,
        password,
        role,
      };
      
      // Store user in registered users
      const updatedRegisteredUsers = [...registeredUsers, newUser];
      localStorage.setItem("moprd_registered_users", JSON.stringify(updatedRegisteredUsers));
      
      // Set user in state without password
      const { password: _, ...secureUser } = newUser;
      setUser(secureUser);
      localStorage.setItem("moprd_user", JSON.stringify(secureUser));
      
      // Initialize empty driver details if driver
      if (role === "driver") {
        setDriverDetails({});
      }
      
      toast.success(language === "en" ? "Account created successfully!" : "تم إنشاء الحساب بنجاح!");
    } catch (error) {
      toast.error(error.message || (language === "en" ? "Registration failed" : "فشل التسجيل"));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setDriverDetails(null);
    localStorage.removeItem("moprd_user");
    toast.info(language === "en" ? "You've been logged out" : "لقد تم تسجيل خروجك");
  };

  const updateDriverDetails = (details: Partial<DriverDetails>) => {
    if (user?.role !== "driver") return;
    
    setDriverDetails(prev => ({ ...prev, ...details }));
    toast.success(language === "en" ? "Driver details updated" : "تم تحديث تفاصيل السائق");
  };

  const isAdmin = (userId: string) => {
    // Check mock users for admin status
    const mockUser = MOCK_USERS.find(u => u.id === userId);
    if (mockUser && mockUser.isAdmin) {
      return true;
    }
    
    // Check if user role is admin
    if (user && user.role === "admin") {
      return true;
    }
    
    // In a real app, you would check admin status from your database
    return userId === "driver-1" || userId === "admin-1"; // Temporary solution
  };

  const resetPassword = async (email: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email exists in mock users
      const userExistsInMock = MOCK_USERS.some(u => u.email === email);
      
      // Check if email exists in registered users
      const userExistsInRegistered = registeredUsers.some((u: any) => u.email === email);
      
      if (!userExistsInMock && !userExistsInRegistered) {
        // Still return success to prevent email enumeration attacks
        console.log("User not found, but returning success for security");
      }
      
      // In a real app, this would send a reset email
      console.log(`Password reset link would be sent to: ${email}`);
      
      toast.success(language === "en" ? "Password reset link has been sent" : "تم إرسال رابط إعادة تعيين كلمة المرور");
    } catch (error) {
      toast.error(language === "en" ? "Failed to send password reset link" : "فشل إرسال رابط إعادة تعيين كلمة المرور");
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
        resetPassword,
        isAdmin,
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
