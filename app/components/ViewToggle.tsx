import {Link} from 'react-router';
import {FormalText} from './FormalText';

export function ViewToggle({section, labels, links, active}: {
  section: 'gallery' | 'network';
  labels: readonly [string, string];
  links: readonly [string, string];
  active: number;
}) {
  return <nav className="view-toggle" aria-label={`${section} views`}>
    <Link to={links[0]} aria-current={active === 0 ? 'page' : undefined}>
      <FormalText>{labels[0]}</FormalText>
    </Link>
    <Link className={`view-toggle-switch ${active === 1 ? 'is-second' : ''}`}
      to={links[active === 0 ? 1 : 0]}
      aria-label={`Switch to ${labels[active === 0 ? 1 : 0]}`}>
      <span className="view-toggle-track" aria-hidden="true"><span/></span>
    </Link>
    <Link to={links[1]} aria-current={active === 1 ? 'page' : undefined}>
      <FormalText>{labels[1]}</FormalText>
    </Link>
  </nav>;
}
