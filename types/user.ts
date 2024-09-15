export interface User {
  id: string;
  email: string;
  last_access: string | null;
  active_org: string | null;
  created_at: string;
  updated_at: string;
  events_left: number;
  last_events_update: string | null;
}
