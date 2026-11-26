import {useNonce} from '@shopify/hydrogen';
import {Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, useLocation, type LoaderFunctionArgs} from 'react-router';
import {Shell} from '~/components/Shell';
import {viewIndex} from '~/content/views';
import skeletonStyles from '~/styles/skeleton.css?url';
import {isCatalogEmbedPath} from '~/lib/catalog-embed';
import {siteForAccess} from '~/lib/regional-site';

export function loader({request}: LoaderFunctionArgs) {
  if (isCatalogEmbedPath(new URL(request.url).pathname)) return {siteId: null};
  return {siteId: siteForAccess(request.headers)};
}

// The document and route data contain the regional site selected for this request.
export function headers() {return {'Cache-Control': 'private, no-store'};}

export function links() {return [{rel: 'stylesheet', href: 'https://use.typekit.net/sji2png.css'}, {rel: 'stylesheet', href: skeletonStyles}];}

export function Layout({children}: {children?: React.ReactNode}) {
  const nonce = useNonce();
  const {pathname, search} = useLocation();
  const desert = pathname === '/network' && viewIndex('network', new URLSearchParams(search).get('view')) === 0;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content={`width=device-width,initial-scale=1${desert ? ',viewport-fit=cover' : ''}`} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  const {pathname} = useLocation();
  const {siteId} = useLoaderData<typeof loader>();
  if (isCatalogEmbedPath(pathname)) return <Outlet />;
  return <Shell accessSiteId={siteId}><Outlet /></Shell>;
}

export function ErrorBoundary() {
  return <p>This page is temporarily unavailable.</p>;
}
