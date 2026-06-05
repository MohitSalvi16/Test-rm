import { useRef, useState } from 'react';

/**
 * Fullscreen intro video shown once per session before the app loads.
 * Calls `onDone` when the clip ends, the user skips, or it fails to load.
 *
 * Autoplay starts muted (browsers block unmuted autoplay); an Unmute button
 * lets the user turn sound on.
 */
export function IntroVideo({ onDone }: { onDone: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <video
        ref={videoRef}
        src="/into-video.mp4"
        autoPlay
        muted
        playsInline
        onEnded={onDone}
        onError={onDone}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <button
        onClick={toggleMute}
        className="absolute bottom-6 left-6 px-4 py-2 rounded-lg bg-white/15 text-white text-sm backdrop-blur hover:bg-white/25 transition"
      >
        {muted ? 'Unmute' : 'Mute'}
      </button>

      <button
        onClick={onDone}
        className="absolute bottom-6 right-6 px-4 py-2 rounded-lg bg-white/15 text-white text-sm backdrop-blur hover:bg-white/25 transition"
      >
        Skip ›
      </button>
    </div>
  );
}
