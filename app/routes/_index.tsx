import {Link} from 'react-router';
import {homeOnly} from '~/lib/launch';
export function meta() {return [{title:'Formal'}];}
export default function Home() {
  return <section className="landing" aria-label="Formal">{homeOnly
    ? <span className="formal-wordmark locked-entry" role="link" aria-disabled="true" aria-label="Formal">FORMAL</span>
    : <Link to="/gallery" className="formal-wordmark" aria-label="Formal — enter the gallery">FORMAL</Link>}
  </section>;
}
