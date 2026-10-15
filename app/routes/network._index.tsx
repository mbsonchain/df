import {useSearchParams} from 'react-router';
import {DesertFeed} from '~/components/DesertFeed';
import {viewIndex} from '~/content/views';
export function meta(){return [{title:'Network — FORMAL'}];}
export default function Network(){
  const [params]=useSearchParams();
  const view=viewIndex('network', params.get('view'));
  return view === 0
    ? <section className="network-page network-view-0 desert-camo" aria-label="desert"/>
    : <section className="network-page network-view-1"><DesertFeed/></section>;
}
