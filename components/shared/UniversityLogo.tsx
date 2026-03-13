'use client';

import { useState } from 'react';
import { BookMarked } from 'lucide-react';

interface UniversityLogoProps {
  name: string;
  logoUrl?: string | null;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export function UniversityLogo({
  name,
  logoUrl,
  className = '',
  iconClassName = 'h-6 w-6 text-primary',
  textClassName = 'text-2xl font-bold text-primary',
}: UniversityLogoProps) {
  const normalizedLogoUrl = logoUrl?.trim();
  const [hasImageError, setHasImageError] = useState(false);
  const shouldRenderImage = Boolean(normalizedLogoUrl) && !hasImageError;

  if (shouldRenderImage) {
    return (
      <div
        className={`flex items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-background ${className}`}
      >
        <img
          src={normalizedLogoUrl}
          alt={`${name} logo`}
          className="h-full w-full object-cover"
          onError={() => setHasImageError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-lg bg-primary/10 ${className}`}
    >
      {name.trim() ? (
        <span className={textClassName}>{name.trim().charAt(0)}</span>
      ) : (
        <BookMarked className={iconClassName} />
      )}
    </div>
  );
}
