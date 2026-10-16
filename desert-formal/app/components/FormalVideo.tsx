import {useEffect, useRef, useState} from 'react';
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

export function FormalVideo({video, title, onEnded, requireComplete = false, minimal = false, suspended = false}: {video: HostedVideo; title: string; onEnded?: () => void; requireComplete?: boolean; minimal?: boolean; suspended?: boolean}) {
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [muted, setMuted] = useState(true);
  const playerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!minimal) return;
    const player = playerRef.current;
    if (!player) return;
    function syncPlayback() {
      if (!player) return;
      if (suspended || document.hidden) player.pause();
      else void player.play().catch(() => { /* A tap on the film starts playback when autoplay is blocked. */ });
    }
    syncPlayback();
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      document.removeEventListener('visibilitychange', syncPlayback);
      player.pause();
    };
  }, [minimal, suspended, video.src, attempt]);

  function toggleSound() {
    const player = playerRef.current;
    if (!player) return;
    player.muted = !player.muted;
    setMuted(player.muted);
    void player.play().catch(() => { /* A media error is handled by onError. */ });
  }

  const film = <>
    {/* eslint-disable-next-line jsx-a11y/media-has-caption -- Captions are supplied per film; silent films may omit them. */}
    <video ref={playerRef} key={`${video.src}:${attempt}`} className="formal-video" controls={!minimal} autoPlay={minimal} muted={minimal ? muted : undefined} playsInline disablePictureInPicture={minimal} preload={minimal ? 'auto' : requireComplete ? 'metadata' : 'none'} poster={video.poster}
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
      Your browser cannot play this film. {!minimal ? <a href={video.src}>Open the video</a> : null}
    </video>
  </>;
  return <div className={`formal-video-wrap${minimal ? ' formal-video-minimal' : ''}`}>
    {minimal ? <button type="button" className="formal-video-surface" aria-label={`${title} — ${muted ? 'turn sound on' : 'turn sound off'}`} aria-pressed={!muted} onClick={toggleSound}>{film}</button> : film}
    {failed ? <p className="formal-video-error" role="status">the film couldn’t load. <button type="button" onClick={() => {setFailed(false); setAttempt(value => value + 1);}}>try again</button></p> : null}
  </div>;
}
