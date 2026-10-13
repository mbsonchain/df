import {aboutSections, aboutSocialLinks} from '~/content/about';

export function meta() {return [{title: 'About — Formal'}];}

export default function About() {
  return <article className="about-page">
    <h1 className="sr-only">About</h1>
    {aboutSections.map(section => <section className="about-section" key={section.id} id={section.id} aria-labelledby={`about-heading-${section.id}`} tabIndex={-1}>
      <h2 id={`about-heading-${section.id}`}>{section.title}</h2>
      <p>{section.body}</p>
    </section>)}
    <footer className="about-colophon">
      <nav aria-label="Social links">{aboutSocialLinks.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>)}</nav>
      <p>© {new Date().getUTCFullYear()} formal</p>
    </footer>
  </article>;
}
