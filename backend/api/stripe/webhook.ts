import { createApiHandler } from '@backend/core/apiHandler';
import { stripeWebhookSchema } from '@backend/schemas/stripe';
import { StripeService } from '@backend/services/StripeService';
import { buffer } from 'micro';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default createApiHandler({
  method: 'POST',
  schema: stripeWebhookSchema,
  handler: async (_, { req }) => {
    const sig = req.headers['stripe-signature'] as string;
    const reqBuffer = await buffer(req);

    try {
      await StripeService.handleWebhook(reqBuffer, sig);
      return { received: true };
    } catch (err: any) {
      console.error('Error processing webhook:', err);
      throw new Error(`Webhook Error: ${err.message}`);
    }
  },
});
