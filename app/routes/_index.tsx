import {Link} from 'react-router';
import {homeOnly} from '~/lib/launch';

export function meta() {return [{title:'Formal'}];}

function Wordmark() {
  return <>FORM<span className="formal-marked-letter">A<svg
    className="formal-anarchy"
    viewBox="0 0 120 120"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <path id="formal-anarchy-strokes" d="M104 57C107 82 88 101 63 102C36 103 16 83 16 59C16 34 35 16 60 16C83 16 103 32 104 57ZM18 110L59 7L103 111M8 70L112 70" />
      <filter id="formal-paint-mist" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="1.4" />
      </filter>
      <filter id="formal-paint-speckle" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="1.35" numOctaves="1" seed="18" result="noise" />
        <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 12 0 -6.9" result="dots" />
        <feComposite in="SourceGraphic" in2="dots" operator="in" />
      </filter>
      <filter id="formal-paint-body" x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency=".48" numOctaves="3" seed="7" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" result="rough" />
        <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 3.5 0 -.95" result="grain" />
        <feComposite in="rough" in2="grain" operator="in" />
      </filter>
    </defs>
    <use href="#formal-anarchy-strokes" strokeWidth="11" opacity=".22" filter="url(#formal-paint-mist)" />
    <use href="#formal-anarchy-strokes" strokeWidth="15" opacity=".65" filter="url(#formal-paint-speckle)" />
    <use href="#formal-anarchy-strokes" strokeWidth="6.4" filter="url(#formal-paint-body)" />
  </svg></span>L</>;
}

export default function Home() {
  return <section className="landing" aria-label="Formal">{homeOnly
    ? <span className="formal-wordmark locked-entry" role="link" aria-disabled="true" aria-label="Formal"><Wordmark /></span>
    : <Link to="/gallery" className="formal-wordmark" aria-label="Formal — enter the gallery"><Wordmark /></Link>}
  </section>;
}
