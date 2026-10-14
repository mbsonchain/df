import type {desertOfferings} from '~/content/desert';

export function DesertMedia({kind}: {kind: (typeof desertOfferings)[number]['kind']}) {
  return <div className={`desert-frame desert-frame-${kind}`} role="img" aria-label={`${kind} placeholder`}>
    {kind === 'video' ? <span className="desert-play" aria-hidden="true">▷</span> : null}
    {kind === 'article' || kind === 'text'
      ? <span className="desert-text-lines" aria-hidden="true"><span/><span/><span/></span>
      : <span>{kind}</span>}
  </div>;
}
