import {useEffect, useRef} from 'react';
import {useSearchParams} from 'react-router';
import {DesertFeed} from '~/components/DesertFeed';
import {viewIndex} from '~/content/views';

export function meta(){return [{title:'Network — FORMAL'}];}

export default function Network(){
  const [params]=useSearchParams();
  const view=viewIndex('network', params.get('view'));
  const camoRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (view !== 0) return;
    const shell = camoRef.current?.closest<HTMLElement>('.site-shell');
    if (!shell) return;
    const mobile = window.matchMedia('(max-width: 760px), (hover: none) and (pointer: coarse)');
    const viewport = window.visualViewport;
    let frame = 0;
    const alignPage = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (viewport && viewport.scale > 1) return;
        // As on STRIKEOUT, keep real image pixels above/below the visible page for Safari's bars.
        window.scrollTo({top: mobile.matches ? shell.offsetTop : 0, left: 0, behavior: 'instant'});
      });
    };
    alignPage();
    window.addEventListener('pageshow', alignPage);
    window.addEventListener('resize', alignPage);
    viewport?.addEventListener('resize', alignPage);
    mobile.addEventListener('change', alignPage);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pageshow', alignPage);
      window.removeEventListener('resize', alignPage);
      viewport?.removeEventListener('resize', alignPage);
      mobile.removeEventListener('change', alignPage);
    };
  }, [view]);

  return view === 0
    ? <section ref={camoRef} className="network-page network-view-0 desert-camo" aria-label="desert"/>
    : <section className="network-page network-view-1"><DesertFeed/></section>;
}
