
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { Identity } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

interface AuthContextType {
  isAuthenticated: boolean;
  principal: string | null;
  identity: Identity | null;
  authClient: AuthClient | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState<string | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const client = await AuthClient.create();
      setAuthClient(client);

      const isAuthenticated = await client.isAuthenticated();
      if (isAuthenticated) {
        const identity = client.getIdentity();
        const principal = identity.getPrincipal().toString();
        
        setIsAuthenticated(true);
        setIdentity(identity);
        setPrincipal(principal);
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    if (!authClient) return;

    try {
      setLoading(true);
      await new Promise<void>((resolve, reject) => {
        authClient.login({
          identityProvider: process.env.DFX_NETWORK === "local" 
            ? `http://localhost:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai`
            : "https://identity.ic0.app/#authorize",
          onSuccess: () => resolve(),
          onError: (error) => reject(error),
          windowOpenerFeatures: "toolbar=0,location=0,menubar=0,width=500,height=500,left=100,top=100",
        });
      });

      const identity = authClient.getIdentity();
      const principal = identity.getPrincipal().toString();
      
      setIsAuthenticated(true);
      setIdentity(identity);
      setPrincipal(principal);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (!authClient) return;

    try {
      await authClient.logout();
      setIsAuthenticated(false);
      setIdentity(null);
      setPrincipal(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    principal,
    identity,
    authClient,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
