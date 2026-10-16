import {redirect} from 'react-router';

// Shopify's legacy /about redirect still points at this former page URL.
export function loader() {
  return redirect('/about', 301);
}
