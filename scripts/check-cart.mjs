// Run after VITE_FORMAL_PREVIEW=true npm run build. No external requests are made.
import assert from 'node:assert/strict';
import {InMemoryCache} from '@shopify/hydrogen';

const originalFetch = globalThis.fetch;
const originalCaches = globalThis.caches;
const originalError = console.error;
const env = {
  SESSION_SECRET: 'offline-cart-check',
  PUBLIC_STORE_DOMAIN: 'example.myshopify.com',
  PUBLIC_STOREFRONT_API_TOKEN: 'offline-cart-check',
  PUBLIC_CHECKOUT_DOMAIN: 'example.myshopify.com',
  PUBLIC_STOREFRONT_ID: '1',
};
const money = {amount: '40.00', currencyCode: 'USD'};
const filledCart = {
  id: 'gid://shopify/Cart/offline-check',
  totalQuantity: 1,
  checkoutUrl: 'https://example.myshopify.com/checkout',
  cost: {subtotalAmount: money},
  lines: {nodes: [{
    id: 'gid://shopify/CartLine/offline-check',
    quantity: 1,
    cost: {totalAmount: money},
    merchandise: {title: 'small', image: null, product: {title: 'test shirt'}},
  }]},
};
let requests = 0;
let reply;

try {
  globalThis.caches = {open: async () => new InMemoryCache()};
  globalThis.fetch = async () => {
    requests++;
    if (reply instanceof Error) throw reply;
    assert.ok(reply, 'A cart with no cookie must not request Shopify data');
    return Response.json(reply);
  };
  // Expected API failures are asserted below, without noisy stack traces.
  console.error = () => {};
  const {default: worker} = await import('../dist/server/index.js');
  async function page(path, cookie = '') {
    const response = await worker.fetch(new Request('https://offline-check.invalid' + path, {
      headers: {'user-agent': 'Googlebot', cookie},
    }), env, {waitUntil: () => {}});
    const html = await response.text();
    assert.equal(response.status, 200, path + ' must stay available');
    assert.ok(!html.includes('This page is temporarily unavailable.'), 'No root error screen');
    return html;
  }
  const empty = await page('/cart');
  assert.ok(empty.includes('your cart is empty.'));
  assert.ok(empty.includes('href="/about#purchasing"'));
  assert.equal(requests, 0);
  assert.ok((await page('/')).includes('href="/cart"'));
  assert.ok((await page('/about')).includes('id="purchasing"'));

  reply = {data: {cart: null}};
  assert.ok((await page('/cart', 'cart=expired-check')).includes('your cart is empty.'));

  reply = {data: {cart: filledCart}};
  const filled = await page('/cart', 'cart=valid-check');
  assert.ok(filled.includes('test shirt'));
  assert.ok(filled.includes('continue to checkout'));
  assert.ok(!filled.includes('your cart is empty.'));

  for (const failure of [
    {data: {cart: null}, errors: [{message: 'Invalid cart id'}]},
    new Error('Shopify connection failed'),
  ]) {
    reply = failure;
    const recovered = await page('/cart', 'cart=failed-check');
    assert.ok(recovered.includes('your cart couldn’t be loaded.'));
    assert.ok(recovered.includes('try again'));
    assert.ok(recovered.includes('href="/about#purchasing"'));
    assert.ok(!recovered.includes('your cart is empty.'), 'Do not mislabel a failed lookup as empty');
    assert.ok((await page('/cart.data', 'cart=failed-check')).includes('cartUnavailable'));
  }
  console.log('Cart checks passed: empty, expired, populated, API error, connection failure, navigation data, and purchasing destination.');
} finally {
  globalThis.fetch = originalFetch;
  globalThis.caches = originalCaches;
  console.error = originalError;
}
