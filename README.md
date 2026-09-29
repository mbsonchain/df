# Formal / Desert Formal

Custom Shopify Hydrogen storefront, hosted on Shopify Oxygen at desertformal.com. Source and revision history are saved in GitHub: mbsonchain/df.

## Homepage release

The public release displays the approved FORMAL homepage, with its flower, six moving clocks and centered regional footer. Gallery, About, Network, Cart, FORMAL and the flower remain visible but inactive. Requests to unfinished pages and cart actions redirect to Home before loading Shopify data.

Production builds are locked by default. The GitHub workflow sets `VITE_FORMAL_PREVIEW=true` for branches other than `main`, preserving the complete interactive site in preview. `main` deploys the locked public release. Local development is unlocked. This switch is a build setting, never a visitor query parameter. Change the launch policy deliberately when the full site is approved.

## Working on the site

Use Node.js and `npm ci`. Link with `shopify hydrogen link`, then pull the appropriate environment with `shopify hydrogen env pull`. Keep `.env`, `.shopify/`, tokens and deployment logs private.

- `npm run dev`: local development, with all working pages.
- `npm run typecheck`: TypeScript and route checks.
- `node scripts/check-launch.mjs`: production/preview access checks.
- `npm run build`: locked production build.
- `VITE_FORMAL_PREVIEW=true npm run build`: complete preview build.

Push design updates to `desert-formal-skeleton`. GitHub Actions builds and deploys a new immutable Oxygen preview; the workflow summary links to that exact revision. An older preview URL will continue showing its older code. Pushes to `main` publish production, so keep ongoing design revisions on the preview branch.

## Content and saved progress

Editable sample content lives under `app/content/`, separately from layout and styles. These are design studies, not purchasable products. About has three centered placeholder sections: FORMAL, DESERT FORMAL and PURCHASING. The flower source is in `app/content/site.ts` and can be replaced through Shopify Files.

See [PROGRESS.md](PROGRESS.md) for the accepted direction and next stages. The original Strikeout theme has a separate local backup and saved Shopify duplicate; it is not replaced by this application.

The homepage retains `noindex, nofollow` during this initial release. Mobile and final content remain unfinished by agreement.
