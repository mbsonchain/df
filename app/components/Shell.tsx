import {useEffect, useState} from 'react';
import {Link, NavLink, useLocation, useSearchParams} from 'react-router';
import {identity, locations} from '~/content/site';
import {galleryViews, networkViews, galleryViewKeys, networkViewKeys, viewIndex} from '~/content/views';

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return now;
}
const formats = new Map(locations.map(place => [place.zone, new Intl.DateTimeFormat('en-GB', {timeZone:place.zone, hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false})]));
function timeAt(now: Date | null, zone: typeof locations[number]['zone']) {
  return now ? formats.get(zone)!.format(now) : '--:--:--';
}
function WorldClocks() {
  const now = useClock();
  const [paused, setPaused] = useState(false);
  return <div className={`world-clock ${paused ? 'is-paused' : ''}`}>
    <div className="clock-track">{[0,1].map(copy => <div className="clock-run" key={copy} aria-hidden={copy === 1}>
      {locations.map(place => <span key={place.id} className="city-clock"><span>{place.name}</span><time>{timeAt(now,place.zone)}</time></span>)}
    </div>)}</div>
    <button className="clock-pause" aria-label={paused ? 'Resume moving clocks' : 'Pause moving clocks'} onClick={() => setPaused(!paused)}>{paused ? '▷' : 'Ⅱ'}</button>
  </div>;
}
function LocalClock() {
  const now = useClock();
  const [placeId, setPlaceId] = useState<string>('milano');
  useEffect(() => {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const exact = locations.find(place => place.zone === zone);
    if (exact) {setPlaceId(exact.id); return;}
    // Time-zone proximity is an estimate, without asking for precise location.
    const offset = (timeZone:string) => {
      const name = new Intl.DateTimeFormat('en-US',{timeZone,timeZoneName:'shortOffset'}).formatToParts(new Date()).find(part=>part.type==='timeZoneName')?.value ?? 'GMT';
      const match = name.match(/GMT([+-])(\d+)(?::(\d+))?/);
      return match ? (match[1]==='-'?-1:1)*(Number(match[2])*60+Number(match[3]??0)) : 0;
    };
    const visitorOffset = offset(zone);
    const northernEurope = ['Europe/Stockholm','Europe/Oslo','Europe/Helsinki','Europe/Berlin','Europe/Warsaw'].includes(zone);
    const ranked = [...locations].sort((a,b)=>{
      const distance=(place:typeof locations[number])=>{const gap=Math.abs(offset(place.zone)-visitorOffset);return Math.min(gap,1440-gap);};
      return distance(a)-distance(b) || (northernEurope ? Number(b.id==='copenhagen')-Number(a.id==='copenhagen') : 0);
    });
    setPlaceId(ranked[0].id);
  }, []);
  const place = locations.find(item => item.id === placeId) ?? locations[4];
  return <div className="local-clock"><span className="local-brand">{place.brand}</span><div>
    <span className="location-name">{place.name}</span>
    <time>{timeAt(now,place.zone)}</time>
  </div></div>;
}
export function Shell({children}: {children:React.ReactNode}) {
  const {pathname} = useLocation();
  const [params] = useSearchParams();
  const section = pathname === '/gallery' ? 'gallery' : pathname === '/network' ? 'network' : null;
  const labels = section === 'gallery' ? galleryViews : networkViews;
  const keys = section === 'gallery' ? galleryViewKeys : networkViewKeys;
  const activeView = section ? viewIndex(section, params.get('view')) : -1;
  const home = pathname === '/';
  const network = pathname.startsWith('/network') || pathname === '/website';
  const gallery = pathname === '/gallery' || pathname.startsWith('/products');
  const destination = network ? '/gallery' : '/network';
  return <div className={`site-shell ${home ? 'is-home' : 'is-inside'} ${network ? 'is-network' : gallery ? 'is-gallery' : ''}`}>
    <a href="#main" className="skip-link">Skip to content</a>
    <WorldClocks />
    <header className={`site-header ${home || section ? 'compact-header' : ''}`}>
      {section ? <nav className="nav-left" aria-label={`${section} views`}><Link className="section-link" to={`/${section}`}>{section}</Link><Link className="view-link" to={`/${section}?view=${keys[0]}`} aria-current={activeView === 0 ? 'page' : undefined}>{labels[0]}</Link></nav> : <nav className="nav-left" aria-label="Gallery and information"><NavLink to="/gallery">gallery</NavLink><NavLink to="/about">about</NavLink></nav>}
      <Link className="flower-switch" to={destination} aria-label={`Switch to ${network ? 'gallery' : 'network'}`}>
        <span className={`flower-weight ${gallery ? 'selected' : ''}`} aria-hidden="true"/>
        <img src={identity.flower} alt="Formal flower" width="110" height="118"/>
        <span className={`flower-weight ${network ? 'selected' : ''}`} aria-hidden="true"/>
      </Link>
      {section ? <nav className="nav-right" aria-label={`More ${section} views`}>{[1,2].map(index => <Link key={keys[index]} className="view-link" to={`/${section}?view=${keys[index]}`} aria-current={activeView === index ? 'page' : undefined}>{labels[index]}</Link>)}</nav> : <nav className="nav-right" aria-label="Network and cart"><NavLink to="/network">network</NavLink><NavLink to="/cart">cart</NavLink></nav>}
    </header>
    <main id="main" tabIndex={-1}>{children}</main>
    <footer className="site-footer"><LocalClock/>{!home && <nav aria-label="Return navigation"><Link to="/">home</Link></nav>}</footer>
  </div>;
}
