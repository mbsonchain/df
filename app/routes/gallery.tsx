import {useEffect, useRef, useState} from 'react';
import {Link, useSearchParams} from 'react-router';
import {products} from '~/content/editorial';
import {Artwork} from '~/components/Artwork';
import {ViewControls, isWhitespace} from '~/components/ViewControls';
const views = ['conveyor','scattered','view all'] as const;
const keys = ['conveyor','scattered','all'];
export function meta() {return [{title:'Gallery — Formal'}];}
export default function Gallery() {
  const [params,setParams] = useSearchParams();
  const view = Math.max(0,keys.indexOf(params.get('view') ?? 'conveyor'));
  const [center,setCenter] = useState(0);
  const [arrangement,setArrangement] = useState(0);
  const belt = useRef<HTMLDivElement>(null);
  const wheelAt = useRef(0);
  const pointer = useRef<number | null>(null);
  const swiped = useRef(false);
  const change = (index:number) => setParams({view:keys[index]}, {preventScrollReset:true});
  const rotate = (amount:number) => setCenter(value=>(value+amount+products.length)%products.length);
  useEffect(() => {
    const element=belt.current;
    if(!element)return;
    const wheel=(event:WheelEvent)=>{
      if(event.ctrlKey || Math.max(Math.abs(event.deltaX),Math.abs(event.deltaY))<4)return;
      event.preventDefault();
      if(performance.now()-wheelAt.current<280)return;
      wheelAt.current=performance.now();
      const delta=Math.abs(event.deltaX)>Math.abs(event.deltaY)?event.deltaX:event.deltaY;
      setCenter(value=>(value+(delta>0?1:-1)+products.length)%products.length);
    };
    element.addEventListener('wheel',wheel,{passive:false});
    return ()=>element.removeEventListener('wheel',wheel);
  },[view]);
  return <section className={`gallery-page gallery-view-${view}`} aria-label="Product gallery" onClick={event=>{if(swiped.current){swiped.current=false;return;}if(isWhitespace(event))change((view+1)%3);}}>
    <div className="section-heading"><span>Gallery</span><span>Objects, in circulation</span><span>01—06</span></div>
    {view===0 ? <div ref={belt} className="conveyor" onDragStart={event=>event.preventDefault()} role="region" aria-label="Product conveyor" tabIndex={0} onKeyDown={event=>{if(event.key==='ArrowLeft'){event.preventDefault();rotate(-1);}if(event.key==='ArrowRight'){event.preventDefault();rotate(1);}}} onPointerDown={event=>{pointer.current=event.clientX;swiped.current=false;}} onPointerUp={event=>{if(pointer.current!==null && Math.abs(event.clientX-pointer.current)>45){swiped.current=true;rotate(event.clientX<pointer.current?1:-1);}pointer.current=null;}} onPointerCancel={()=>{pointer.current=null;}}>
      {products.map((product,index)=>{
        let distance=(index-center+products.length)%products.length;
        if(distance>products.length/2)distance-=products.length;
        const active=distance===0;
        const hidden=Math.abs(distance)>2;
        const visual=<><Artwork kind={product.art}/><span className="object-label">{product.name}</span></>;
        return <div key={product.slug} className={`belt-object offset-${distance} ${active?'is-center':''} ${hidden?'is-offstage':''}`}>
          {active ? <Link to={`/products/${product.slug}`} onClick={event=>{if(swiped.current)event.preventDefault();}}>{visual}</Link> : <button tabIndex={hidden?-1:0} aria-hidden={hidden} aria-label={`Center ${product.name}`} onClick={()=>{if(!swiped.current)setCenter(index);}}>{visual}</button>}
        </div>;
      })}
      <button className="belt-arrow previous" aria-label="Previous product" onClick={()=>rotate(-1)}>←</button><button className="belt-arrow next" aria-label="Next product" onClick={()=>rotate(1)}>→</button>
      <div className="belt-position" aria-live="polite">{String(center+1).padStart(2,'0')} / {String(products.length).padStart(2,'0')}</div>
    </div> : view===1 ? <div className={`scatter-stage arrangement-${arrangement}`}>
      {products.map((product,index)=><Link key={product.slug} className={`scatter-object object-${index}`} to={`/products/${product.slug}`}><Artwork kind={product.art}/><span>{product.name}</span></Link>)}
      <button className="rearrange-control" onClick={()=>setArrangement(value=>(value+1)%3)}>rearrange ↻</button>
    </div> : <div className="product-grid">{products.map((product,index)=><Link key={product.slug} to={`/products/${product.slug}`}><div className="grid-art"><Artwork kind={product.art}/></div><span className="grid-label"><span>{product.name}</span><span>{String(index+1).padStart(2,'0')}</span></span></Link>)}</div>}
    <div className="view-bar"><ViewControls labels={views} active={view} onChange={change}/><p className="space-hint">click the space to change the view</p></div>
  </section>;
}
