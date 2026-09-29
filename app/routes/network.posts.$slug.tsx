import {Link,useParams} from 'react-router';
import {posts} from '~/content/editorial';
import {identity} from '~/content/site';
export function meta(){return [{title:'Notebook — Formal'}];}
export default function Post(){
 const {slug}=useParams();const post=posts.find(item=>item.id===slug);
 if(!post)return <article className="reading-page"><h1>Story not found.</h1><Link to="/network">Return to network ↗</Link></article>;
 return <article className="reading-page"><Link className="back-link" to="/network?view=desert">← network / desert</Link><p className="micro">{post.kind} / {post.number}</p><h1>{post.title}</h1><p className="reading-lead">{post.subtitle}</p><div className="reading-image"><img src={identity.flower} alt="Formal flower study"/></div><p>{post.body}</p><p>{post.detail}</p><p className="content-note">A sample entry, ready for your photographs and writing.</p><Link className="read-link" to="/network?view=everything">everything ↗</Link></article>;
}
