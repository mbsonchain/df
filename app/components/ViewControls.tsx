export function ViewControls({labels,active,onChange}: {labels:readonly string[];active:number;onChange:(index:number)=>void}) {
  return <nav className="view-controls" aria-label="Choose a view">{labels.map((label,index)=><button key={label} aria-pressed={index===active} onClick={()=>onChange(index)}>{label}</button>)}</nav>;
}
export function isWhitespace(event:React.MouseEvent<HTMLElement>) {
  return event.target instanceof Element && !event.target.closest('a,button,select,input,summary,details,p,h1,h2,h3,span,[data-interactive]') && !window.getSelection()?.toString();
}
