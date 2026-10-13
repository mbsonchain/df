# Formal / Desert Formal

Custom Shopify Hydrogen storefront, hosted on Shopify Oxygen at desertformal.com. Source and revision history are saved in GitHub: mbsonchain/df.

## Public release — October 14, 2026

The current site is publicly accessible at desertformal.com: Home, Gallery, About, Network, Conamore, product study pages and Store. Navigation, the wordmark and the flower are active. This release includes the supplied pink brush anarchy overlay, eight clocks ordered by current time, regional brand names, the latest About copy and the phone wordmark sizing from the mobile preview.

The full site is enabled by default in production and preview builds. To intentionally restore the earlier homepage-only policy, build with `VITE_FORMAL_HOME_ONLY=true`; local development stays open. The flag is compiled into server and client consistently. Visitor query parameters cannot change access.

## Working on the site

Use Node.js and `npm ci`. Link with `shopify hydrogen link`, then pull the appropriate environment with `shopify hydrogen env pull`. Keep `.env`, `.shopify/`, tokens and deployment logs private.

- `npm run dev`: local development.
- `npm run typecheck`: TypeScript and route checks.
- `node scripts/check-launch.mjs`: public access and optional homepage-only checks.
- `node scripts/check-cart.mjs`: cart lookup recovery checks.
- `npm run build`: complete production build.
- `VITE_FORMAL_HOME_ONLY=true npm run build`: optional homepage-only build.

Design updates belong on preview branches. GitHub Actions deploys an immutable Oxygen preview for each push; previous preview URLs retain their earlier content. The main branch deploys to desertformal.com. Publish preview work to main only when requested.

The independent desert-formal-mobile branch provides the phone frame used for design review. The public site serves the responsive desktop implementation at every screen size, including the phone sizing adopted from that branch; it does not use the preview frame.

## Content and saved progress

Content is kept in app/content/. About uses Matteo’s current FORMAL, DESERT FORMAL and HOW TO PURCHASE copy. The gallery contains design studies rather than purchasable products. Network applications, purchase requests and final collection commerce are future work.

See PROGRESS.md for the accepted direction. Preserve the original Strikeout theme backups. The site retains its existing noindex, nofollow setting during this design stage.
