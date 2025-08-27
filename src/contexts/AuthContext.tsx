import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'health_worker' | 'registry_staff' | 'parent';
  avatar?: string;
  location?: string;
  facility?: string;
  licenseNumber?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call your API
    const mockUsers: User[] = [
      {
        id: '2',
        name: 'Justice Annan',
        email: 'justicea@gmxmail.com',
        role: 'parent',
        avatar: 'https://images.pexels.com/photos/612328/pexels-photo-612328.jpeg?w=150&h=150&fit=crop&crop=face',
        facility: 'Manila General Hospital',
        licenseNumber: 'MD-2024-001'
      },
      {
        id: '3',
        name: 'Rosa Martinez',
        email: 'rosa@civilregistry.gov.ph',
        role: 'registry_staff',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150&h=150&fit=crop&crop=face',
        facility: 'Manila Civil Registry Office'
      },
      {
        id: '4',
        name: 'Dr. Ana Rodriguez',
        email: 'ana@ruralhealth.ph',
        role: 'health_worker',
        avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?w=150&h=150&fit=crop&crop=face',
        facility: 'Rural Health Unit - Bataan',
        licenseNumber: 'MD-2024-002'
      },
      {
        id: '5',
        name: 'Midwife Elena Santos',
        email: 'elena@barangayhealth.ph',
        role: 'health_worker',
        avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?w=150&h=150&fit=crop&crop=face',
        facility: 'Barangay Health Station - Mindanao',
        licenseNumber: 'MW-2024-001'
      }
    ];

    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}