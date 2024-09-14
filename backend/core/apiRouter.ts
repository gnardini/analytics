import { initCronJobs } from '@backend/core/cron';
import { json, Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDatabase } from '../db/db';

async function getHandlerForPath(filePath: string) {
  try {
    const handler = await import(/* @vite-ignore */ filePath);
    return handler.default;
  } catch (error) {
    console.error(`Error loading API handler for ${filePath}:`, error);
    return null;
  }
}

async function generateRoutes(router: Router, dir: string, basePath: string = '') {
  const entries = fs.readdirSync(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const routePath = path
      .join(basePath, entry.replace('index', '').replace(/\.ts$/, ''))
      .replace(/\/$/, '');

    if (fs.statSync(fullPath).isDirectory()) {
      await generateRoutes(router, fullPath, routePath);
    } else if (fs.statSync(fullPath).isFile() && entry.endsWith('.ts')) {
      const handler = await getHandlerForPath(fullPath);
      if (handler && typeof handler.method === 'string') {
        const method = handler.method.toLowerCase() as keyof Router;
        if (method in router && typeof router[method] === 'function') {
          (router[method] as Function)(`/${routePath}`, handler.handler);
        }
      }
    }
  }
}

export async function apiRouter() {
  await initDatabase();
  initCronJobs();

  const router = Router();
  router.use(json());

  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDirPath = path.dirname(currentFilePath);
  const apiDir = path.join(currentDirPath, '..', 'api');

  await generateRoutes(router, apiDir);

  return router;
}
