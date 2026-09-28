import {useEffect, useRef, useState} from 'react';
import {Link, useSearchParams} from 'react-router';
import {products} from '~/content/editorial';
import {Artwork} from '~/components/Artwork';
import {isWhitespace} from '~/components/ViewControls';
import {viewIndex} from '~/content/views';
export function meta() {return [{title:'Gallery — Formal'}];}
export default function Gallery() {
  const [params] = useSearchParams();
  const view = viewIndex('gallery', params.get('view'));
  const [center,setCenter] = useState(0);
  const [selection,setSelection] = useState(() => ({
    visible: products.map((_,index)=>index).slice(0,7),
    queue: products.map((_,index)=>index).slice(7),
    step: 0,
  }));
  const shuffle = () => setSelection(current => {
    if (!current.queue.length) return current;
    const visible = [...current.visible];
    const queue = [...current.queue];
    const count = Math.min(2 + current.step % 2, queue.length);
    const start = current.step * 3 % visible.length;
    // Bring a few new studies in, keeping the remaining objects in the scene.
    for (let index=0; index<count; index++) {
      const slot = (start+index) % visible.length;
      const incoming = queue.shift()!;
      queue.push(visible[slot]);
      visible[slot] = incoming;
    }
    const first = (start+count) % visible.length;
    const second = (first+1) % visible.length;
    [visible[first],visible[second]] = [visible[second],visible[first]];
    return {visible,queue,step:current.step+1};
  });
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
  return <section className={`gallery-page gallery-view-${view}`} aria-label="Product gallery" onClick={event=>{if(swiped.current){swiped.current=false;return;}if(view===1 && isWhitespace(event))shuffle();}}>
    {view===0 ? <div ref={belt} className="conveyor" onDragStart={event=>event.preventDefault()} role="region" aria-label="Single product view" tabIndex={0} onKeyDown={event=>{if(event.key==='ArrowLeft'){event.preventDefault();rotate(-1);}if(event.key==='ArrowRight'){event.preventDefault();rotate(1);}}} onPointerDown={event=>{pointer.current=event.clientX;swiped.current=false;}} onPointerUp={event=>{if(pointer.current!==null && Math.abs(event.clientX-pointer.current)>45){swiped.current=true;rotate(event.clientX<pointer.current?1:-1);}pointer.current=null;}} onPointerCancel={()=>{pointer.current=null;}}>
      {products.map((product,index)=>{
        let distance=(index-center+products.length)%products.length;
        if(distance>products.length/2)distance-=products.length;
        const active=distance===0;
        const hidden=Math.abs(distance)>2;
        const visual=<Artwork kind={product.art}/>;
        return <div key={product.slug} className={`belt-object offset-${distance} ${active?'is-center':''} ${hidden?'is-offstage':''}`}>
          {active ? <Link to={`/products/${product.slug}`} aria-label={product.name} onClick={event=>{if(swiped.current)event.preventDefault();}}>{visual}</Link> : <button tabIndex={hidden?-1:0} aria-hidden={hidden} aria-label={`Center ${product.name}`} onClick={()=>{if(!swiped.current)setCenter(index);}}>{visual}</button>}
        </div>;
      })}
      <div className="belt-position" aria-live="polite">{String(center+1).padStart(2,'0')} / {String(products.length).padStart(2,'0')}</div>
    </div> : view===1 ? <div className="scatter-stage" role="region" aria-label="Multi product view. Click empty space or press Space to shuffle." tabIndex={0} onKeyDown={event=>{if(event.target===event.currentTarget && (event.key===' ' || event.key==='Enter')){event.preventDefault();shuffle();}}}>
      {selection.visible.map((productIndex,slot)=>{const product=products[productIndex];return <Link key={product.slug} className={`scatter-object scatter-slot-${slot}`} to={`/products/${product.slug}`} aria-label={product.name}><Artwork kind={product.art}/></Link>;})}
    </div> : <div className="product-grid">{products.map(product=><Link key={product.slug} to={`/products/${product.slug}`} aria-label={product.name}><div className="grid-art"><Artwork kind={product.art}/></div></Link>)}</div>}
  </section>;
}
