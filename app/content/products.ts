export const products = [
  {slug: 'formal-jacket', name: 'FORMAL JACKET', art: 'hooded-work-jacket'},
  {slug: 'flower-jacket', name: 'FLOWER JACKET', art: 'eisenhower-jacket'},
  {slug: 'freetown-hoodie', name: 'FREETOWN HOODIE', art: 'hoodie'},
  {slug: 'soldout-hoodie', name: 'SOLDOUT HOODIE', art: 'hoodie'},
  {slug: 'camporella-hoodie', name: 'CAMPORELLA HOODIE', art: 'hoodie'},
  {slug: 'conamore-hoodie', name: 'CONAMORE HOODIE', art: 'hoodie'},
  {slug: 'schifo-hoodie', name: 'SCHIFO HOODIE', art: 'hoodie'},
  {slug: 'formal-oxford', name: 'FORMAL OXFORD', art: 'oxford'},
  {slug: 'sfiga-tee', name: 'SFIGA TEE', art: 'tee'},
  {slug: 'flower-tee', name: 'FLOWER TEE', art: 'tee'},
  {slug: 'selvedge-denim', name: 'SELVEDGE DENIM', art: 'pants'},
  {slug: 'capri-pants', name: 'CAPRI PANTS', art: 'pants'},
  {slug: 'flower-sweats', name: 'FLOWER SWEATS', art: 'pants'},
  {slug: 'formalbag', name: 'FORMALBAG', art: 'duffel'},
  {slug: 'flowerbag', name: 'FLOWERBAG', art: 'shoulder-bag'},
  {slug: 'passport-wallet', name: 'PASSPORT WALLET', art: 'passport-wallet'},
  {slug: 'flower-wallet', name: 'FLOWER WALLET', art: 'cardholder'},
  {slug: 'formal-hat', name: 'FORMAL HAT', art: 'ushanka'},
  {slug: 'headscarf', name: 'HEADSCARF', art: 'headscarf'},
  {slug: 'formal-belt', name: 'FORMAL BELT', art: 'belt'},
] as const;

export type Product = (typeof products)[number];
