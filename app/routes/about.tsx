import {aboutSections, aboutSocialLinks} from '~/content/about';
import {FormalText} from '~/components/FormalText';

export function meta() {return [{title: 'About — FORMAL'}];}

export default function About() {
  return <article className="about-page">
    <h1 className="sr-only">About</h1>
    {aboutSections.map(section => <section className="about-section" key={section.id} id={section.id} aria-labelledby={`about-heading-${section.id}`} tabIndex={-1}>
      <h2 id={`about-heading-${section.id}`}><FormalText>{section.title}</FormalText></h2>
      <p><FormalText>{section.body}</FormalText></p>
    </section>)}
    <footer className="about-colophon">
      <nav aria-label="Social links">{aboutSocialLinks.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>)}</nav>
      <p>© {new Date().getUTCFullYear()} <FormalText>FORMAL</FormalText></p>
    </footer>
  </article>;
}
