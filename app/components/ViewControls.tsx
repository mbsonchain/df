export function isWhitespace(event:React.MouseEvent<HTMLElement>) {
  return event.target instanceof Element && !event.target.closest('a,button,select,input,summary,details,p,h1,h2,h3,span,[data-interactive]') && !window.getSelection()?.toString();
}
