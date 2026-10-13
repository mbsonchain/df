// The current site is public. A deliberate build setting can restore Home-only mode.
// This is compiled into both the server and client, keeping hydration consistent.
export const homeOnly = !import.meta.env.DEV && import.meta.env.VITE_FORMAL_HOME_ONLY === 'true';

export function launchResponse(request: Request): Response | undefined {
  if (!homeOnly) return;

  const {pathname} = new URL(request.url);
  const read = request.method === 'GET' || request.method === 'HEAD';

  if (read && pathname === '/robots.txt') {
    return new Response(request.method === 'HEAD' ? null : 'User-agent: *\nDisallow: /\n', {
      headers: {'Content-Type': 'text/plain; charset=utf-8'},
    });
  }

  // Static assets are normally served by Oxygen before reaching this handler.
  // The other two paths are React Router's data and route-discovery endpoints.
  if (read && (pathname === '/' || pathname === '/_root.data' || pathname === '/__manifest' || pathname.startsWith('/assets/'))) return;

  // Guard before creating a Shopify context: drafts and cart actions stay closed.
  return new Response(null, {
    status: read ? 302 : 303,
    headers: {Location: '/', 'Cache-Control': 'no-store'},
  });
}
