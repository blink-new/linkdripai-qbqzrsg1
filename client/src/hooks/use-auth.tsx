import { createContext, ReactNode, useContext, useState } from "react";

// Mock user data
const mockUser = {
  id: "demo-user-123",
  username: "demouser",
  firstName: "Demo",
  lastName: "User",
  email: "demo@example.com",
  subscription: "Free Trial",
  onboardingCompleted: true,
  splashesAllowed: 5,
  splashesUsed: 1,
};

// Define a type for the auth context value
interface AuthContextType {
  user: typeof mockUser | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: { mutateAsync: (data: any) => Promise<any>; isPending: boolean; data: any };
  logoutMutation: { mutateAsync: () => Promise<void>; isPending: boolean };
  registerMutation: { mutateAsync: (data: any) => Promise<any>; isPending: boolean; data: any };
}

// Create the context with a default undefined value, or a specific default if preferred
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // For demo purposes, we always have a user
  const [user, setUser] = useState<typeof mockUser | null>(mockUser);
  const isLoading = false; // Not loading in mock
  const error = null; // No error in mock

  // Mock login mutation
  const loginMutation = {
    mutateAsync: async (data: any) => {
      console.log("Mock login with:", data);
      setUser(mockUser); // Set to mock user on login
      return mockUser;
    },
    isPending: false,
    data: mockUser, // Simulate successful login data
  };

  // Mock logout mutation
  const logoutMutation = {
    mutateAsync: async () => {
      console.log("Mock logout");
      setUser(null); // Clear user on logout
    },
    isPending: false,
  };

  // Mock register mutation
  const registerMutation = {
    mutateAsync: async (data: any) => {
      console.log("Mock register with:", data);
      setUser(mockUser); // Set to mock user on register
      return mockUser;
    },
    isPending: false,
    data: mockUser, // Simulate successful registration data
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
