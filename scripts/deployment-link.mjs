import {readFileSync, appendFileSync} from 'node:fs';

// Print only the URL, never the full deployment object or an authentication token.
const {url} = JSON.parse(readFileSync('h2_deploy_log.json', 'utf8'));
const link = new URL(url);
if (link.protocol !== 'https:' || !link.hostname.endsWith('.myshopify.dev') || link.search || link.hash || link.username || link.password) {
  throw new Error('Unexpected deployment URL');
}
console.log('Storefront deployment: ' + link.href);
if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, '[Open this storefront revision](' + link.href + ')\n');
}
