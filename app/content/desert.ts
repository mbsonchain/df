// Layout placeholders approved for the first desert feed release.
export const desertOfferings = [
  {id: 'film', kind: 'video', location: 'location', detail: '03:24', title: 'video title', description: 'A short description of the film. One or two sentences, then the next offering.'},
  {id: 'another-film', kind: 'video', location: 'location', detail: '01:48', title: 'another film', description: 'The same horizontal frame, with a few words beneath it.'},
  {id: 'article', kind: 'article', location: 'location', detail: '4 min read', title: 'article title', description: 'An essay, a conversation, or a longer story — introduced in the same rhythm.'},
  {id: 'image', kind: 'image', location: 'location', detail: 'image study', title: 'a visual study', description: 'One image or a series of images. A small caption gives it context.'},
  {id: 'sound', kind: 'sound', location: 'location', detail: '06:12', title: 'sound title', description: 'A recording, a broadcast, or a sound piece can occupy the same space.'},
  {id: 'note', kind: 'text', location: 'location', detail: 'field note', title: 'a note from the collective', description: 'A shorter thought, an announcement, or something that needs only words.'},
] as const;
