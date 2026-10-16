import {useState} from 'react';
import type {HostedVideo} from '~/content/media';

export function FormalVideo({video, title, onEnded}: {video: HostedVideo; title: string; onEnded?: () => void}) {
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  return <div className="formal-video-wrap">
    {/* eslint-disable-next-line jsx-a11y/media-has-caption -- Captions are supplied per film; silent films may omit them. */}
    <video key={`${video.src}:${attempt}`} className="formal-video" controls playsInline preload="none" poster={video.poster}
      crossOrigin={video.captions ? 'anonymous' : undefined} aria-label={title} onEnded={onEnded} onError={() => setFailed(true)}>
      <source src={video.src} type="video/mp4"/>
      {video.captions ? <track kind="captions" src={video.captions.src} srcLang={video.captions.language} label={video.captions.label}/> : null}
      Your browser cannot play this film. <a href={video.src}>Open the video</a>.
    </video>
    {failed ? <p className="formal-video-error" role="status">the film couldn’t load. <button type="button" onClick={() => {setFailed(false); setAttempt(value => value + 1);}}>try again</button></p> : null}
  </div>;
}
