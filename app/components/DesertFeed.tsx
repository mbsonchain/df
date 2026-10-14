import {useRef} from 'react';
import {desertOfferings} from '~/content/desert';

export function DesertFeed() {
  const feed = useRef<HTMLDivElement>(null);

  function goTo(index: number) {
    const region = feed.current;
    const entry = region?.children.item(index);
    if (!region || !(entry instanceof HTMLElement)) return;
    region.scrollTo({
      top: entry.getBoundingClientRect().top - region.getBoundingClientRect().top + region.scrollTop,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }

  return <div className="desert-feed" ref={feed} role="region" aria-label="desert offerings">
    {desertOfferings.map((item, index) => <article className="desert-entry" key={item.id} aria-labelledby={`desert-${item.id}`}>
      <div className="desert-content">
        <div className="desert-meta"><span>{item.location}</span><span>{item.detail}</span></div>
        <div className={`desert-frame desert-frame-${item.kind}`} role="img" aria-label={`${item.kind} placeholder`}>
          {item.kind === 'video' ? <span className="desert-play" aria-hidden="true">▷</span> : null}
          {item.kind === 'article' || item.kind === 'text'
            ? <span className="desert-text-lines" aria-hidden="true"><span/><span/><span/></span>
            : <span>{item.kind}</span>}
        </div>
        <h2 id={`desert-${item.id}`}>{item.title}</h2>
        <p>{item.description}</p>
      </div>
      <div className="desert-steps">
        <button type="button" aria-label="Previous offering" disabled={index === 0} onClick={() => goTo(index - 1)}>↑</button>
        <button type="button" aria-label="Next offering" disabled={index === desertOfferings.length - 1} onClick={() => goTo(index + 1)}>↓</button>
      </div>
    </article>)}
  </div>;
}
