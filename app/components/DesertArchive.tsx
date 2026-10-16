import {useEffect, useRef, useState} from 'react';
import {identity} from '~/content/site';
import {mediaLibrary} from '~/content/media';
import {FormalVideo} from './FormalVideo';

const archiveItems = [
  {id: 'photographs', title: 'photographs', kind: 'folder', description: 'a folder for pictures from the collective.'},
  {id: 'field-notes', title: 'field notes', kind: 'paper', description: 'notes, sketches, and things worth keeping.'},
  {id: 'films', title: 'films', kind: 'folder', description: 'films and moving images from the network.'},
  {id: 'found', title: 'found things', kind: 'photo', description: 'objects, details, and things found along the way.'},
  {id: 'flowers', title: 'flowers', kind: 'flower', description: 'a place for flowers.'},
  {id: 'amore-point', title: 'amore point', kind: 'folder', description: 'pictures and fragments from amore point.'},
] as const;
const introKey = 'formal:desert-intro:v1';

export function DesertArchive() {
  const [entered, setEntered] = useState(false);
  const [selected, setSelected] = useState<(typeof archiveItems)[number] | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
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
    requestAnimationFrame(() => heading.current?.focus());
  }

  function replayIntro() {
    setEntered(false);
    if (intro) {try {sessionStorage.removeItem(introKey);} catch { /* Replay still works. */ }}
  }

  return <div className={`desert-room ${entered ? 'is-open' : ''}`}>
    {!entered ? <div className="desert-introduction">
      <img className="desert-bloom bloom-one" src={identity.flowerTransparent} alt="" width="110" height="118"/>
      <img className="desert-bloom bloom-two" src={identity.flowerTransparent} alt="" width="110" height="118"/>
      <div className="desert-intro-content">
        <p className="desert-intro-eyebrow">an invitation from carlos</p>
        {intro ? <FormalVideo video={intro} title="Carlos — introducing desert FORMAL" onEnded={enterArchive}/> : <div className="desert-intro-placeholder">
          <span aria-hidden="true">▷</span><span>carlos</span><span>introducing desert FORMAL</span>
        </div>}
        <h1>introducing desert FORMAL</h1>
        {intro ? <p>the archive opens when the film ends.</p> : <div className="desert-draft-access"><p>video to be added</p><button type="button" onClick={enterArchive}>preview the archive →</button></div>}
      </div>
      <img className="desert-bloom bloom-three" src={identity.flowerTransparent} alt="" width="110" height="118"/>
    </div> : <section className="desert-archive" aria-labelledby="archive-title">
      <div className="desert-archive-heading"><h1 id="archive-title" tabIndex={-1} ref={heading}>the desert archive</h1><button type="button" onClick={replayIntro}>← carlos</button></div>
      <div className="desert-desktop">
        {archiveItems.map(item => <button type="button" key={item.id} className={`archive-widget widget-${item.id}`} onClick={() => setSelected(item)} aria-label={`Open ${item.title}`}>
          <span className={`archive-object archive-object-${item.kind}`} aria-hidden="true">
            {item.kind === 'flower' ? <img src={identity.flowerTransparent} alt="" width="110" height="118"/> : item.kind === 'paper' ? <span>dear collective,<i/><i/><i/><i/></span> : item.kind === 'photo' ? <span>an image<br/>to keep</span> : <span/>}
          </span>
          <span className="archive-widget-label">{item.title}</span>
        </button>)}
      </div>
    </section>}
    <dialog className="archive-window" ref={dialog} onClose={() => setSelected(null)} aria-labelledby="archive-window-title">
      {selected ? <>
        <header><h2 id="archive-window-title">{selected.title}</h2><button type="button" onClick={() => setSelected(null)} aria-label="Close archive item">×</button></header>
        <div className="archive-window-content"><p>{selected.description}</p><div className="archive-empty-sheets" aria-hidden="true"><span/><span/><span/></div><p className="archive-window-pending">collection to be added</p></div>
      </> : null}
    </dialog>
  </div>;
}
