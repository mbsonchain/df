import {Link, useLoaderData, isRouteErrorResponse, useRouteError} from 'react-router';
import type {LoaderFunctionArgs, MetaFunction} from 'react-router';
import {desertOfferings} from '~/content/desert';
import {mediaLibrary} from '~/content/media';
import {DesertMedia} from '~/components/DesertMedia';

export function loader({params}: LoaderFunctionArgs) {
  const offering = desertOfferings.find(item => item.id === params.slug);
  if (!offering) throw new Response('Offering not found', {status: 404});
  return {offering};
}

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {title: data ? `${data.offering.title} — FORMAL` : 'FORMAL'},
];

export default function FormalOffering() {
  const {offering} = useLoaderData<typeof loader>();
  return <article className="desert-detail" aria-labelledby="offering-title">
    <Link className="desert-back" to={`/network?view=formal#offering-${offering.id}`}>← back to FORMAL</Link>
    <div className="desert-meta"><span>{offering.location}</span><span>{offering.detail}</span></div>
    <DesertMedia item={offering} detail/>
    <h1 id="offering-title">{offering.title}</h1>
    <p className="desert-description">{offering.description}</p>
    {offering.id === 'note' && mediaLibrary.collectiveNote ? mediaLibrary.collectiveNote.map(paragraph => <p className="formal-note-paragraph" key={paragraph}>{paragraph}</p>) : null}
    {offering.id === 'conamore-launch' && !mediaLibrary.launchVideo ? <p className="desert-placeholder-note">launch film to be added.</p> : null}
    {offering.id === 'note' && !mediaLibrary.collectiveNote ? <p className="desert-placeholder-note">the collective’s note will appear here.</p> : null}
    {offering.id === 'amore-point' && !mediaLibrary.amorePointImages.length ? <p className="desert-placeholder-note">collage layout draft — photographs to be selected.</p> : null}
    {offering.href ? <a className="read-link" href={offering.href}>open {offering.title} →</a> : null}
  </article>;
}

export function ErrorBoundary() {
  const error = useRouteError();
  return <article className="desert-detail">
    <Link className="desert-back" to="/network?view=formal">← back to FORMAL</Link>
    <h1>{isRouteErrorResponse(error) && error.status === 404 ? 'offering not found.' : 'this offering is temporarily unavailable.'}</h1>
  </article>;
}
