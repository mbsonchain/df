import {Link, useParams} from 'react-router';
import {products} from '~/content/editorial';
import {Artwork} from '~/components/Artwork';
export function meta() {return [{title: 'An object — Desert Formal'}];}
export default function Product() {
  const {slug} = useParams();
  const product = products.find((item) => item.slug === slug);
  if (!product) return <div className="about-page"><h1>Object not found.</h1><Link to="/gallery">Return to gallery ↗</Link></div>;
  return <article className="product-page"><div className={`product-study color-${product.color}`}><Artwork kind={product.art}/><span>Object study / sample illustration</span></div><div className="product-info"><Link to="/gallery" className="text-button">← Back to gallery</Link><p className="eyebrow">{product.category}</p><h1>{product.name}</h1><p>A placeholder object for exploring the gallery. Your product photography, description, price, and available options will take its place.</p><div className="product-status">Sample product — not available to purchase</div><details><summary>Details & materials +</summary><p>Product details will come from Shopify, separately from the page design.</p></details></div></article>;
}
