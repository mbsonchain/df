import {Form,Link,data,useActionData,useLoaderData,useNavigation} from 'react-router';
import {Money} from '@shopify/hydrogen';
import type {Route} from './+types/cart';
export async function loader({context}:Route.LoaderArgs){
  return {cart:context.cart.getCartId()?await context.cart.get():null};
}
export async function action({request,context}:Route.ActionArgs){
  const form=await request.formData();
  const id=form.get('lineId');
  if(typeof id!=='string'||!id)return data({error:'Choose an item to update.'},{status:400});
  const intent=form.get('intent');
  let result;
  if(intent==='remove')result=await context.cart.removeLines([id]);
  else if(intent==='quantity'){
    const quantity=Number(form.get('quantity'));
    if(!Number.isInteger(quantity)||quantity<1||quantity>99)return data({error:'Choose a quantity between 1 and 99.'},{status:400});
    result=await context.cart.updateLines([{id,quantity}]);
  }else return data({error:'This cart action is not available.'},{status:400});
  const headers=result.cart?.id?context.cart.setCartId(result.cart.id):new Headers();
  return data({error:result.errors?.[0]?.message??null},{headers});
}
export function meta(){return [{title:'Cart — Formal'}];}
export default function Cart(){
 const {cart}=useLoaderData<typeof loader>();const result=useActionData<typeof action>();const pending=useNavigation().state!=='idle';
 return <section className="cart-page"><p className="micro">Your selection</p><h1>Cart<span>({cart?.totalQuantity??0})</span></h1>{result?.error&&<p role="alert">{result.error}</p>}
 {cart?.lines.nodes.length ? <><div className="cart-lines">{cart.lines.nodes.map(line=><article className="cart-line" key={line.id}>{line.merchandise.image&&<img src={line.merchandise.image.url} alt={line.merchandise.image.altText??line.merchandise.product.title}/>}<div><h2>{line.merchandise.product.title}</h2><p>{line.merchandise.title}</p><Money data={line.cost.totalAmount}/><Form method="post"><input type="hidden" name="lineId" value={line.id}/><label>Quantity <input name="quantity" type="number" min="1" max="99" defaultValue={line.quantity}/></label><button name="intent" value="quantity" disabled={pending}>update</button><button name="intent" value="remove" disabled={pending}>remove</button></Form></div></article>)}</div><div className="cart-total"><span>Subtotal</span><Money data={cart.cost.subtotalAmount}/></div><p className="content-note">Shipping and taxes calculated at checkout.</p><a className="checkout-link" href={cart.checkoutUrl}>continue to checkout ↗</a></> : <div className="empty-cart"><p>Nothing here. Yet.</p><Link to="/gallery">back to the gallery ↗</Link></div>}
 </section>;
}
