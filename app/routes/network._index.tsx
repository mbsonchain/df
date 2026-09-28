import {useState} from 'react';
import {Link,useSearchParams} from 'react-router';
import {Journal} from '~/components/Journal';
import {isWhitespace} from '~/components/ViewControls';
import {viewIndex} from '~/content/views';
import {posts} from '~/content/editorial';
import {projects} from '~/content/site';
export function meta(){return [{title:'Network — Formal'}];}
export default function Network(){
  const [params]=useSearchParams();
  const view=viewIndex('network', params.get('view'));
  const [arrangement,setArrangement]=useState(0);
  return <section className={`network-page network-view-${view}`} onClick={event=>{if(view===1 && isWhitespace(event))setArrangement(value=>(value+1)%3);}}>
    {view===0 ? <Journal/> : view===1 ? <div className={`project-orbit orbit-${arrangement}`} role="region" aria-label="Portfolio. Click empty space or press Space to rearrange." tabIndex={0} onKeyDown={event=>{if(event.target===event.currentTarget && (event.key===' ' || event.key==='Enter')){event.preventDefault();setArrangement(value=>(value+1)%3);}}}>
      {projects.map((project,index)=><Link key={project.slug} className={`project-orbit-item project-${index}`} to={`/network/projects/${project.slug}`}><img src={project.image} alt={project.title}/></Link>)}
    </div> : <div className="network-index"><div className="index-label">Live</div>{posts.map(post=><Link className="index-row" key={post.id} to={`/network/posts/${post.id}`}><span>{post.number}</span><span>{post.title}</span><span>{post.kind}</span><span>↗</span></Link>)}<div className="index-label">Portfolio</div>{projects.map((project,index)=><Link className="index-row" key={project.slug} to={`/network/projects/${project.slug}`}><span>0{index+1}</span><span>{project.title}</span><span>{project.category}</span><span>↗</span></Link>)}</div>}
  </section>;
}
