export const galleryViews = ['single', 'multi', 'capsule'] as const;
export const networkViews = ['live', 'projects', 'all'] as const;
export const galleryViewKeys = ['single', 'multi', 'capsule'] as const;
export const networkViewKeys = ['live', 'projects', 'all'] as const;

// Keep shared links from earlier previews working as the view names evolve.
export function viewIndex(section: 'gallery' | 'network', value: string | null) {
  const aliases: Record<string, string> = section === 'gallery'
    ? {conveyor: 'single', scattered: 'multi', all: 'capsule'}
    : {journal: 'live', portfolio: 'projects'};
  const keys: readonly string[] = section === 'gallery' ? galleryViewKeys : networkViewKeys;
  return Math.max(0, keys.indexOf(aliases[value ?? ''] ?? value ?? keys[0]));
}
