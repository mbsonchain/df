import {Link} from 'react-router';
import {homeOnly} from '~/lib/launch';

export function meta() {return [{title:'Formal'}];}

function Wordmark() {
  return <>FORM<span className="formal-marked-letter">A<svg
    className="formal-anarchy"
    viewBox="120 120 1340 1420"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <filter id="formal-brush-pink" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        {/* Boost reference ink coverage to solid pink while keeping white brush gaps transparent. */}
        <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  3 -3 0 0 0" result="ink" />
        <feFlood floodColor="currentColor" result="pink" />
        <feComposite in="pink" in2="ink" operator="in" />
      </filter>
    </defs>
    <image href="/formal-anarchy-brush-source.webp" width="1600" height="1600" filter="url(#formal-brush-pink)" />
  </svg></span>L</>;
}

export default function Home() {
  return <section className="landing" aria-label="Formal">{homeOnly
    ? <span className="formal-wordmark locked-entry" role="link" aria-disabled="true" aria-label="Formal"><Wordmark /></span>
    : <Link to="/gallery" className="formal-wordmark" aria-label="Formal — enter the gallery"><Wordmark /></Link>}
  </section>;
}
