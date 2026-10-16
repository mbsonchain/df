import {useEffect, useRef, useState} from 'react';
import {identity} from '~/content/site';
import {mediaLibrary} from '~/content/media';
import {FormalVideo} from './FormalVideo';

const folders = [
  {id: 'amore-point', title: 'amore point', description: 'pictures and fragments from amore point.'},
  {id: 'freetown', title: 'freetown', description: 'places, people, and things from freetown.'},
  {id: 'conamore', title: 'conamore', description: 'the project, the myth, and all it contains.'},
  {id: 'field-notes', title: 'field notes', description: 'notes, sketches, and things worth keeping.'},
  {id: 'scraps', title: 'scraps', description: 'fragments, references, and things found along the way.'},
] as const;
const joinItem = {id: 'join', title: 'join', description: 'join the desert FORMAL network.'} as const;
type ArchiveItem = (typeof folders)[number] | typeof joinItem;
const introKey = 'formal:desert-intro:v2';

export function DesertArchive() {
  const [entered, setEntered] = useState(false);
  const [selected, setSelected] = useState<ArchiveItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const archive = useRef<HTMLElement>(null);
  const intro = mediaLibrary.carlosVideo;

  useEffect(() => {
    if (!intro) return;
    try {setEntered(sessionStorage.getItem(introKey) === intro.src);} catch { /* Watching works without storage. */ }
  }, [intro]);

  useEffect(() => {
    if (selected) dialog.current?.showModal();
    else dialog.current?.close();
  }, [selected]);

  function enterArchive() {
    if (intro) {
      try {sessionStorage.setItem(introKey, intro.src);} catch { /* Keep access for this page visit. */ }
    }
    setEntered(true);
    requestAnimationFrame(() => archive.current?.focus());
  }

  function openJoin(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setSelected(joinItem);
  }

  return <div className={`desert-room ${entered ? 'is-open' : ''}`}>
    {!entered ? <div className="desert-introduction">
      <img className="desert-bloom bloom-one" src={identity.flowerTransparent} alt="" width="110" height="118"/>
      <img className="desert-bloom bloom-two" src={identity.flowerTransparent} alt="" width="110" height="118"/>
      <div className="desert-intro-content">
        <p className="desert-intro-eyebrow">find your desert</p>
        {intro ? <FormalVideo video={intro} title="Carlos — introducing desert FORMAL" minimal suspended={Boolean(selected)} requireComplete onEnded={enterArchive}/> : <p role="status">the film is temporarily unavailable.</p>}
        <h1>introducing desert FORMAL</h1>
        <a className="desert-join-link" href="#join" aria-haspopup="dialog" onClick={openJoin}>join</a>
      </div>
      <img className="desert-bloom bloom-three" src={identity.flowerTransparent} alt="" width="110" height="118"/>
    </div> : <section className="desert-archive" aria-label="The desert archive" tabIndex={-1} ref={archive}>
      <div className="desert-desktop">
        {folders.map(item => <button type="button" key={item.id} className={`archive-widget widget-${item.id}`} onClick={() => setSelected(item)} aria-label={`Open ${item.title}`} aria-haspopup="dialog">
          <span className="archive-object archive-object-folder" aria-hidden="true"/>
          <span className="archive-widget-label">{item.title}</span>
        </button>)}
        <a href="#join" className="archive-widget widget-join desert-join-link" onClick={openJoin} aria-label="Join the desert FORMAL network" aria-haspopup="dialog">
          <span className="archive-object archive-object-flower" aria-hidden="true"><img src={identity.flowerTransparent} alt="" width="110" height="118"/></span>
          <span className="archive-widget-label">join</span>
        </a>
      </div>
    </section>}
    <dialog className="archive-window" ref={dialog} onClose={() => setSelected(null)} aria-labelledby="archive-window-title">
      {selected ? <>
        <header><h2 id="archive-window-title">{selected.title}</h2><button type="button" onClick={() => setSelected(null)} aria-label="Close archive item">×</button></header>
        <div className="archive-window-content"><p>{selected.description}</p>{selected.id === 'join' ? <p className="archive-window-pending">sign-ups opening soon.</p> : <><div className="archive-empty-sheets" aria-hidden="true"><span/><span/><span/></div><p className="archive-window-pending">collection to be added</p></>}</div>
      </> : null}
    </dialog>
  </div>;
}
