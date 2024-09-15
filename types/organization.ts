export interface Organization {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  setup_complete_at: string | null;
}

export interface ApiKey {
  id: string;
  organization_id: string;
  name: string | null;
  key: string;
  created_at: string;
  updated_at: string;
}

export interface OrgUser {
  id: string;
  organization_id: string;
  user_id: string;
  email: string;
  membership_type: 'owner' | 'admin' | 'member';
  created_at: string;
  updated_at: string;
}
