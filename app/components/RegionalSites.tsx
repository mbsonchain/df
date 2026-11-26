import {useRef, useState} from 'react';
import {identity, locations, type SiteId} from '~/content/site';
import {FormalText} from './FormalText';

export function RegionalSites({activeId}: {activeId: SiteId | null}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  return <div className="regional-sites">
    <button className="edition-flower" type="button" aria-label="View regional sites"
      aria-haspopup="dialog" aria-expanded={open} aria-controls="edition-menu"
      onClick={() => {dialog.current?.showModal(); setOpen(true);}}>
      <img src={identity.flowerTransparent} alt="" width="24" height="26"/>
    </button>
    <dialog id="edition-menu" className="edition-menu" ref={dialog}
      onClose={() => setOpen(false)} aria-labelledby="edition-menu-title">
      <div className="edition-menu-heading">
        <h2 id="edition-menu-title">choose your site</h2>
        <button type="button" aria-label="Close regional sites" onClick={() => dialog.current?.close()}>×</button>
      </div>
      <ul className="edition-options">
        {locations.map(site => <li key={site.id} aria-current={site.id === activeId ? 'location' : undefined}>
          <span><FormalText>{site.brand}</FormalText>{site.id === activeId && ' (default)'}</span>
          <small>{site.territory}</small>
        </li>)}
      </ul>
    </dialog>
  </div>;
}
