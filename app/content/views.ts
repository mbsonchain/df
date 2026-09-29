export const galleryViews = ['single', 'all', 'conamore'] as const;
export const networkViews = ['desert', 'portfolio', 'all'] as const;
export const galleryViewKeys = ['single', 'all'] as const;
export const networkViewKeys = ['desert', 'portfolio', 'all'] as const;
export const galleryViewLinks = ['/gallery?view=single', '/gallery?view=all', '/conamore'] as const;
export const networkViewLinks = networkViewKeys.map(view => `/network?view=${view}`);

// Keep shared links from earlier previews working as the view names evolve.
export function viewIndex(section: 'gallery' | 'network', value: string | null) {
  const aliases: Record<string, string> = section === 'gallery'
    ? {conveyor: 'single', scattered: 'all', multi: 'all', capsule: 'all'}
    : {journal: 'desert', live: 'desert', projects: 'portfolio'};
  const keys: readonly string[] = section === 'gallery' ? galleryViewKeys : networkViewKeys;
  return Math.max(0, keys.indexOf(aliases[value ?? ''] ?? value ?? keys[0]));
}
