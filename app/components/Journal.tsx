import {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router';
import {posts} from '~/content/editorial';
import {projects, identity} from '~/content/site';
export function Journal() {
  const [active,setActive]=useState(0);
  const sections=useRef<(HTMLElement|null)[]>([]);
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(visible)setActive(Number((visible.target as HTMLElement).dataset.index));
    },{rootMargin:'-18% 0px -38% 0px',threshold:[0,.2,.5]});
    sections.current.forEach(section=>{if(section)observer.observe(section);});
    return ()=>observer.disconnect();
  },[]);
  const current=posts[active];
  return <div className={`journal journal-scene-${active}`}>
    <div className="journal-atmosphere" aria-hidden="true"/>
    <aside className="artifact artifact-left" aria-label="Related project"><Link to={`/network/projects/${projects[active].slug}`}><img src={projects[active].image} alt={projects[active].title}/><span>{projects[active].title} ↗</span></Link></aside>
    <aside className="artifact artifact-right" aria-label="Related note"><span className="micro">a note from here / {current.number}</span><p>{current.note}</p><Link to={`/network/posts/${current.id}`}>read the story ↗</Link></aside>
    <div className="journal-column"><div className="journal-intro"><p className="micro">Network / a continuing journal</p><h1>Things in<br/>the making.</h1><p>From the studio, and further afield.</p></div>
      {posts.map((post,index)=><article className="journal-entry" key={post.id} data-index={index} ref={element=>{sections.current[index]=element;}}>
        <Link className={`journal-poster poster-${index}`} to={`/network/posts/${post.id}`} aria-label={`Read ${post.title}`}>
          {index===0?<><span className="poster-number">01</span><span className="poster-words">An open<br/>invitation.</span><span className="poster-caption">a place for things to begin</span></>:index===1?<img src={identity.flower} alt="A flower study"/>:<><span className="film-frame"><span>▶</span></span><span className="poster-caption">a moment, held in motion</span></>}
        </Link>
        <div className="entry-meta"><span>{post.kind}</span><span>{post.number} / notebook</span></div><h2><Link to={`/network/posts/${post.id}`}>{post.title}</Link></h2><p>{post.subtitle}</p><Link className="read-link" to={`/network/posts/${post.id}`}>continue reading ↗</Link>
      </article>)}
      <div className="journal-end"><p>To be continued.</p><span className="micro">More from the places in between.</span></div>
    </div>
  </div>;
}
