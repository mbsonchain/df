import {ServerRouter} from 'react-router';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {
  createContentSecurityPolicy,
  type HydrogenRouterContextProvider,
} from '@shopify/hydrogen';
import type {EntryContext} from 'react-router';
import {isCatalogEmbedPath} from '~/lib/catalog-embed';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
  context: HydrogenRouterContextProvider,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    scriptSrc: ["'self'", 'https://cdn.shopify.com', 'https://static.klaviyo.com', 'https://static-tracking.klaviyo.com'],
    connectSrc: ['https://a.klaviyo.com', 'https://fast.a.klaviyo.com', 'https://static-forms.klaviyo.com'],
    mediaSrc: ["'self'", 'https://media.strikeout.us', 'https://cdn.shopify.com'],
    imgSrc: ["'self'", 'data:', 'https://cdn.shopify.com', 'https://shopify.com', 'https://media.strikeout.us', 'https://www.strikeout.us'],
    frameAncestors: isCatalogEmbedPath(new URL(request.url).pathname)
      ? ["'self'", 'https://strikeout.us', 'https://www.strikeout.us', ...(import.meta.env.DEV ? ['http://127.0.0.1:4173', 'http://localhost:4173'] : [])]
      : ["'none'"],
    styleSrc: ["'self'", 'https://cdn.shopify.com', 'https://use.typekit.net', 'https://p.typekit.net', 'https://static.klaviyo.com'],
    fontSrc: ["'self'", 'https://use.typekit.net', 'https://cdn.shopify.com'],
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <ServerRouter
        context={reactRouterContext}
        url={request.url}
        nonce={nonce}
      />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
