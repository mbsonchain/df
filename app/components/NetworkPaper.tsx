import {Link} from 'react-router';
import {posts} from '~/content/editorial';
import {identity, projects} from '~/content/site';

export function NetworkPaper() {
  return <div className="network-paper" aria-label="All stories and projects">
    {posts.map((post, index) => <article className="paper-cell" key={post.id}>
      <Link className={`paper-card paper-story-${index}`} to={`/network/posts/${post.id}`} aria-labelledby={`paper-${post.id}`}>
        <div className="paper-meta"><span>desert / {post.number}</span><span>{post.kind}</span></div>
        <div className="paper-visual" aria-hidden="true">
          {index === 0 ? <span className="paper-wordmark">open<br/>country</span> : index === 1
            ? <img src={identity.flower} alt="" loading="lazy"/>
            : <span className="paper-film"><span className="paper-play">▷</span></span>}
        </div>
        <div className="paper-copy"><h2 id={`paper-${post.id}`}>{post.title}</h2><p>{post.subtitle}</p></div>
      </Link>
    </article>)}
    {projects.map((project, index) => <article className="paper-cell" key={project.slug}>
      <Link className="paper-card paper-project" to={`/network/projects/${project.slug}`} aria-labelledby={`paper-${project.slug}`}>
        <div className="paper-meta"><span>portfolio / {String(index + 1).padStart(2, '0')}</span><span>{project.category}</span></div>
        <div className="paper-visual"><img src={project.image} alt="" loading="lazy"/></div>
        <div className="paper-copy"><h2 id={`paper-${project.slug}`}>{project.title}</h2><p>{project.note}</p></div>
      </Link>
    </article>)}
  </div>;
}
