import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';

const source = readFileSync(new URL('../app/lib/launch.ts', import.meta.url), 'utf8');
async function loadLaunch(env) {
  const {outputText} = ts.transpileModule(source.replaceAll('import.meta.env', JSON.stringify(env)), {
    compilerOptions: {target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022},
  });
  return import('data:text/javascript;base64,' + Buffer.from(outputText).toString('base64'));
}
const routes = ['/gallery', '/gallery?view=capsule', '/about', '/conamore', '/conamore.data', '/amore', '/amore.data', '/network', '/network/posts/a-story', '/network/projects/strikeout', '/products/study-01', '/cart', '/website', '/about.data', '/cart.data', '/network.data', '/gallery/', '/not-yet-built'];

for (const preview of [undefined, 'false', 'TRUE']) {
  const {homeOnly, launchResponse} = await loadLaunch({DEV: false, VITE_FORMAL_PREVIEW: preview});
  assert.equal(homeOnly, true, 'Production is locked unless explicitly built as a preview');
  for (const path of routes) {
    for (const method of ['GET', 'HEAD', 'POST']) {
      const response = launchResponse(new Request('https://desertformal.com' + path, {method}));
      assert.equal(response.status, method === 'POST' ? 303 : 302, method + ' ' + path);
      assert.equal(response.headers.get('Location'), '/');
      assert.equal(response.headers.get('Cache-Control'), 'no-store');
    }
  }
  for (const path of ['/', '/?view=all', '/_root.data', '/__manifest?version=abc', '/assets/app.js']) {
    assert.equal(launchResponse(new Request('https://desertformal.com' + path)), undefined);
  }
  for (const path of ['/', '/_root.data', '/__manifest', '/assets/app.js']) {
    assert.equal(launchResponse(new Request('https://desertformal.com' + path, {method: 'POST'})).status, 303);
  }
  assert.match(await launchResponse(new Request('https://desertformal.com/robots.txt')).text(), /Disallow: \//);
}
for (const env of [{DEV: true}, {DEV: false, VITE_FORMAL_PREVIEW: 'true'}]) {
  const {homeOnly, launchResponse} = await loadLaunch(env);
  assert.equal(homeOnly, false);
  for (const path of routes) {
    assert.equal(launchResponse(new Request('https://preview.myshopify.dev' + path)), undefined);
    assert.equal(launchResponse(new Request('https://preview.myshopify.dev' + path, {method: 'POST'})), undefined);
  }
}
console.log('Launch checks passed: production routes and actions locked; previews remain open.');
