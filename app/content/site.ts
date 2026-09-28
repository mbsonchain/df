// Shared presentation settings. Replace formal-flower.png in Shopify Content → Files
// to change the flower without changing any page layouts.
export const identity = {
  flower: 'https://cdn.shopify.com/s/files/1/0690/9103/3319/files/formal-flower.png?width=320',
};
export const locations = [
  {id:'kilauea', name:'Kilauea', zone:'Pacific/Honolulu', brand:'Island Formal', latitude:22.211, longitude:-159.412},
  {id:'conamore', name:'Conamore', zone:'America/Los_Angeles', brand:'Desert Formal', latitude:34.052, longitude:-118.244},
  {id:'cdmx', name:'CDMX', zone:'America/Mexico_City', brand:'Desert Formal', latitude:19.433, longitude:-99.133},
  {id:'london', name:'London', zone:'Europe/London', brand:'Spazio Libero', latitude:51.507, longitude:-.128},
  {id:'milano', name:'Milano', zone:'Europe/Rome', brand:'Spazio Libero', latitude:45.464, longitude:9.19},
  {id:'copenhagen', name:'Copenhagen', zone:'Europe/Copenhagen', brand:'Spazio Libero', latitude:55.676, longitude:12.568},
] as const;
export const projects = [
  {slug:'strikeout', title:'Strikeout', category:'Studio / ongoing', image:'https://cdn.shopify.com/s/files/1/0690/9103/3319/files/network-strikeout.png?width=700', note:'A space for images, ideas, and things in motion.'},
  {slug:'dopo', title:'Dopo', category:'Project / ongoing', image:'https://cdn.shopify.com/s/files/1/0690/9103/3319/files/network-dopo.png?width=700', note:'Something to return to. A project taking shape.'},
  {slug:'new-hollywood', title:'New Hollywood', category:'Image / archive', image:'https://cdn.shopify.com/s/files/1/0690/9103/3319/files/network-new-hollywood.png?width=700', note:'A collection of references, people, and places.'},
] as const;
