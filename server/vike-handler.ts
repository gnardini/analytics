/// <reference lib="webworker" />
import { renderPage } from "vike/server";
import type { Get, UniversalHandler } from "@universal-middleware/core";

export const vikeHandler: Get<[], UniversalHandler> = () => async (request, context, runtime) => {
  const pageContextInit = { ...context, ...runtime, urlOriginal: request.url, headersOriginal: request.headers };
  const pageContext = await renderPage(pageContextInit);
  const response = pageContext.httpResponse;

  const { readable, writable } = new TransformStream();
  response.pipe(writable);

  return new Response(readable, {
    status: response.statusCode,
    headers: response.headers,
  });
};
