import {useState} from 'react';
import {Link,useSearchParams} from 'react-router';
import {Journal} from '~/components/Journal';
import {ViewControls,isWhitespace} from '~/components/ViewControls';
import {posts} from '~/content/editorial';
import {projects} from '~/content/site';
const keys=['journal','projects','all'];
export function meta(){return [{title:'Network — Formal'}];}
export default function Network(){
  const [params,setParams]=useSearchParams();
  const view=Math.max(0,keys.indexOf(params.get('view')??'journal'));
  const [arrangement,setArrangement]=useState(0);
  const change=(index:number)=>{setParams({view:keys[index]});window.scrollTo({top:0,behavior:'instant'});};
  return <section className={`network-page network-view-${view}`} onClick={event=>{if(view===1 && isWhitespace(event))setArrangement(value=>(value+1)%3);}}>
    <div className="view-bar"><ViewControls labels={['journal','projects','view all']} active={view} onChange={change}/></div>
    {view===0 ? <Journal/> : view===1 ? <div className={`project-orbit orbit-${arrangement}`} role="region" aria-label="Projects. Click empty space or press Space to rearrange." tabIndex={0} onKeyDown={event=>{if(event.target===event.currentTarget && (event.key===' ' || event.key==='Enter')){event.preventDefault();setArrangement(value=>(value+1)%3);}}}>
      {projects.map((project,index)=><Link key={project.slug} className={`project-orbit-item project-${index}`} to={`/network/projects/${project.slug}`}><img src={project.image} alt={project.title}/></Link>)}
    </div> : <div className="network-index"><div className="index-label">Journal</div>{posts.map(post=><Link className="index-row" key={post.id} to={`/network/posts/${post.id}`}><span>{post.number}</span><span>{post.title}</span><span>{post.kind}</span><span>↗</span></Link>)}<div className="index-label">Projects</div>{projects.map((project,index)=><Link className="index-row" key={project.slug} to={`/network/projects/${project.slug}`}><span>0{index+1}</span><span>{project.title}</span><span>{project.category}</span><span>↗</span></Link>)}</div>}
  </section>;
}
