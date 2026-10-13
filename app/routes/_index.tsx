import {Link} from 'react-router';
import {homeOnly} from '~/lib/launch';

export function meta() {return [{title:'Formal'}];}

function Wordmark() {
  return <>FORM<span className="formal-marked-letter">A<svg
    className="formal-anarchy"
    viewBox="0 0 120 120"
    fill="none"
    stroke="currentColor"
    strokeWidth="4.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M84 15C58 2 22 12 12 42C1 75 19 105 51 109C83 115 110 92 110 61C112 34 91 11 65 10" />
    <path d="M25 98C37  70 50  40 63 20" />
    <path d="M63 20C66 41 79 78 92 101M23 71C43 67 73 66 98 62" />
  </svg></span>L</>;
}

export default function Home() {
  return <section className="landing" aria-label="Formal">{homeOnly
    ? <span className="formal-wordmark locked-entry" role="link" aria-disabled="true" aria-label="Formal"><Wordmark /></span>
    : <Link to="/gallery" className="formal-wordmark" aria-label="Formal — enter the gallery"><Wordmark /></Link>}
  </section>;
}
