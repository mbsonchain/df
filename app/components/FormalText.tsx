import {Fragment} from 'react';

// Keep the label uppercase, even inside otherwise lowercase copy.
export function FormalText({children}: {children: string}) {
  return <>{children.split(/(\bformal\b)/gi).map((part, index) =>
    /^formal$/i.test(part)
      ? <span className="formal-name" key={index}>FORMAL</span>
      : <Fragment key={index}>{part}</Fragment>,
  )}</>;
}
