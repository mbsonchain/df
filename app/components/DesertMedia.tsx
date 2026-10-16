import type {Offering} from '~/content/desert';
import {identity} from '~/content/site';
import {mediaLibrary} from '~/content/media';
import {FormalVideo} from './FormalVideo';

export function DesertMedia({item, detail = false}: {item: Offering; detail?: boolean}) {
  const video = item.id === 'conamore-launch' ? mediaLibrary.launchVideo : undefined;
  if (detail && video) return <FormalVideo video={video} title={item.title}/>;
  const cover = item.cover || video?.poster;
  if (cover) return <div className="desert-frame formal-cover"><img src={cover} alt={item.title} loading="lazy" width="640" height="360"/>{item.kind === 'video' ? <span className="formal-cover-play" aria-hidden="true">▷</span> : null}</div>;
  if (item.kind === 'text') return <div className="desert-frame formal-note-cover" aria-hidden="true"><div><span>dear collective,</span><i/><i/><i/><span>with love, FORMAL</span></div></div>;
  if (item.kind === 'collage') return <div className="desert-frame formal-collage" aria-label="Amore Point collage layout placeholder" role="img">
    {[0,1,2].map(index => <span key={index} className={`collage-piece collage-piece-${index}`}>{mediaLibrary.amorePointImages[index] ? <img src={mediaLibrary.amorePointImages[index].src} alt={mediaLibrary.amorePointImages[index].alt} loading="lazy"/> : null}</span>)}
    <span className="collage-caption">amore point</span>
  </div>;
  if (item.kind === 'website') return <div className="desert-frame formal-conamore-cover" aria-hidden="true"><span>visit</span><strong>conamore</strong><span>the project / the myth</span></div>;
  return <div className={`desert-frame formal-film-cover ${item.id === 'carlos' ? 'formal-carlos-cover' : ''}`} role="img" aria-label={`${item.title} — video placeholder`}>
    {item.id === 'carlos' ? <img src={identity.flowerTransparent} alt="" width="55" height="59"/> : <span aria-hidden="true">▷</span>}
    <span>{item.id === 'carlos' ? 'desert FORMAL' : 'conamore'}</span>
  </div>;
}
