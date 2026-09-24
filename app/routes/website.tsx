import {useEffect, useRef, useState} from 'react';
import {Artwork} from '~/components/Artwork';
import {posts} from '~/content/editorial';
export function meta() {return [{title: 'Journal — Desert Formal'}];}
export default function Website() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const sections = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const anchor = window.innerHeight * .46;
        let closest = 0;
        let distance = Infinity;
        sections.current.forEach((section, i) => {
          if (!section) return;
          const rect = section.getBoundingClientRect();
          const next = anchor >= rect.top && anchor <= rect.bottom ? 0 : Math.min(Math.abs(rect.top - anchor), Math.abs(rect.bottom - anchor));
          if (next < distance) {distance = next; closest = i;}
        });
        setActive(closest);
      });
    };
    update();
    window.addEventListener('scroll', update, {passive: true});
    window.addEventListener('resize', update);
    return () => {cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update);};
  }, []);
  useEffect(() => {setExpanded(false);}, [active]);
  const current = posts[active];
  return <div className={`journal scene-${current.scene}`}>
    <div className="scene-wash" aria-hidden="true"/>
    <aside className="floating-companion companion-left" aria-label="Related image"><div className="window-bar"><span>Fragment {current.number}</span><span>↗</span></div><Artwork kind={current.art}/><p>{current.note}</p></aside>
    <aside className="floating-companion companion-right" aria-label="Related note"><p className="eyebrow">From this entry / {current.number}</p><p className="companion-title">{current.note}</p><button className="text-button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? 'Close note −' : 'Open note +'}</button>{expanded && <p className="companion-detail">{current.detail}</p>}</aside>
    <div className="journal-column"><div className="journal-intro"><p className="eyebrow">The journal</p><h1>Here, there.<br/>And in between.</h1><p>Notes from an ongoing collection.</p><a href="#open-country" className="scroll-cue">Scroll to wander ↓</a></div>
    {posts.map((post, i) => <article key={post.id} id={post.id} ref={(element) => {sections.current[i] = element;}} className={`journal-post post-${post.scene}`}>
      <div className="post-meta"><span>{post.kind}</span><span>Entry / {post.number}</span></div>
      <div className="post-image"><Artwork kind={post.art}/>{post.kind === 'Moving image' && <span className="film-label">Film placeholder / moving image</span>}</div>
      <div className="post-copy"><h2>{post.title}</h2><p className="post-subtitle">{post.subtitle}</p><p>{post.body}</p><details className="mobile-extra"><summary>From this entry +</summary><p>{post.detail}</p></details></div>
    </article>)}
    <div className="journal-end"><p>More to come.</p><a href="#main">Back to the beginning ↑</a></div></div>
    <div className="journal-counter" aria-hidden="true">{current.number} / 03</div>
  </div>;
}
