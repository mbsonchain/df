export type Offering = {
  id: string;
  kind: 'text' | 'video' | 'website' | 'collage';
  location: string;
  detail: string;
  title: string;
  description: string;
  href?: string;
  cover?: string;
};

export const desertOfferings: readonly Offering[] = [
  {id: 'note', kind: 'text', location: 'the collective', detail: 'a note', title: 'a note from the collective', description: 'words from the collective.'},
  {id: 'ghost-town', kind: 'video', location: 'strikeout', detail: 'film ↗', title: 'ghost town', description: 'a film by matteo salvadei. watch through strikeout.', href: 'https://www.strikeout.us/#video', cover: 'https://www.strikeout.us/assets/ghost-town-poster.jpg'},
  {id: 'conamore-launch', kind: 'video', location: 'conamore', detail: 'launch film', title: 'conamore launch video', description: 'an introduction to conamore.'},
  {id: 'conamore', kind: 'website', location: 'conamore', detail: 'visit ↗', title: 'conamore', description: 'the project, the myth, and all it contains.', href: 'https://www.visitconamore.com/'},
  {id: 'carlos', kind: 'video', location: 'desert', detail: 'an introduction', title: 'carlos / introducing desert FORMAL', description: 'watch the introduction, then enter the archive.', href: '/network?view=desert'},
  {id: 'amore-point', kind: 'collage', location: 'amore point', detail: 'a collage', title: 'amore point', description: 'a collage of pictures and collected things.'},
];
