import { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

export interface Page<Type> {
  server: (data: { req: Request; res: Response }) => Promise<Type | { redirect: string }>;
  render: (data: Type) => React.ReactNode;
}

function getBasePath(isBackend: boolean) {
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDirPath = path.dirname(currentFilePath);
  return path.join(currentDirPath, '..', '..', isBackend ? 'backend/pages' : 'frontend/pages');
}

async function loadBackendPage(filePath: string): Promise<{ server: Page<any>['server'] } | null> {
  try {
    const page = await import(/* @vite-ignore */ filePath);
    return { server: page.default };
  } catch (error) {
    console.error(`Error loading backend page: ${filePath}`, error);
    return null;
  }
}

async function loadFrontendPage(filePath: string): Promise<{ render: Page<any>['render'] } | null> {
  try {
    const page = await import(/* @vite-ignore */ filePath);
    return { render: page.default };
  } catch (error) {
    console.error(`Error loading frontend page: ${filePath}`, error);
    return null;
  }
}

export async function getPageForUrl(url: string): Promise<Page<any> | null> {
  const normalizedUrl = url === '/' ? '/index' : url;
  const backendPath = `${getBasePath(true)}${normalizedUrl}.ts`;
  const frontendPath = `${getBasePath(false)}${normalizedUrl}.tsx`;

  try {
    const backendPage = await loadBackendPage(backendPath);
    const frontendPage = await loadFrontendPage(frontendPath);

    if (backendPage && frontendPage) {
      return {
        server: backendPage.server,
        render: frontendPage.render,
      };
    }
  } catch (error) {
    console.error(`Error loading page for URL ${url}:`, error);
  }
  return null;
}
