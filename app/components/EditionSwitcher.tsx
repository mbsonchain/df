import {useEffect, useRef, useState} from 'react';
import {identity} from '~/content/site';
import {FormalText} from './FormalText';

export const editions = [
  {id: 'spazio-libero', name: 'spazio libero', territory: 'italy'},
  {id: 'freetown', name: 'freetown FORMAL', territory: 'rest of europe / africa / islands'},
  {id: 'island', name: 'island FORMAL', territory: 'hawaii'},
  {id: 'desert', name: 'desert FORMAL', territory: 'rest of americas / asia'},
] as const;
export type EditionId = (typeof editions)[number]['id'];
const editionKey = 'formal:edition:v1';
const isEdition = (value: unknown): value is EditionId => editions.some(edition => edition.id === value);

function localEdition(): EditionId {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (['Europe/Rome', 'Europe/Vatican', 'Europe/San_Marino'].includes(zone)) return 'spazio-libero';
  if (zone === 'Pacific/Honolulu' || zone === 'US/Hawaii') return 'island';
  if (zone.startsWith('America/') || zone.startsWith('Asia/')) return 'desert';
  return 'freetown';
}

export function useEdition() {
  const [edition, setEdition] = useState<EditionId>('spazio-libero');
  useEffect(() => {
    let saved: string | null = null;
    try {saved = localStorage.getItem(editionKey);} catch { /* Use the local edition when storage is unavailable. */ }
    setEdition(isEdition(saved) ? saved : localEdition());
    const sync = (event: StorageEvent) => {
      if (event.key === editionKey) setEdition(isEdition(event.newValue) ? event.newValue : localEdition());
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  function selectEdition(id: EditionId) {
    setEdition(id);
    try {localStorage.setItem(editionKey, id);} catch { /* The selection still applies for this visit. */ }
  }
  return {edition, selectEdition};
}

export function EditionSwitcher({edition, onSelect}: {edition: EditionId; onSelect: (id: EditionId) => void}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  return <div className="edition-switcher">
    <button className="edition-flower" type="button" aria-label="Change regional site" aria-haspopup="dialog" aria-expanded={open} aria-controls="edition-menu"
      onClick={() => {dialog.current?.showModal(); setOpen(true);}}>
      <img src={identity.flowerTransparent} alt="" width="24" height="26"/>
    </button>
    <dialog id="edition-menu" className="edition-menu" ref={dialog} onClose={() => setOpen(false)} aria-labelledby="edition-menu-title">
      <div className="edition-menu-heading"><h2 id="edition-menu-title">choose your site</h2><button type="button" aria-label="Close site menu" onClick={() => dialog.current?.close()}>×</button></div>
      <div className="edition-options">
        {editions.map(item => <button key={item.id} type="button" aria-pressed={item.id === edition} onClick={() => {onSelect(item.id); dialog.current?.close();}}>
          <span><FormalText>{item.name}</FormalText></span><small>{item.territory}</small>
        </button>)}
      </div>
    </dialog>
  </div>;
}
