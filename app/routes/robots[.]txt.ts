import type {LoaderFunctionArgs} from 'react-router';
import {isPublicSite} from '~/lib/crawling';

export function loader({request}: LoaderFunctionArgs) {
  const rules = isPublicSite(request)
    ? 'User-agent: *\nAllow: /\nDisallow: /embed/\nDisallow: /cart\n'
    : 'User-agent: *\nDisallow: /\n';
  return new Response(rules, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
