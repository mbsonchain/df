import {aboutSections} from '~/content/about';

export function meta() {return [{title: 'About — Formal'}];}

export default function About() {
  return <article className="about-page">
    <h1 className="sr-only">About</h1>
    {aboutSections.map((section, index) => <section className="about-section" key={section.title} aria-labelledby={`about-heading-${index}`}>
      <h2 id={`about-heading-${index}`}>{section.title}</h2>
      <p>{section.body}</p>
    </section>)}
  </article>;
}
