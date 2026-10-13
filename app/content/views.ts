export const galleryViews = ['view one', 'view all'] as const;
export const networkViews = ['desert', 'FORMAL'] as const;
export const galleryViewKeys = ['single', 'all'] as const;
export const networkViewKeys = ['desert', 'formal'] as const;
export const galleryViewLinks = ['/gallery?view=single', '/gallery?view=all'] as const;
export const networkViewLinks = ['/network?view=desert', '/network?view=formal'] as const;

// Keep shared links from earlier previews working as the view names evolve.
export function viewIndex(section: 'gallery' | 'network', value: string | null) {
  const aliases: Record<string, string> = section === 'gallery'
    ? {one: 'single', conveyor: 'single', scattered: 'all', multi: 'all', capsule: 'all'}
    : {journal: 'desert', live: 'desert', projects: 'formal', portfolio: 'formal', stuff: 'formal', explore: 'desert', all: 'desert', everything: 'desert'};
  const keys: readonly string[] = section === 'gallery' ? galleryViewKeys : networkViewKeys;
  return Math.max(0, keys.indexOf(aliases[value ?? ''] ?? value ?? keys[0]));
}
