import {useEffect, useMemo, useState} from 'react';
import {Link, NavLink, useLocation, useRouteLoaderData, useSearchParams} from 'react-router';
import type {loader as productLoader} from '~/routes/products.$slug';
import {identity, locations, clockLocationsByTime, type RegionalSite, type SiteId} from '~/content/site';
import {galleryViews, networkViews, galleryViewLinks, networkViewLinks, viewIndex} from '~/content/views';
import {homeOnly} from '~/lib/launch';
import {FormalText} from './FormalText';
import {ViewToggle} from './ViewToggle';
import {DesertBackdrop} from './DesertBackdrop';
import {RegionalSites} from './RegionalSites';

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
const formats = new Map<string, Intl.DateTimeFormat>(locations.map(place => [place.zone, new Intl.DateTimeFormat('en-GB', {timeZone:place.zone, hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false})]));
function timeAt(now: Date | null, zone: RegionalSite['zone']) {
  return now ? formats.get(zone)!.format(now) : '--:--:--';
}
function WorldClocks({activeId}: {activeId: SiteId | null}) {
  const now = useClock();
  const clockMinute = now ? Math.floor(now.getTime() / 60_000) : null;
  const orderedLocations = useMemo(() => clockMinute === null
    ? locations
    : clockLocationsByTime(new Date(clockMinute * 60_000)), [clockMinute]);
  return <div className="world-clock">
    <div className="clock-track">{[0,1].map(copy => <div className="clock-run" key={copy} aria-hidden={copy === 1}>
      {orderedLocations.map(place => <span key={place.id} className="city-clock" aria-current={place.id === activeId ? 'location' : undefined}>
        <span>{place.name}</span><time>{timeAt(now,place.zone)}</time>
      </span>)}
    </div>)}</div>
  </div>;
}
function LocalClock({site}: {site: RegionalSite | undefined}) {
  const now = useClock();
  if (!site) return null;
  return <div className="local-clock">
    <span className="local-brand"><FormalText>{site.brand}</FormalText></span>
    <div><span className="location-name">{site.name}</span><time>{timeAt(now,site.zone)}</time></div>
  </div>;
}
export function Shell({children, accessSiteId}: {children: React.ReactNode; accessSiteId: SiteId | null}) {
  const [browserSiteId, setBrowserSiteId] = useState<SiteId | null>(null);
  useEffect(() => {
    if (accessSiteId) return;
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Visits already located by Oxygen don't need the time-zone coordinate table.
    import('~/lib/regional-site').then(
      ({siteForTimeZone}) => setBrowserSiteId(siteForTimeZone(zone) ?? 'conamore'),
      () => setBrowserSiteId('conamore'),
    );
  }, [accessSiteId]);
  const activeId = accessSiteId ?? browserSiteId;
  const site = locations.find(place => place.id === activeId);
  const {pathname} = useLocation();
  const productData = useRouteLoaderData<typeof productLoader>('routes/products.$slug');
  const [params] = useSearchParams();
  const section = pathname === '/gallery' ? 'gallery' : pathname === '/network' ? 'network' : null;
  const labels = section === 'gallery' ? galleryViews : networkViews;
  const viewLinks = section === 'gallery' ? galleryViewLinks : networkViewLinks;
  const activeView = section ? viewIndex(section, params.get('view')) : -1;
  const home = pathname === '/';
  const productPage = pathname.startsWith('/products/');
  const fixedPage = home || pathname === '/about' || productPage;
  const network = pathname.startsWith('/network') || pathname === '/website';
  const gallery = section === 'gallery' || pathname.startsWith('/products');
  const flower = <>
    <img src={section === 'network' && activeView === 0 ? identity.flowerTransparent : identity.flower} alt="FORMAL flower" width="110" height="118"/>
  </>;
  return <div className={`site-shell ${home ? 'is-home' : 'is-inside'} ${fixedPage ? 'is-fixed-page' : ''} ${network ? 'is-network' : gallery ? 'is-gallery' : ''}`}>
    {section === 'network' && activeView === 0 && <DesertBackdrop />}
    <a href="#main" className="skip-link">Skip to content</a>
    <WorldClocks activeId={activeId}/>
    <header className="site-header compact-header">
      <nav className="nav-left" aria-label="Gallery and information"><EntryLink to="/gallery">gallery</EntryLink><EntryLink to="/about">about</EntryLink></nav>
      <div className="flower-center">
        <Link className="flower-switch" to="/" aria-label="Home">{flower}</Link>
      </div>
      <nav className="nav-right" aria-label="Network and store"><EntryLink to="/network">network</EntryLink><EntryLink to="/cart">store</EntryLink></nav>
    </header>
    <main id="main" tabIndex={-1}>{children}</main>
    <footer className="site-footer">
      <LocalClock site={site}/>
      {home && <RegionalSites activeId={activeId}/>}
      {productPage && (
        <Link
          className="product-option product-gallery-back"
          to={productData?.galleryHref ?? '/gallery'}
          aria-label="Back to gallery"
        >
          <span aria-hidden="true">←</span>
        </Link>
      )}
      {pathname === '/about' && <p className="about-footer-copyright">© {new Date().getUTCFullYear()} <FormalText>FORMAL</FormalText></p>}
      {section && <ViewToggle section={section} labels={labels} links={viewLinks} active={activeView}/>}
    </footer>
  </div>;
}
