import {useEffect, useRef, useState} from 'react';
import {Link, useSearchParams} from 'react-router';
import {products} from '~/content/editorial';
import {Artwork} from '~/components/Artwork';
import {viewIndex} from '~/content/views';
export function meta() {return [{title:'Gallery — Formal'}];}
export default function Gallery() {
  const [params] = useSearchParams();
  const view = viewIndex('gallery', params.get('view'));
  const [center,setCenter] = useState(0);
  const belt = useRef<HTMLDivElement>(null);
  const wheelAt = useRef(0);
  const pointer = useRef<number | null>(null);
  const swiped = useRef(false);
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
  return <section className={`gallery-page gallery-view-${view}`} aria-label="Product gallery" onClick={()=>{swiped.current=false;}}>
    {view===0 ? <div ref={belt} className="conveyor" onDragStart={event=>event.preventDefault()} role="region" aria-label="Single product view" tabIndex={0} onKeyDown={event=>{if(event.key==='ArrowLeft'){event.preventDefault();rotate(-1);}if(event.key==='ArrowRight'){event.preventDefault();rotate(1);}}} onPointerDown={event=>{pointer.current=event.clientX;swiped.current=false;}} onPointerUp={event=>{if(pointer.current!==null && Math.abs(event.clientX-pointer.current)>45){swiped.current=true;rotate(event.clientX<pointer.current?1:-1);}pointer.current=null;}} onPointerCancel={()=>{pointer.current=null;}}>
      {products.map((product,index)=>{
        let distance=(index-center+products.length)%products.length;
        if(distance>products.length/2)distance-=products.length;
        const active=distance===0;
        const hidden=Math.abs(distance)>1;
        const visual=<Artwork kind={product.art}/>;
        return <div key={product.slug} className={`belt-object offset-${distance} ${active?'is-center':''} ${hidden?'is-offstage':''}`}>
          {active ? <Link to={`/products/${product.slug}`} aria-label={product.name} onClick={event=>{if(swiped.current)event.preventDefault();}}>{visual}</Link> : <button tabIndex={hidden?-1:0} aria-hidden={hidden} aria-label={`Center ${product.name}`} onClick={()=>{if(!swiped.current)setCenter(index);}}>{visual}</button>}
        </div>;
      })}
      <div className="belt-position" aria-live="polite">{String(center+1).padStart(2,'0')} / {String(products.length).padStart(2,'0')}</div>
    </div> : <div className="product-grid">{products.map(product=><Link key={product.slug} to={`/products/${product.slug}`} aria-label={product.name}><div className="grid-art"><Artwork kind={product.art}/></div></Link>)}</div>}
  </section>;
}
