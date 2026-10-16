import {useState} from 'react';
import type {HostedVideo} from '~/content/media';

// Only continuous playback from the beginning counts toward the entrance film.
function watchedThrough(ranges: TimeRanges) {
  let end = 0;
  for (let index = 0; index < ranges.length; index++) {
    if (ranges.start(index) > end + 0.5) break;
    end = ranges.end(index);
  }
  return end;
}

export function FormalVideo({video, title, onEnded, requireComplete = false}: {video: HostedVideo; title: string; onEnded?: () => void; requireComplete?: boolean}) {
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  return <div className="formal-video-wrap">
    {/* eslint-disable-next-line jsx-a11y/media-has-caption -- Captions are supplied per film; silent films may omit them. */}
    <video key={`${video.src}:${attempt}`} className="formal-video" controls playsInline preload={requireComplete ? 'metadata' : 'none'} poster={video.poster}
      crossOrigin={video.captions ? 'anonymous' : undefined} aria-label={title}
      onSeeking={event => {
        if (!requireComplete) return;
        const player = event.currentTarget;
        const watched = watchedThrough(player.played);
        if (player.currentTime > watched + 0.5) player.currentTime = watched;
      }}
      onEnded={event => {
        const player = event.currentTarget;
        if (!requireComplete || (Number.isFinite(player.duration) && watchedThrough(player.played) >= player.duration - 0.75)) onEnded?.();
      }}
      onError={() => setFailed(true)}>
      <source src={video.src} type="video/mp4"/>
      {video.captions ? <track kind="captions" src={video.captions.src} srcLang={video.captions.language} label={video.captions.label}/> : null}
      Your browser cannot play this film. <a href={video.src}>Open the video</a>.
    </video>
    {failed ? <p className="formal-video-error" role="status">the film couldn’t load. <button type="button" onClick={() => {setFailed(false); setAttempt(value => value + 1);}}>try again</button></p> : null}
  </div>;
}
