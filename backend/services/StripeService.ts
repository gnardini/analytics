import { PUBLIC_APP_URL, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '@backend/config';
import Stripe from 'stripe';
import { UsersService } from './UsersService';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

const PRICE_PER_1M_EVENTS = 10;
const PRICE_PER_100K_EVENTS = 5;

export const StripeService = {
  createCheckoutSession: async (amount: number, userId: string) => {
    let eventsToAdd: number;

    if (amount === PRICE_PER_100K_EVENTS) {
      eventsToAdd = 100_000;
    } else {
      eventsToAdd = Math.floor((amount * 1_000_000) / PRICE_PER_1M_EVENTS);
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Phinxer Credits',
              description: `${eventsToAdd.toLocaleString()} events, they expire in 1 year`,
            },
            unit_amount: amount * 100, // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${PUBLIC_APP_URL}/dashboard?stripe_success=true`,
      cancel_url: `${PUBLIC_APP_URL}/dashboard?stripe_cancel=true`,
      metadata: {
        user_id: userId,
        events: eventsToAdd.toString(),
      },
    });

    return { sessionId: checkoutSession.id, url: checkoutSession.url };
  },

  handleWebhook: async (payload: Buffer, signature: string): Promise<void> => {
    try {
      const event = stripe.webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET);
      console.log({
        event,
      });

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.user_id;
        const eventsToAdd = session.metadata?.events;

        if (!userId || !eventsToAdd) {
          throw new Error('Missing user_id or events in session metadata');
        }

        await UsersService.addCreditsToUser(userId, parseInt(eventsToAdd, 10));
      }
    } catch (error) {
      console.error('Error processing Stripe webhook:', error);
      throw error;
    }
  },
};
