import {Link, useLoaderData, isRouteErrorResponse, useRouteError} from 'react-router';
import type {LoaderFunctionArgs, MetaFunction} from 'react-router';
import {desertOfferings} from '~/content/desert';
import {DesertMedia} from '~/components/DesertMedia';

export function loader({params}: LoaderFunctionArgs) {
  const offering = desertOfferings.find(item => item.id === params.slug);
  if (!offering) throw new Response('Offering not found', {status: 404});
  return {offering};
}

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {title: data ? `${data.offering.title} — FORMAL` : 'desert — FORMAL'},
];

export default function DesertOffering() {
  const {offering} = useLoaderData<typeof loader>();
  return <article className="desert-detail" aria-labelledby="offering-title">
    <Link className="desert-back" to={`/network?view=desert#offering-${offering.id}`}>← back to desert</Link>
    <div className="desert-meta"><span>{offering.location}</span><span>{offering.detail}</span></div>
    <DesertMedia kind={offering.kind}/>
    <h1 id="offering-title">{offering.title}</h1>
    <p className="desert-description">{offering.description}</p>
    <p className="desert-placeholder-note">{offering.kind === 'article' || offering.kind === 'text' ? 'words' : offering.kind} coming soon.</p>
  </article>;
}

export function ErrorBoundary() {
  const error = useRouteError();
  return <article className="desert-detail">
    <Link className="desert-back" to="/network?view=desert">← back to desert</Link>
    <h1>{isRouteErrorResponse(error) && error.status === 404 ? 'offering not found.' : 'this offering is temporarily unavailable.'}</h1>
  </article>;
}
