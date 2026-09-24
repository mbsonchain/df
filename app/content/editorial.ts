// Sample content stays separate from layout. Replace with Shopify content later.
export const posts = [
  {id: 'open-country', number: '01', kind: 'Field notes', title: 'An open invitation.', subtitle: 'A place for the things we are making, seeing, and collecting.', body: 'This is a sample journal entry. A little space to follow a thought, share a photograph, or let something unfinished take shape.', scene: 'sand', art: 'landscape', note: 'Somewhere along the way', detail: 'Related photographs, notes, and references will live here. Each entry can bring its own surroundings into view.'},
  {id: 'in-the-studio', number: '02', kind: 'In progress', title: 'Nothing quite finished.', subtitle: 'From the table. From the notebook. From one thing to the next.', body: 'A sample studio update. Materials, shapes, and small discoveries can sit together in a post without all needing to be the same kind of story.', scene: 'olive', art: 'flower', note: 'Studies / shapes / fragments', detail: 'This companion window belongs to the studio entry. It could hold a detail image, a sketch, or a longer note.'},
  {id: 'moving-image', number: '03', kind: 'Moving image', title: 'Stay a little longer.', subtitle: 'A moment, held in motion.', body: 'A sample film entry. The journal makes room for moving images alongside photographs and writing. Your video will take this place.', scene: 'blue', art: 'horizon', note: 'A frame from the road', detail: 'A film still, production note, or related reference can extend this story beyond the central page.'},
] as const;
export const products = [
  {slug: 'study-shirt', name: 'Study shirt', category: 'Clothing', art: 'shirt', color: 'chalk'},
  {slug: 'everyday-cap', name: 'Everyday cap', category: 'Objects to wear', art: 'cap', color: 'olive'},
  {slug: 'field-tote', name: 'Field tote', category: 'Objects to carry', art: 'tote', color: 'ochre'},
  {slug: 'studio-shirt', name: 'Studio shirt', category: 'Clothing', art: 'shirt', color: 'rust'},
  {slug: 'collected-pages', name: 'Collected pages', category: 'Printed matter', art: 'book', color: 'blue'},
  {slug: 'small-vessel', name: 'Small vessel', category: 'Objects', art: 'vase', color: 'chalk'},
] as const;
