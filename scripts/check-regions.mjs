// Run against the production build. All requests stay inside the local worker.
import assert from 'node:assert/strict';
import {InMemoryCache} from '@shopify/hydrogen';
import worker from '../dist/server/index.js';

globalThis.caches = {open: async () => new InMemoryCache()};
const env = {
  SESSION_SECRET: 'offline-region-check',
  PUBLIC_STORE_DOMAIN: 'example.myshopify.com',
  PUBLIC_STOREFRONT_API_TOKEN: 'offline-region-check',
  PUBLIC_CHECKOUT_DOMAIN: 'example.myshopify.com',
};
const territories = {
  Kilauea: 'hawaii',
  Conamore: 'rest of americas / asia / pacific',
  Copenhagen: 'rest of europe / africa / atlantic',
  Milano: 'italia',
};
const cities = Object.keys(territories);
async function page(path, coordinates, zone) {
  const headers = new Headers({'user-agent': 'Googlebot'});
  if (coordinates) {
    headers.set('oxygen-buyer-latitude', coordinates[0]);
    headers.set('oxygen-buyer-longitude', coordinates[1]);
  }
  if (zone) headers.set('oxygen-buyer-timezone', zone);
  const response = await worker.fetch(new Request('https://example.test' + path, {headers}), env, {waitUntil() {}});
  assert.equal(response.status, 200);
  return response;
}

for (const [coordinates, zone, expected] of [
  [[21.31, -157.86], 'Europe/Rome', 'Kilauea'],  // Access location wins over time zone.
  [[37.80, -122.27], null, 'Conamore'],          // Oakland
  [[52.52, 13.40], null, 'Copenhagen'],          // Berlin
  [[41.01, 28.98], null, 'Milano'],              // Istanbul
  [[0, 179.9], null, 'Kilauea'],                 // Across the date line
  [[0, 0], null, 'Milano'],                      // Zero is a valid coordinate.
  [null, 'Europe/Copenhagen', 'Copenhagen'],
  [null, 'Europe/Paris', 'Milano'],               // Same UTC offset as Copenhagen.
  [['', 0], 'US/Hawaii', 'Kilauea'],
  [[91, 181], 'America/Los_Angeles', 'Conamore'],
]) {
  const response = await page('/', coordinates, zone);
  assert.match(response.headers.get('Cache-Control'), /private.*no-store/);
  const html = await response.text();
  const strip = html.match(/<div class="clock-run" aria-hidden="false">(.*?)<\/div>/s)[1];
  assert.deepEqual([...strip.matchAll(/class="city-clock"[^>]*><span>(\w+)<\/span>/g)].map(match => match[1]), cities);
  assert.deepEqual([...strip.matchAll(/aria-current="location"><span>(\w+)<\/span>/g)].map(match => match[1]), [expected]);
  assert.ok(html.includes('<span class="location-name">' + expected + '</span>'));
  assert.doesNotMatch(html, /pause moving clocks|resume moving clocks/i);
  const directory = html.match(/<ul class="edition-options">(.*?)<\/ul>/s)[1];
  assert.deepEqual([...directory.matchAll(/<small>([^<]+)<\/small>/g)].map(match => match[1]), Object.values(territories));
  assert.equal(directory.match(/aria-current="location"/g)?.length, 1);
  assert.ok(directory.match(/<li aria-current="location">(.*?)<\/li>/s)[1].includes('<small>' + territories[expected] + '</small>'));
  assert.doesNotMatch(directory, /<(button|a|input|select)\b/);
}

const unknown = await (await page('/', null, 'Etc/UTC')).text();
assert.doesNotMatch(unknown, /aria-current="location"/, 'Wait for the browser fallback when the request has no geographic hint.');
const data = await page('/_root.data', [41.01, 28.98], null);
assert.match(data.headers.get('Cache-Control'), /private.*no-store/);
assert.match(await data.text(), /milano/i);
console.log('Regional checks passed for all four sites, access and fallback locations, clock highlights and the read-only directory.');
