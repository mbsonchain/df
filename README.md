# Desert Formal

Custom Shopify Hydrogen storefront hosted on Shopify Oxygen. This initial setup intentionally renders an empty page; visual design and commerce pages will be built separately.

## Development

Use Node.js and run `npm ci`. Link this project with `shopify hydrogen link`, then pull the appropriate environment with `shopify hydrogen env pull`. Keep `.env` and `.shopify/` private.

Run `npm run dev` for development, `npm run typecheck` for TypeScript checks, and `npm run build` for a production build. Deploy with `shopify hydrogen deploy` after choosing the intended environment.

## Content and deployment

Keep editable wording, blog posts, products, and archive records in Shopify or an agreed content store rather than embedding them in layout code. The first setup contains no product or editorial content.

GitHub stores the source code. Deployments currently run through Shopify CLI; automatic GitHub deployment is not configured. The custom domain has not been switched. The page requests that search engines do not index it during setup.
