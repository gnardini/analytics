import { createApiHandler } from '@backend/core/apiHandler';
import { StripeService } from '@backend/services/StripeService';
import { stripeSchema } from '@backend/schemas/stripe';

export default createApiHandler({
  method: 'POST',
  schema: stripeSchema,
  requiresAuth: true,
  handler: async ({ amount }, { user }) => {
    return await StripeService.createCheckoutSession(amount, user.id);
  },
});