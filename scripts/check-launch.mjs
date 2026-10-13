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
const routes = ['/gallery', '/gallery?view=capsule', '/about', '/conamore', '/conamore.data', '/amore', '/amore.data', '/collection', '/collection.data', '/network', '/network/posts/a-story', '/network/projects/strikeout', '/products/study-01', '/cart', '/website', '/about.data', '/cart.data', '/network.data', '/gallery/', '/not-yet-built'];

{
  const {homeOnly, launchResponse} = await loadLaunch({DEV: false, VITE_FORMAL_HOME_ONLY: 'true'});
  assert.equal(homeOnly, true, 'Home-only mode requires explicit opt-in');
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
for (const env of [{DEV: true}, {DEV: true, VITE_FORMAL_HOME_ONLY: 'true'}, {DEV: false}, {DEV: false, VITE_FORMAL_HOME_ONLY: 'false'}, {DEV: false, VITE_FORMAL_HOME_ONLY: 'TRUE'}, {DEV: false, VITE_FORMAL_PREVIEW: 'false'}, {DEV: false, VITE_FORMAL_PREVIEW: 'true'}]) {
  const {homeOnly, launchResponse} = await loadLaunch(env);
  assert.equal(homeOnly, false);
  for (const path of ['/', '/_root.data', '/__manifest', '/assets/app.js', '/formal-anarchy-brush-source.webp', ...routes]) {
    for (const method of ['GET', 'HEAD', 'POST']) {
      assert.equal(launchResponse(new Request('https://desertformal.com' + path, {method})), undefined, method + ' ' + path);
    }
  }
}
console.log('Launch checks passed: public routes are open by default; explicit Home-only mode still works.');
