import {homeOnly} from './launch';

export function isPublicSite(request: Request) {
  const {hostname} = new URL(request.url);
  return !homeOnly && import.meta.env.VITE_FORMAL_PREVIEW !== 'true'
    && (hostname === 'desertformal.com' || hostname === 'www.desertformal.com');
}
