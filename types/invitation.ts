export interface Invitation {
  organizationId: string;
  membershipType: 'admin' | 'member';
  email: string;
}
