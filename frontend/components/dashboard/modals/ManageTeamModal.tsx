import { Button, ButtonType } from '@frontend/components/common/Button';
import { Input } from '@frontend/components/common/Input';
import { Modal } from '@frontend/components/common/Modal';
import { useAddOrganizationMemberQuery } from '@frontend/queries/organizations/useAddOrganizationMemberQuery';
import { useListOrganizationMembersQuery } from '@frontend/queries/organizations/useListOrganizationMembersQuery';
import { OrgUser } from '@type/organization';
import React, { useEffect, useState } from 'react';

interface ManageTeamModalProps {
  visible: boolean;
  closeModal: () => void;
  organizationId: string;
}

export const ManageTeamModal: React.FC<ManageTeamModalProps> = ({
  visible,
  closeModal,
  organizationId,
}) => {
  const [email, setEmail] = useState('');
  const [membershipType, setMembershipType] = useState<'admin' | 'member'>('member');

  const {
    execute: listMembers,
    loading: listLoading,
    error: listError,
  } = useListOrganizationMembersQuery();
  const {
    execute: addMember,
    loading: addLoading,
    error: addError,
  } = useAddOrganizationMemberQuery();

  const [members, setMembers] = useState<OrgUser[]>([]);

  useEffect(() => {
    if (visible) {
      listMembers({ organizationId }).then((response) => {
        if (response.members) {
          setMembers(response.members);
        }
      });
    }
  }, [visible, organizationId]);

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    const response = await addMember({ organizationId, email, membershipType });
    if (response.member) {
      setMembers([...members, response.member]);
      setEmail('');
    }
  };

  return (
    <Modal visible={visible} closeModal={closeModal} className="w-full max-w-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Team</h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Current Members</h3>
        {listLoading ? (
          <p>Loading members...</p>
        ) : listError ? (
          <p className="text-red-500">Error loading members: {JSON.stringify(listError)}</p>
        ) : (
          <ul className="space-y-2">
            {members.map((member) => (
              <li key={member.id} className="flex justify-between items-center">
                <span>{member.email}</span>
                <span className="text-sm text-gray-400">{member.membership_type}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <form onSubmit={handleAddMember} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Add New Member
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="membershipType" className="block text-sm font-medium mb-1">
            Membership Type
          </label>
          <select
            id="membershipType"
            value={membershipType}
            onChange={(e) => setMembershipType(e.target.value as 'admin' | 'member')}
            className="w-full py-1 px-1 bg-tertiary-background text-text-primary rounded-md border-2 border-transparent focus:border-primary-accent focus:outline-none shadow-sm"
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <Button type={ButtonType.Primary} className="w-full py-2" disabled={addLoading}>
          {addLoading ? 'Adding...' : 'Add Member'}
        </Button>
      </form>
      {addError && <p className="text-red-500 mt-2">Error adding member: {addError}</p>}
    </Modal>
  );
};
