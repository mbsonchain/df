import {useEffect, useRef} from 'react';
import {Link, useLocation, useNavigationType} from 'react-router';
import {desertOfferings} from '~/content/desert';
import {DesertMedia} from '~/components/DesertMedia';

const returnKey = 'formal:desert:return-offering';

function scrollToOffering(region: HTMLDivElement | null, index: number, behavior: ScrollBehavior) {
  const entry = region?.children.item(index);
  if (!region || !(entry instanceof HTMLElement)) return;
  region.scrollTo({
    top: entry.getBoundingClientRect().top - region.getBoundingClientRect().top + region.scrollTop,
    behavior,
  });
}

function rememberOffering(id: string) {
  try { window.sessionStorage.setItem(returnKey, id); } catch { /* Navigation still works without storage. */ }
}

export function DesertFeed() {
  const feed = useRef<HTMLDivElement>(null);
  const {hash} = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (!window.matchMedia('(max-width: 760px)').matches) return;
    let id = hash.startsWith('#offering-') ? hash.slice('#offering-'.length) : '';
    if (!id && navigationType === 'POP') {
      try { id = window.sessionStorage.getItem(returnKey) || ''; } catch { /* Start at the first card. */ }
    }
    const index = desertOfferings.findIndex(item => item.id === id);
    if (index < 0) return;
    const frame = requestAnimationFrame(() => scrollToOffering(feed.current, index, 'instant'));
    return () => cancelAnimationFrame(frame);
  }, [hash, navigationType]);

  function goTo(index: number) {
    scrollToOffering(feed.current, index, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth');
  }

  return <div className="desert-feed" ref={feed} role="region" aria-label="desert offerings">
    {desertOfferings.map((item, index) => <article className="desert-entry" id={`offering-${item.id}`} key={item.id} aria-labelledby={`desert-${item.id}`}>
      <Link className="desert-content desert-card-link" to={`/network/desert/${item.id}`} aria-labelledby={`desert-${item.id}`} onClick={() => rememberOffering(item.id)}>
        <div className="desert-meta"><span>{item.location}</span><span>{item.detail}</span></div>
        <DesertMedia kind={item.kind}/>
        <h2 id={`desert-${item.id}`}>{item.title}</h2>
        <p>{item.description}</p>
      </Link>
      <div className="desert-steps">
        <button type="button" aria-label="Previous offering" disabled={index === 0} onClick={() => goTo(index - 1)}>↑</button>
        <button type="button" aria-label="Next offering" disabled={index === desertOfferings.length - 1} onClick={() => goTo(index + 1)}>↓</button>
      </div>
    </article>)}
  </div>;
}
