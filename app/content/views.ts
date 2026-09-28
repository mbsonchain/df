export const galleryViews = ['single', 'multi', 'view all'] as const;
export const networkViews = ['live', 'portfolio', 'view all'] as const;
export const galleryViewKeys = ['single', 'multi', 'all'] as const;
export const networkViewKeys = ['live', 'portfolio', 'all'] as const;

// Keep shared links from earlier previews working as the view names evolve.
export function viewIndex(section: 'gallery' | 'network', value: string | null) {
  const aliases: Record<string, string> = section === 'gallery'
    ? {conveyor: 'single', scattered: 'multi'}
    : {journal: 'live', projects: 'portfolio'};
  const keys: readonly string[] = section === 'gallery' ? galleryViewKeys : networkViewKeys;
  return Math.max(0, keys.indexOf(aliases[value ?? ''] ?? value ?? keys[0]));
}
