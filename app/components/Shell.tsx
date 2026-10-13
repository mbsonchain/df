import {useEffect, useMemo, useState} from 'react';
import {Link, NavLink, useLocation, useSearchParams} from 'react-router';
import {identity, locations, clockLocations, clockLocationsByTime} from '~/content/site';
import {galleryViews, networkViews, galleryViewLinks, networkViewLinks, viewIndex} from '~/content/views';
import {homeOnly} from '~/lib/launch';
import {FormalText} from './FormalText';
import {ViewToggle} from './ViewToggle';

function EntryLink({to, children}: {to:string; children:React.ReactNode}) {
  const {pathname} = useLocation();
  return homeOnly
    ? <span className="locked-entry" role="link" aria-disabled="true">{children}</span>
    : <NavLink to={to} className={({isActive}) => isActive || (to === '/gallery' && pathname.startsWith('/products/')) ? 'active' : undefined}>{children}</NavLink>;
}

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return now;
}
const formats = new Map<string, Intl.DateTimeFormat>(clockLocations.map(place => [place.zone, new Intl.DateTimeFormat('en-GB', {timeZone:place.zone, hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false})]));
function timeAt(now: Date | null, zone: typeof clockLocations[number]['zone']) {
  return now ? formats.get(zone)!.format(now) : '--:--:--';
}
function WorldClocks() {
  const now = useClock();
  const clockMinute = now ? Math.floor(now.getTime() / 60_000) : null;
  const orderedLocations = useMemo(() => clockMinute === null
    ? clockLocations
    : clockLocationsByTime(new Date(clockMinute * 60_000)), [clockMinute]);
  const [paused, setPaused] = useState(false);
  return <div className={`world-clock ${paused ? 'is-paused' : ''}`}>
    <div className="clock-track">{[0,1].map(copy => <div className="clock-run" key={copy} aria-hidden={copy === 1}>
      {orderedLocations.map(place => <span key={place.id} className="city-clock"><span>{place.name}</span><time>{timeAt(now,place.zone)}</time></span>)}
    </div>)}</div>
    <button className="clock-pause" aria-label={paused ? 'Resume moving clocks' : 'Pause moving clocks'} onClick={() => setPaused(!paused)}>{paused ? '▷' : 'Ⅱ'}</button>
  </div>;
}
function LocalClock() {
  const now = useClock();
  const [params] = useSearchParams();
  // Location simulation is confined to the independent mobile review branch.
  const [previewPlaceId] = useState(() => {
    const requested = params.get('previewCity');
    return locations.find(place => place.id === requested)?.id ?? null;
  });
  const [placeId, setPlaceId] = useState<string>(previewPlaceId ?? 'milano');
  useEffect(() => {
    if (previewPlaceId) return;
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
  }, [previewPlaceId]);
  const place = locations.find(item => item.id === placeId) ?? locations[4];
  return <div className="local-clock"><span className="local-brand"><FormalText>{place.brand}</FormalText></span><div>
    <span className="location-name">{place.name}</span>
    <time>{timeAt(now,place.zone)}</time>
  </div></div>;
}
export function Shell({children}: {children:React.ReactNode}) {
  const {pathname} = useLocation();
  const [params] = useSearchParams();
  const section = pathname === '/gallery' ? 'gallery' : pathname === '/network' ? 'network' : null;
  const labels = section === 'gallery' ? galleryViews : networkViews;
  const viewLinks = section === 'gallery' ? galleryViewLinks : networkViewLinks;
  const activeView = section ? viewIndex(section, params.get('view')) : -1;
  const home = pathname === '/';
  const fixedPage = home || pathname === '/about';
  const network = pathname.startsWith('/network') || pathname === '/website';
  const gallery = section === 'gallery' || pathname.startsWith('/products');
  const flower = <>
    <img src={identity.flower} alt="FORMAL flower" width="110" height="118"/>
  </>;
  return <div className={`site-shell ${home ? 'is-home' : 'is-inside'} ${fixedPage ? 'is-fixed-page' : ''} ${network ? 'is-network' : gallery ? 'is-gallery' : ''}`}>
    <a href="#main" className="skip-link">Skip to content</a>
    <WorldClocks />
    <header className="site-header compact-header">
      <nav className="nav-left" aria-label="Gallery and information"><EntryLink to="/gallery">gallery</EntryLink><EntryLink to="/about">about</EntryLink></nav>
      <div className="flower-center">
        <Link className="flower-switch" to="/" aria-label="Home">{flower}</Link>
      </div>
      <nav className="nav-right" aria-label="Network and store"><EntryLink to="/network">network</EntryLink><EntryLink to="/cart">store</EntryLink></nav>
    </header>
    <main id="main" tabIndex={-1}>{children}</main>
    <footer className="site-footer"><LocalClock/>{pathname === '/about' && <p className="about-footer-copyright">© {new Date().getUTCFullYear()} <FormalText>FORMAL</FormalText></p>}{section && <ViewToggle section={section} labels={labels} links={viewLinks} active={activeView}/>}</footer>
  </div>;
}
