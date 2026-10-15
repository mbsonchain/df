import {redirect, type LoaderFunctionArgs} from 'react-router';

// Keep links to the earlier desert feed working after its move to FORMAL.
export function loader({params, request}: LoaderFunctionArgs) {
  const search = new URL(request.url).search;
  return redirect(`/network/formal/${encodeURIComponent(params.slug ?? '')}${search}`, 302);
}
