import { authenticateUser } from '@backend/core/auth';
import { Request, Response } from 'express';
import { z } from 'zod';
import { User } from '../../types/user';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiHandlerOptions<InputType, OutputType, Authenticate extends boolean = false> {
  method: HttpMethod;
  schema: {
    input: z.ZodSchema<InputType>;
    output: z.ZodSchema<OutputType>;
  };
  handler: (
    data: InputType,
    context: {
      req: Request;
      res: Response;
      user: Authenticate extends true ? User : User | null;
    },
  ) => Promise<OutputType | { redirect: string }>;
  requiresAuth?: Authenticate;
}

export class ApiError extends Error {
  isApiError = true;
  constructor(readonly statusCode: number, message: string) {
    super(message);
  }
}

export function createApiHandler<InputType, OutputType, Authenticate extends boolean = false>({
  method,
  schema,
  handler,
  requiresAuth,
}: ApiHandlerOptions<InputType, OutputType, Authenticate>) {
  return {
    method,
    handler: async (req: Request, res: Response) => {
      if (req.method !== method) {
        return res.status(405).json({ error: 'Method Not Allowed' });
      }

      try {
        const data = schema.input.parse(['GET', 'DELETE'].includes(method) ? req.query : req.body);

        const user = await authenticateUser(req.headers?.cookie ?? '', (key, value) => {
          res.setHeader(key, value);
        });

        if (requiresAuth && !user) {
          throw new ApiError(403, 'User not authenticated');
        }

        const result = await handler(data, { req, res, user: user as any });

        if (result === undefined) {
          return res.status(204).end();
        } else if (typeof result === 'object' && result !== null) {
          if ('redirect' in result) {
            return res.redirect(302, result.redirect);
          }
          return res.status(200).json(schema.output.parse(result));
        } else {
          return res.status(200).send(result);
        }
      } catch (error: any) {
        if (error instanceof z.ZodError) {
          return res.status(400).json({ error: error.errors });
        }
        if (error instanceof ApiError) {
          return res.status(error.statusCode ?? 400).json({ error: error.message });
        }
        console.error('Error in API handler:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  };
}
