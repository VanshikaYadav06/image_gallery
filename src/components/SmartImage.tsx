import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface SmartImageProps {
  src: string;
  alt: string;
  title?: string;
  aspectRatio?: '3:4' | '4:3' | '2:3' | '3:2' | '1:1' | '16:9';
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

const ASPECT_CLASSES: Record<NonNullable<SmartImageProps['aspectRatio']>, string> = {
  '3:4': 'aspect-[3/4]',
  '4:3': 'aspect-[4/3]',
  '2:3': 'aspect-[2/3]',
  '3:2': 'aspect-[3/2]',
  '1:1': 'aspect-square',
  '16:9': 'aspect-video',
};

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  title,
  aspectRatio,
  className = '',
  loading = 'lazy',
  priority = false,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const ratioClass = aspectRatio ? ASPECT_CLASSES[aspectRatio] : '';

  if (failed) {
    return (
      <div
        className={`w-full ${ratioClass || 'min-h-[240px]'} flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#E8DDC9] via-[#D9C8AC] to-[#B6A58E]/50 dark:from-[#40382F] dark:via-[#332F29] dark:to-[#25231F] text-[#795C45] dark:text-[#C6B59D]`}
        role="img"
        aria-label={alt}
      >
        <ImageOff className="w-6 h-6 mb-2 opacity-70" aria-hidden="true" />
        <p className="font-serif-editorial text-lg font-medium text-[#302B26] dark:text-[#F3EBDD]">
          {title || 'Archival Plate'}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden bg-[#E8DDC9]/70 dark:bg-[#332F29] ${ratioClass}`}>
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : loading}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    </div>
  );
};
