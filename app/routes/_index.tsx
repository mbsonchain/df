import {Link} from 'react-router';
export function meta() {return [{title:'Formal'}];}
export default function Home() {
  return <section className="landing" aria-label="Enter Formal"><Link to="/gallery" className="formal-wordmark" aria-label="Formal — enter the gallery">FORMAL</Link></section>;
}
