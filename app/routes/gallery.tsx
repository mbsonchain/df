import {useState} from 'react';
import {Link} from 'react-router';
import {Artwork} from '~/components/Artwork';
import {products} from '~/content/editorial';
export function meta() {return [{title: 'Gallery — Desert Formal'}];}
export default function Gallery() {
  const [arrangement, setArrangement] = useState(0);
  return <section className={`gallery-scene arrangement-${arrangement}`} aria-label="Product gallery">
    <div className="gallery-center"><p className="eyebrow">A collection of possibilities</p><h1><button className="formal rearrange" onClick={() => setArrangement((n) => (n + 1) % 3)} aria-label="Rearrange product gallery">FORMAL</button></h1><p className="gesture">Click the name. See things differently.</p></div>
    {products.map((product, index) => <Link key={product.slug} to={`/products/${product.slug}`} className={`product-object object-${index} color-${product.color}`}><Artwork kind={product.art}/><span className="product-caption"><span>{product.name}</span><span>↗</span></span></Link>)}
    <p className="gallery-footnote">Six sample objects / choose one to explore</p>
    <span className="sr-only" role="status">Arrangement {arrangement + 1} of 3</span>
  </section>;
}
