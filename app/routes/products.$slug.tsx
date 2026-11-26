import {
  isRouteErrorResponse, redirect, useLoaderData, useRouteError,
  type LoaderFunctionArgs, type MetaFunction,
} from 'react-router';
import {Artwork} from '~/components/Artwork';
import {products} from '~/content/products';
import {galleryViewLinks} from '~/content/views';

const retiredStudies = new Set([
  'study-shirt', 'everyday-cap', 'field-tote', 'studio-shirt', 'collected-pages',
  'small-vessel', 'day-shirt', 'canvas-cap', 'market-tote', 'studio-notebook',
  'table-vessel', 'night-shirt', 'field-cap', 'weekend-tote', 'field-notes',
  'tall-vessel', 'travel-shirt', 'sun-cap', 'archive-tote', 'collected-studies',
]);

export function loader({params, request}: LoaderFunctionArgs) {
  const slug = params.slug ?? '';
  const product = products.find(item => item.slug === slug);
  if (product) {
    const fromGrid = new URL(request.url).searchParams.get('view') === 'all';
    return {product, galleryHref: fromGrid ? galleryViewLinks[1] : `/gallery?item=${product.slug}`};
  }
  if (retiredStudies.has(slug)) throw redirect('/gallery', 301);
  throw new Response('Piece not found', {status: 404});
}

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {title: data ? `${data.product.name} — FORMAL` : 'Gallery — FORMAL'},
];

export default function ProductPage() {
  const {product} = useLoaderData<typeof loader>();

  return <article className="product-page" aria-labelledby="product-name">
    <figure className="product-study">
      <Artwork kind={product.art}/>
      <figcaption>
        <h1 id="product-name">{product.name}</h1>
        <p id="product-release-note" className="product-release-note">Release date to be announced.</p>
      </figcaption>
    </figure>
    <details className="product-release" aria-owns="product-release-note" onKeyDown={event => {
      if (event.key === 'Escape') event.currentTarget.open = false;
    }}>
      <summary className="product-option" aria-controls="product-release-note">coming soon</summary>
    </details>
  </article>;
}

export function ErrorBoundary() {
  const error = useRouteError();
  return <article className="product-missing">
    <h1>{isRouteErrorResponse(error) && error.status === 404 ? 'Piece not found.' : 'This piece is temporarily unavailable.'}</h1>
  </article>;
}
