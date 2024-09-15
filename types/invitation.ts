export interface Invitation {
  organizationName: string;
  membershipType: 'admin' | 'member';
  email: string;
}