import React from 'react';

export function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-40 h-40"
      >
        <source src="/loader.webm" type="video/webm" />
      </video>
    </div>
  );
}
