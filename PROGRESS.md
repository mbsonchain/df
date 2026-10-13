# Saved checkpoint — October 14, 2026

## Release scope

Matteo requested publishing the latest site and clarified that it should be accessible by going to desertformal.com. The October 14 release opens the current pages and navigation publicly, replacing the earlier homepage-only release. It includes the latest pink brush overlay, clocks, About copy and responsive phone sizing. Existing design studies and purchasing guidance are included; application and purchase-request functionality remain future work.

## Approved design and working interactions

- White background; original Articulat FORMAL wordmark, Courier-style small typography and pink flower. Home has the stationary wordmark, compact navigation and centered lowercase regional brand, location and seconds clock.
- White eight-city moving strip everywhere: Kilauea, Conamore (Los Angeles time), CDMX, London, Milano, Copenhagen, Amsterdam and Cape Town. It is inset from the top, keeps moving on hover and has an explicit pause control.
- Gallery and Network use the same flower and navigation sizes as Home. Clicking the flower switches between them.
- Gallery navigation: gallery / single — flower — all / conamore. Active view is pink. Single shows five products: a large center item, smaller neighbors and two even smaller outer items. Clicking anywhere on either side moves exactly one product; the center opens its detail. Scroll, swipe and keyboard arrows also navigate. All is the compact, unlabeled collection grid of 20 studies. Multi has been removed. Conamore is a separate blank page with an About-style heading and layout; /collection and /amore redirect to /conamore. Legacy Multi and Capsule query links show All.
- Network navigation: network / desert — flower — formal / explore. Desert retains the journal and its scroll-linked artifacts. Formal retains the rotating/rearranging project scene. Explore is a newspaper-like grid of six square panels linking to the three current stories and three projects. Legacy Live, Projects, Portfolio, Stuff, All and Everything query links still work.
- Inner footers have regional brand left, location and HH:MM:SS centered, and only home at right. Everything is lowercase in the same ink color. Time-zone estimation selects the location naturally, without a prompt or manual selector. Kilauea uses Island Formal, Conamore/CDMX use Desert Formal, London and Copenhagen use Freetown Formal, and Milano uses Spazio Libero.
- About has three centered blocks with lowercase body copy: FORMAL, DESERT FORMAL, HOW TO PURCHASE, using Matteo’s supplied label, network and purchasing copy. Home and About are fixed to the viewport without vertical scrolling. About sizes its three complete sections, social links and copyright to the available space. Its header and flower remain compact. Beneath How to Purchase are small Instagram (@desertformal), YouTube (@strikeout-studios) and Strikeout (strikeout.us) links, followed by the copyright. The Gallery subpage is now Conamore. The separate Conamore brand and clock location keep their name.
- Cart uses small lowercase monospaced text and a compact header. Its empty state reads “your cart is empty.” and “how to purchase”. The entire highlighted phrase links to /about#purchasing. This is an anchor link only, not an email signup yet. Studies are not purchasable; real collection data and complete commerce verification remain for later.

## Next stages, in order

1. Continue refining Desert Formal's pages and interactions in preview.
2. Finalize and lock the content and mobile site last.
3. Once Matteo finalizes the collection, work on tech packs and high-fidelity collection mockups. No work on these is requested yet.
4. Move on to the Strikeout and Conamore websites, one at a time. They are interactive visual archives without commerce. Reuse the agreed brand/header language while developing their individual structures.

Do not add paid subscriptions or build the future stages without a further request.

## Preservation

GitHub repository: mbsonchain/df. Working branch: desert-formal-skeleton. Public release branch: main. The About revision is saved in commit d8d164961118da497dc9aa245c23aedd28b9dad6, followed by the homepage release checkpoint.

Original Strikeout theme: local backup `backups/strikeout-2026-09-22/theme/` in the websites workspace; Shopify duplicate theme 166894043367 preserves original theme 154397507815. Do not overwrite or delete these backups.

## Current release

The current Gallery, newspaper index, About and Store revisions are included in the authorized October 14 public release. Main is the public deployment branch; future design updates remain on previews until another release is requested.

The navigation label is store across the site, including after opening it. The Store page heading and browser title use the same name. The existing /cart route, cart behavior and empty-cart wording stay unchanged.

## Site roles confirmed October 13, 2026

- desertformal.com is the Formal and Desert Formal site, including the label, personal work, gallery, journal/archive and products.
- strikeout.us is the Strikeout studio site.
- visitconamore.com is for Conamore as a project and mythology: a tourism-style site for Conamore and everything it contains, including the map, places, stories and artifacts.

London and Copenhagen use Freetown Formal. Milano keeps Spazio Libero.

Amsterdam (Europe/Amsterdam) and Cape Town (Africa/Johannesburg) are included in the top clock strip. They do not change the footer’s regional location selection.

The top clocks sort from earliest to latest UTC offset, recalculating each minute so daylight-saving changes stay in order. Equal-time cities retain their existing relative order.

The homepage layers Matteo’s supplied circle-A-symbol.webp brush symbol over the original black A in FORMAL. The original source is preserved in public/formal-anarchy-brush-source.webp; an SVG color filter removes the white background and recolors the ink to flower-petal pink (#efaec0), retaining the exact shape, gaps and brush texture. The overlay scales with the letter on desktop and mobile. This replaces the earlier procedural spray-paint version and is included in the public release.

The brush recoloring filter boosts ink coverage to make the painted pink strokes opaque over the black wordmark, while leaving the reference’s open brush gaps transparent.

## About copy — October 14, 2026

Replaced all three About placeholders with Matteo’s supplied copy: FORMAL’s purpose and values; desert FORMAL’s support for the label in broadcasting, distribution and art direction; and how network membership, purchase requests, at-cost access, sustainable production, limited batches and later out-of-network availability work. Corrected “a produce” to “a product” and capitalized sentence starts while retaining the brand styling. The purchase heading is HOW TO PURCHASE; its purchasing anchor remains compatible with Store. Sections size to their own copy within the existing fixed page. This copy is included in the public release; the application and purchase-request flows are not implemented by this change.

## Live access — October 14, 2026

Default production builds now serve the full current site. VITE_FORMAL_HOME_ONLY=true can deliberately restore homepage-only mode. The public responsive stylesheet includes the mobile preview’s 18vw phone wordmark sizing. The desert FORMAL copy begins “desert FORMAL is a network supporting the FORMAL label” and includes live broadcasting and distribution, art direction, sustainable development, and formalization independently of medium and time.

## About lowercase update — October 14, 2026

Matteo requested lowercase for the new About copy on mobile and desktop. All three About paragraphs now display in lowercase across screen sizes, retaining the existing section headings and layout.
