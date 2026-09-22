import {useEffect, useState} from 'react';
import {Link, NavLink, useLocation} from 'react-router';
export function ModeSwitch() {
  return <nav className="mode-switch" aria-label="Explore Desert Formal"><NavLink to="/website">Website</NavLink><span aria-hidden="true" className="switch-track"><i /></span><NavLink to="/gallery">Gallery</NavLink></nav>;
}
export function Shell({children}: {children: React.ReactNode}) {
  const {pathname} = useLocation();
  return <div className={`site-shell ${pathname === '/website' ? 'journal-shell' : ''}`}>
    <a href="#main" className="skip-link">Skip to content</a>
    <ClockHeader />
    {pathname !== '/' && <div className="top-modes"><ModeSwitch /></div>}
    <main id="main" tabIndex={-1}>{children}</main>
    <footer className="site-footer"><Link to="/">Home <span aria-hidden="true">↙</span></Link><span className="preview-label">Sketchbook / preview</span><NavLink to="/about">About <span aria-hidden="true">↗</span></NavLink></footer>
  </div>;
}

function ClockHeader() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const clock = (timeZone: string) => now ? new Intl.DateTimeFormat('en-GB', {timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}).format(now) : '--:--:--';
  return <header className="clock-header">
    <div className="clock-item"><span className="clock-time" aria-label="California time">{clock('America/Los_Angeles')}</span><span className="clock-label">CONAMORE CA</span></div>
    <div className="clock-item"><span className="clock-time" aria-label="Milan time">{clock('Europe/Rome')}</span><span className="clock-label">MILANO LM</span></div>
  </header>;
}
