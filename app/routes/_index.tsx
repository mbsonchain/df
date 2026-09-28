import {Link} from 'react-router';
export function meta() {return [{title:'Formal'}];}
export default function Home() {
  return <section className="landing" aria-label="Enter Formal"><Link to="/gallery" className="formal-wordmark" aria-label="Formal — enter the gallery">FORMAL</Link><p className="landing-caption">clothing, objects & everything around them</p><Link className="enter-link" to="/gallery">enter ↗</Link></section>;
}
