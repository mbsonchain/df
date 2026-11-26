import {useEffect, useRef, useState} from 'react';
import {Link, useSearchParams} from 'react-router';
import {products} from '~/content/products';
import {Artwork} from '~/components/Artwork';
import {viewIndex} from '~/content/views';
export function meta() {return [{title:'Gallery — FORMAL'}];}
export default function Gallery() {
  const [params] = useSearchParams();
  const view = viewIndex('gallery', params.get('view'));
  const [center,setCenter] = useState(() => Math.max(0, products.findIndex(product => product.slug === params.get('item'))));
  const belt = useRef<HTMLDivElement>(null);
  const wheelAt = useRef(0);
  const pointer = useRef<{x:number;y:number} | null>(null);
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
  return <section className={`gallery-page gallery-view-${view}`} aria-label="Product gallery">
    {view===0 ? <div ref={belt} className="conveyor" onDragStart={event=>event.preventDefault()} role="region" aria-label="Single product view" tabIndex={0} onKeyDown={event=>{if(event.key==='ArrowLeft'){event.preventDefault();rotate(-1);}if(event.key==='ArrowRight'){event.preventDefault();rotate(1);}}} onPointerDown={event=>{if(event.button!==0)return;pointer.current={x:event.clientX,y:event.clientY};swiped.current=false;}} onPointerUp={event=>{if(pointer.current){const dx=event.clientX-pointer.current.x;const dy=event.clientY-pointer.current.y;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)){swiped.current=true;rotate(dx<0?1:-1);}}pointer.current=null;}} onPointerCancel={()=>{pointer.current=null;}} onClickCapture={event=>{if(swiped.current){event.preventDefault();event.stopPropagation();swiped.current=false;}}}>
      <h1 className="belt-season">FORMAL AW27</h1>
      <button className="belt-step belt-step-left" aria-label="Previous product" onClick={()=>rotate(-1)}/>
      <button className="belt-step belt-step-right" aria-label="Next product" onClick={()=>rotate(1)}/>
      {products.map((product,index)=>{
        let distance=(index-center+products.length)%products.length;
        if(distance>products.length/2)distance-=products.length;
        const active=distance===0;
        const hidden=Math.abs(distance)>2;
        const visual=<Artwork kind={product.art}/>;
        return <div key={product.slug} className={`belt-object offset-${distance} ${active?'is-center':''} ${hidden?'is-offstage':''}`} aria-hidden={!active}>
          {active ? <Link to={`/products/${product.slug}`} aria-label={product.name}>{visual}</Link> : visual}
        </div>;
      })}
      <div className="belt-position" aria-live="polite">
        <Link className="belt-name" to={`/products/${products[center].slug}`} tabIndex={-1}>{products[center].name}</Link>
        <span>CONAMORE</span>
      </div>
    </div> : <div className="product-grid">
      {products.map(product => <Link key={product.slug} to={`/products/${product.slug}?view=all`}>
        <span className="grid-art"><Artwork kind={product.art}/></span>
        <span className="grid-product-name">{product.name}</span>
      </Link>)}
    </div>}
  </section>;
}
