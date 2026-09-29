import {useEffect, useState} from 'react';
import {useLocation} from 'react-router';

// This component exists only on the independent mobile design branch.
// A same-origin frame runs the real responsive site at phone dimensions.
export function MobilePreview({children}: {children:React.ReactNode}) {
  const location = useLocation();
  const [framed, setFramed] = useState(false);
  useEffect(() => {
    const screen = window.matchMedia('(min-width: 761px)');
    const update = () => setFramed(screen.matches && window.self === window.top);
    update();
    screen.addEventListener('change', update);
    return () => screen.removeEventListener('change', update);
  }, []);

  if (!framed) return children;
  return <div className="mobile-preview-workspace">
    <p className="mobile-preview-label">formal / mobile preview</p>
    <iframe
      className="mobile-preview-frame"
      title="Formal mobile site"
      src={location.pathname + location.search + location.hash}
    />
  </div>;
}
