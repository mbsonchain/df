import {useState} from 'react';
import {Link,useSearchParams} from 'react-router';
import {Journal} from '~/components/Journal';
import {NetworkPaper} from '~/components/NetworkPaper';
import {isWhitespace} from '~/components/ViewControls';
import {viewIndex} from '~/content/views';
import {projects} from '~/content/site';
export function meta(){return [{title:'Network — Formal'}];}
export default function Network(){
  const [params]=useSearchParams();
  const view=viewIndex('network', params.get('view'));
  const [arrangement,setArrangement]=useState(0);
  return <section className={`network-page network-view-${view}`} onClick={event=>{if(view===1 && isWhitespace(event))setArrangement(value=>(value+1)%3);}}>
    {view===0 ? <Journal/> : view===1 ? <div className={`project-orbit orbit-${arrangement}`} role="region" aria-label="Formal. Click empty space or press Space to rearrange." tabIndex={0} onKeyDown={event=>{if(event.target===event.currentTarget && (event.key===' ' || event.key==='Enter')){event.preventDefault();setArrangement(value=>(value+1)%3);}}}>
      {projects.map((project,index)=><Link key={project.slug} className={`project-orbit-item project-${index}`} to={`/network/projects/${project.slug}`}><img src={project.image} alt={project.title}/></Link>)}
    </div> : <NetworkPaper/>}
  </section>;
}
