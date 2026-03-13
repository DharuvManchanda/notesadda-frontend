'use client';

import { useEffect, useRef, useState } from 'react';

export function PageLoader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        setTimeout(() => {
          setReloadKey((current) => current + 1);
        }, 150);
      }
    };

    playVideo();
  }, [reloadKey]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 w-full">
      <video
        key={reloadKey}
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        controlsList="nodownload noplaybackrate noremoteplayback"
        className="h-28 w-28 object-contain sm:h-36 sm:w-36 md:h-40 md:w-40"
      >
        <source src="/loader.webm" type="video/webm" />
      </video>
    </div>
  );
}
