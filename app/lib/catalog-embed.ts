export const catalogEmbedPath = '/embed/network';

export function isCatalogEmbedPath(pathname: string) {
  return pathname.replace(/\/$/, '') === catalogEmbedPath;
}
