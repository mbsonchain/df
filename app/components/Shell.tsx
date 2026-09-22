import {Link, NavLink, useLocation} from 'react-router';
export function ModeSwitch() {
  return <nav className="mode-switch" aria-label="Explore Desert Formal"><NavLink to="/website">Website</NavLink><span aria-hidden="true" className="switch-track"><i /></span><NavLink to="/gallery">Gallery</NavLink></nav>;
}
export function Shell({children}: {children: React.ReactNode}) {
  const {pathname} = useLocation();
  return <div className={`site-shell ${pathname === '/website' ? 'journal-shell' : ''}`}>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header"><Link to="/" className="brand">Desert Formal</Link><span className="header-note">A continuing collection</span><span className="edition">No. 001</span></header>
    {pathname !== '/' && <div className="top-modes"><ModeSwitch /></div>}
    <main id="main" tabIndex={-1}>{children}</main>
    <footer className="site-footer"><Link to="/">Home <span aria-hidden="true">↙</span></Link><span className="preview-label">Sketchbook / preview</span><NavLink to="/about">About <span aria-hidden="true">↗</span></NavLink></footer>
  </div>;
}
