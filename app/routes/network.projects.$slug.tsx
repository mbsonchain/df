import {Link,useParams} from 'react-router';
import {projects} from '~/content/site';
export function meta(){return [{title:'Projects — Formal'}];}
export default function Project(){
 const {slug}=useParams();const project=projects.find(item=>item.slug===slug);
 if(!project)return <article className="reading-page"><h1>Project not found.</h1><Link to="/network?view=formal">Return to formal ↗</Link></article>;
 return <article className="project-detail"><Link className="back-link" to="/network?view=formal">← network / formal</Link><div className="project-hero"><img src={project.image} alt={project.title}/></div><div className="project-description"><p className="micro">{project.category}</p><h1>{project.title}</h1><p>{project.note}</p><p className="content-note">Project page study. The full story, imagery, and related work will live here.</p><Link to="/network?view=explore">explore ↗</Link></div></article>;
}
