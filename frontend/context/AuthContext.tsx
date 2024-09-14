import { Organization } from '@type/organization';
import { User } from '@type/user';
import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: User;
  setUser: (user: User) => void;
  organizations: Organization[];
  addOrganization: (org: Organization) => void;
  activeOrg: Organization | null;
  setActiveOrg: (org: Organization) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{
  children: React.ReactNode;
  user: User;
  organizations: Organization[];
  activeOrg: Organization | null;
}> = ({
  children,
  user: initialUser,
  organizations: initialOrganizations,
  activeOrg: initialActiveOrg,
}) => {
  const [user, setUser] = useState<User>(initialUser);
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations);
  const [activeOrg, setActiveOrg] = useState<Organization | null>(initialActiveOrg);

  const addOrganization = (org: Organization) => {
    setOrganizations((prev) => [...prev, org]);
    setActiveOrg(org);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, organizations, addOrganization, activeOrg, setActiveOrg }}
    >
      {children}
    </AuthContext.Provider>
  );
};
