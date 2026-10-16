export type HostedVideo = {
  src: string;
  poster?: string;
  captions?: {src: string; language: string; label: string};
};

// Public delivery only. Upload credentials never belong in storefront code.
export const formalMediaBase = 'https://media.strikeout.us/formal/';
export const mediaLibrary: {
  launchVideo?: HostedVideo;
  carlosVideo?: HostedVideo;
  collectiveNote?: string[];
  amorePointImages: {src: string; alt: string}[];
} = {
  amorePointImages: [],
};
