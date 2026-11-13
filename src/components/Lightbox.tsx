import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Heart, Shuffle, X } from 'lucide-react';
import { PhotoItem } from '../types/prism';

interface LightboxProps {
  photo: PhotoItem | null;
  currentIndex: number;
  totalCount: number;
  isFavourite: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleFavourite: (id: string) => void;
  onSurpriseNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photo,
  currentIndex,
  totalCount,
  isFavourite,
  onClose,
  onPrev,
  onNext,
  onToggleFavourite,
  onSurpriseNext,
}) => {
  useEffect(() => {
    if (!photo) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [photo, onClose, onPrev, onNext]);

  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Lightbox viewer for ${photo.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1714]/92 backdrop-blur-md p-3 sm:p-6 lg:p-10"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl max-h-[92vh] bg-[#F8F4EC] dark:bg-[#2B2722] text-[#302B26] dark:text-[#F3EBDD] rounded-2xl overflow-hidden shadow-2xl border border-[#F3EBDD]/15 flex flex-col lg:grid lg:grid-cols-12"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute top-3 right-3 z-20 w-11 h-11 rounded-full bg-[#302B26]/80 text-[#F3EBDD] hover:bg-[#302B26] dark:bg-[#F3EBDD]/15 dark:hover:bg-[#F3EBDD]/25 inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F3EBDD]"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Image Display Area */}
        <div className="lg:col-span-8 relative bg-[#1E1B18] flex items-center justify-center min-h-[280px] max-h-[55vh] lg:max-h-[88vh] p-4 sm:p-6">
          <img
            src={photo.imageUrl}
            alt={photo.alt}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[48vh] lg:max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-lg"
          />

          {/* Previous / Next Overlay Controls */}
          {totalCount > 1 && (
            <>
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous photograph"
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#F8F4EC]/85 dark:bg-[#332F29]/90 text-[#302B26] dark:text-[#F3EBDD] hover:bg-[#F8F4EC] dark:hover:bg-[#40382F] shadow-md inline-flex items-center justify-center transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B98268]"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onNext}
                aria-label="Next photograph"
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#F8F4EC]/85 dark:bg-[#332F29]/90 text-[#302B26] dark:text-[#F3EBDD] hover:bg-[#F8F4EC] dark:hover:bg-[#40382F] shadow-md inline-flex items-center justify-center transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B98268]"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        {/* Metadata & Editorial Sidebar */}
        <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[37vh] lg:max-h-[88vh] bg-gradient-to-b from-[#F8F4EC] to-[#EFE6D5] dark:from-[#332F29] dark:to-[#272420]">
          <div className="space-y-5 pr-6 lg:pr-0">
            <div className="flex items-center justify-between gap-2 text-xs text-[#795C45] dark:text-[#C6B59D]">
              <span>{photo.category} · {photo.location}</span>
              <span className="tabular-nums">
                {currentIndex + 1} / {totalCount}
              </span>
            </div>

            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-medium leading-tight text-[#302B26] dark:text-[#F3EBDD] [text-wrap:balance]">
              {photo.title}
            </h2>

            <p className="text-sm leading-relaxed text-[#302B26]/85 dark:text-[#C6B59D]">
              {photo.description}
            </p>

            {/* Unboxed Metadata Details */}
            <div className="pt-4 border-t border-[#302B26]/12 dark:border-[#F3EBDD]/12 space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#795C45] dark:text-[#C6B59D]">Photographer</span>
                <span className="font-medium text-[#302B26] dark:text-[#F3EBDD]">{photo.photographer}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#795C45] dark:text-[#C6B59D]">Technical Note</span>
                <span className="tabular-nums text-[#302B26] dark:text-[#F3EBDD]">{photo.exif}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-[#795C45] dark:text-[#C6B59D] shrink-0">Subjects</span>
                <span className="text-right text-[#302B26]/85 dark:text-[#C6B59D]">
                  {photo.tags.join(' · ')}
                </span>
              </div>
            </div>
          </div>

          {/* Actions Footer */}
          <div className="mt-6 pt-5 border-t border-[#302B26]/12 dark:border-[#F3EBDD]/12 space-y-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onToggleFavourite(photo.id)}
                aria-pressed={isFavourite}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  isFavourite
                    ? 'bg-[#B98268] text-[#F8F4EC] dark:bg-[#C18B70] dark:text-[#25231F]'
                    : 'bg-[#302B26] text-[#F3EBDD] dark:bg-[#F3EBDD] dark:text-[#25231F] hover:bg-[#795C45] dark:hover:bg-[#D9C8AC]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavourite ? 'fill-current' : ''}`} aria-hidden="true" />
                <span>{isFavourite ? 'Saved to Favourites' : 'Save Favourite'}</span>
              </button>

              <button
                type="button"
                onClick={onSurpriseNext}
                aria-label="Surprise me with another random photograph"
                title="Surprise Me"
                className="w-11 h-11 rounded-full border border-[#302B26]/20 dark:border-[#F3EBDD]/20 bg-[#F8F4EC] dark:bg-[#40382F] text-[#302B26] dark:text-[#F3EBDD] hover:bg-[#E8DDC9] dark:hover:bg-[#4A4137] inline-flex items-center justify-center transition-colors shrink-0"
              >
                <Shuffle className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <a
              href={photo.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[40px] rounded-full border border-[#302B26]/15 dark:border-[#F3EBDD]/15 text-xs sm:text-sm text-[#795C45] dark:text-[#C6B59D] hover:text-[#302B26] dark:hover:text-[#F3EBDD] hover:bg-[#E8DDC9]/50 dark:hover:bg-[#40382F] transition-colors"
            >
              <span>Source Archive · {photo.sourceLabel}</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
