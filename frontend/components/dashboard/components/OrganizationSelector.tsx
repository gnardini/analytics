import { Button, ButtonType } from '@frontend/components/common/Button';
import { ManageTeamModal } from '@frontend/components/dashboard/modals/ManageTeamModal';
import { WebsiteOnboardingModal } from '@frontend/components/settings/modals/WebsiteOnboardingModal';
import { PurchaseEventsModal } from '@frontend/components/dashboard/modals/PurchaseEventsModal';
import { useAuth } from '@frontend/context/AuthContext';
import { ChevronDown } from '@frontend/svgs/ChevronDown';
import { gray0 } from '@frontend/utils/colors';
import { amount } from '@frontend/utils/number';
import { Organization } from '@type/organization';
import React, { useEffect, useRef, useState } from 'react';
import { FiSettings } from 'react-icons/fi';

interface OrganizationSelectorProps {
  activeOrg: Organization;
  membershipType: string;
}

export const OrganizationSelector: React.FC<OrganizationSelectorProps> = ({ activeOrg, membershipType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManageTeamModalOpen, setIsManageTeamModalOpen] = useState(false);
  const [isPurchaseEventsModalOpen, setIsPurchaseEventsModalOpen] = useState(false);
  const { organizations, setActiveOrg, user } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOrganizationChange = (newOrg: Organization) => {
    setActiveOrg(newOrg);
    window.location.href = `/dashboard?org_id=${newOrg.id}`;
  };

  return (
    <div className="relative flex items-center justify-between">
      <div className="flex items-center" ref={dropdownRef}>
        <div className="flex items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <h1 className="text-3xl font-bold my-6 mr-2">{activeOrg.name}</h1>
          <ChevronDown color={gray0} size={24} />
        </div>
        {isOpen && (
          <div className="absolute z-20 w-[400px] top-16 left-0">
            <div className="bg-tertiary-background border border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {organizations.map((org) => (
                <div
                  key={org.id}
                  className={`p-2 cursor-pointer hover:bg-primary-accent hover:text-text-primary ${
                    org.id === activeOrg.id ? 'bg-primary-accent/80 text-text-primary' : ''
                  }`}
                  onClick={() => {
                    handleOrganizationChange(org);
                    setIsOpen(false);
                  }}
                >
                  {org.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center">
        {membershipType === 'owner' && (
          <Button
            type={ButtonType.Secondary}
            onClick={() => setIsPurchaseEventsModalOpen(true)}
            className="mr-2 py-2 px-3"
          >
            {amount(user.events_left)} events left
          </Button>
        )}
        <Button
          type={ButtonType.Secondary}
          onClick={() => setIsManageTeamModalOpen(true)}
          className="mr-2 py-2 px-3"
        >
          <FiSettings className="w-5 h-5" />
        </Button>
        <Button
          type={ButtonType.Primary}
          onClick={() => setIsModalOpen(true)}
          className="py-2 px-3"
        >
          Add Website
        </Button>
      </div>
      <WebsiteOnboardingModal visible={isModalOpen} closeModal={() => setIsModalOpen(false)} />
      <ManageTeamModal
        visible={isManageTeamModalOpen}
        closeModal={() => setIsManageTeamModalOpen(false)}
        organizationId={activeOrg.id}
        membershipType={membershipType}
      />
      <PurchaseEventsModal
        visible={isPurchaseEventsModalOpen}
        closeModal={() => setIsPurchaseEventsModalOpen(false)}
      />
    </div>
  );
};
