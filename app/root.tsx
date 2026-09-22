import {useNonce} from '@shopify/hydrogen';
import {Links, Meta, Outlet, Scripts, ScrollRestoration} from 'react-router';
import {Shell} from '~/components/Shell';
import skeletonStyles from '~/styles/skeleton.css?url';

export function links() {return [{rel: 'stylesheet', href: skeletonStyles}];}

export function Layout({children}: {children?: React.ReactNode}) {
  const nonce = useNonce();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
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
