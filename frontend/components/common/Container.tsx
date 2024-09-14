import { Tab } from '@type/tabs';
import React from 'react';
import { Dropdown } from './Dropdown';
import { Organization } from '@type/organization';
import { useAuth } from '@frontend/context/AuthContext';

interface ContainerProps {
  children: React.ReactNode;
  activeTab: Tab;
  showSideBar?: boolean;
  className?: string;
}

export function Container({
  children,
  activeTab,
  showSideBar,
  className = 'flex-1 p-6 overflow-auto',
}: ContainerProps) {
  const { organizations, activeOrg, setActiveOrg } = useAuth();

  const navItems = [
    { tab: Tab.App, label: 'Dashboard', href: '/dashboard' },
    { tab: Tab.Settings, label: 'Settings', href: '/settings' },
  ];

  const onOrganizationChange = (newActiveOrg: Organization) => {
    setActiveOrg(newActiveOrg);
    const href = navItems.find((item) => item.tab === activeTab)?.href;
    window.location.href = `${href}?org_id=${newActiveOrg.id}`;
  };

  return (
    <div className="flex h-screen">
      {showSideBar && (
        <div className="w-64 bg-secondary-background p-4">
          <Dropdown<Organization>
            options={organizations}
            selectedOption={activeOrg}
            setSelectedOption={onOrganizationChange}
            renderOption={(org) => <span>{org.name}</span>}
            placeholder="Select organization"
            label="Organization"
            className="w-full"
            bgColor="bg-tertiary-background"
          />
          <nav className="mt-8 gap-2">
            {navItems.map(({ tab, label, href }) => (
              <a
                key={tab}
                href={href}
                className={`block py-2 px-4 ${
                  activeTab === tab ? 'bg-primary-accent text-white' : 'text-text-primary'
                } rounded`}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
      <div className={className}>{children}</div>
    </div>
  );
}
