import { z } from 'zod';

export const listOrganizationMembersSchema = {
  input: z.object({
    organizationId: z.string().uuid(),
  }),
  output: z.object({
    members: z.array(
      z.object({
        id: z.string(),
        organization_id: z.string(),
        user_id: z.string(),
        email: z.string(),
        membership_type: z.enum(['owner', 'admin', 'member']),
        created_at: z.string(),
        updated_at: z.string(),
      }),
    ),
  }),
};

export const addOrganizationMemberSchema = {
  input: z.object({
    organizationId: z.string().uuid(),
    email: z.string().email(),
    membershipType: z.enum(['admin', 'member']),
  }),
  output: z.object({
    member: z.object({
      id: z.string(),
      organization_id: z.string(),
      user_id: z.string(),
      email: z.string(),
      membership_type: z.enum(['admin', 'member']),
      created_at: z.string(),
      updated_at: z.string(),
    }),
  }),
};
