import {useSearchParams} from 'react-router';
import {DesertFeed} from '~/components/DesertFeed';
import {DesertArchive} from '~/components/DesertArchive';
import {ViewToggle} from '~/components/ViewToggle';
import {networkViews, viewIndex} from '~/content/views';
import {catalogEmbedPath} from '~/lib/catalog-embed';
import embedStyles from '~/styles/catalog-embed.css?url';

export function meta() { return [{title: 'Desert / FORMAL — Catalog'}]; }
export function links() { return [{rel: 'stylesheet', href: embedStyles}]; }
export function headers() { return {'Cache-Control': 'no-cache'}; }

export default function CatalogEmbed() {
  const [params] = useSearchParams();
  const view = viewIndex('network', params.get('view'));
  return <div className={`site-shell catalog-embed ${view === 0 ? 'catalog-embed-desert' : ''}`}>
    <main id="main" tabIndex={-1}>
      {view === 0
        ? <section className="network-page" aria-label="desert"><DesertArchive /></section>
        : <section className="network-page"><DesertFeed openInNewTab /></section>}
    </main>
    <footer className="site-footer">
      <ViewToggle section="network" labels={networkViews} links={[`${catalogEmbedPath}?view=desert`, `${catalogEmbedPath}?view=formal`]} active={view} />
    </footer>
  </div>;
}
