import {useNonce} from '@shopify/hydrogen';
import {Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation} from 'react-router';
import {Shell} from '~/components/Shell';
import {viewIndex} from '~/content/views';
import skeletonStyles from '~/styles/skeleton.css?url';

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
        <meta name="robots" content="noindex, nofollow" />
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
  return <Shell><Outlet /></Shell>;
}

export function ErrorBoundary() {
  return <p>This page is temporarily unavailable.</p>;
}
