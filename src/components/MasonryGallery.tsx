import React from 'react';
import { ArrowUpRight, Heart, RotateCcw } from 'lucide-react';
import { GalleryViewMode, PhotoItem } from '../types/prism';
import { SmartImage } from './SmartImage';

interface MasonryGalleryProps {
  photos: PhotoItem[];
  totalFilteredCount: number;
  hasMore: boolean;
  onLoadMore: () => void;
  favourites: string[];
  onToggleFavourite: (id: string) => void;
  onSelectPhoto: (photo: PhotoItem) => void;
  viewMode: GalleryViewMode;
  onResetFilters: () => void;
  onSwitchToAll: () => void;
}

export const MasonryGallery: React.FC<MasonryGalleryProps> = ({
  photos,
  totalFilteredCount,
  hasMore,
  onLoadMore,
  favourites,
  onToggleFavourite,
  onSelectPhoto,
  viewMode,
  onResetFilters,
  onSwitchToAll,
}) => {
  const remainingCount = Math.max(0, totalFilteredCount - photos.length);

  return (
    <section
      aria-label="Photography Masonry Gallery"
      className="prism-gallery-gradient py-12 sm:py-16 min-h-[420px]"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Favourites Empty State */}
        {viewMode === 'favourites' && photos.length === 0 ? (
          <div className="max-w-lg mx-auto my-12 py-14 px-8 rounded-2xl bg-[#F8F4EC]/90 dark:bg-[#332F29]/90 border border-[#302B26]/10 dark:border-[#F3EBDD]/10 text-center shadow-sm">
            <Heart
              className="w-8 h-8 mx-auto mb-4 text-[#B98268] dark:text-[#C18B70] stroke-[1.5]"
              aria-hidden="true"
            />
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-medium text-[#302B26] dark:text-[#F3EBDD] mb-3 [text-wrap:balance]">
              Your collection is waiting to be discovered.
            </h2>
            <p className="text-sm text-[#795C45] dark:text-[#C6B59D] mb-6 leading-relaxed">
              Tap the heart icon on any photograph to save visual inspiration to your personal archive.
            </p>
            <button
              type="button"
              onClick={onSwitchToAll}
              className="px-6 py-3 min-h-[44px] rounded-full bg-[#302B26] text-[#F3EBDD] dark:bg-[#F3EBDD] dark:text-[#25231F] text-sm font-medium hover:bg-[#795C45] dark:hover:bg-[#D9C8AC] transition-colors"
            >
              Browse All Perspectives
            </button>
          </div>
        ) : photos.length === 0 ? (
          /* No Search / Filter Results State */
          <div className="max-w-lg mx-auto my-12 py-14 px-8 rounded-2xl bg-[#F8F4EC]/90 dark:bg-[#332F29]/90 border border-[#302B26]/10 dark:border-[#F3EBDD]/10 text-center shadow-sm">
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-medium text-[#302B26] dark:text-[#F3EBDD] mb-3">
              No matching photographs found.
            </h2>
            <p className="text-sm text-[#795C45] dark:text-[#C6B59D] mb-6 leading-relaxed">
              Try a broader keyword, explore another category, or reset your active filters to return to the full gallery.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-full bg-[#302B26] text-[#F3EBDD] dark:bg-[#F3EBDD] dark:text-[#25231F] text-sm font-medium hover:bg-[#795C45] dark:hover:bg-[#D9C8AC] transition-colors"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Clear Search & Filters</span>
            </button>
          </div>
        ) : (
          <>
            {/* Pinterest-Style Responsive Masonry Columns */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
              {photos.map((photo, index) => {
                const isFav = favourites.includes(photo.id);
                return (
                  <article
                    key={photo.id}
                    style={{ animationDelay: `${Math.min(index, 11) * 35}ms` }}
                    className="prism-card-enter break-inside-avoid mb-6 group relative rounded-xl overflow-hidden bg-[#F8F4EC] dark:bg-[#40382F] border border-[#302B26]/10 dark:border-[#F3EBDD]/10 shadow-[0_8px_24px_rgba(48,43,38,0.07)] hover:shadow-[0_18px_42px_rgba(48,43,38,0.16)] dark:shadow-[0_10px_28px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_20px_46px_rgba(0,0,0,0.55)] transition-shadow duration-300"
                  >
                    {/* Clickable Image Surface */}
                    <div
                      data-cursor="image"
                      onClick={() => onSelectPhoto(photo)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelectPhoto(photo);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`View ${photo.title} in full-screen lightbox`}
                      className="relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#B98268]"
                    >
                      <SmartImage
                        src={photo.imageUrl}
                        alt={photo.alt}
                        title={photo.title}
                        aspectRatio={photo.aspectRatio}
                        className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
                      />

                      {/* Measured Contrast Scrim & Editorial Overlay */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1F1B17]/85 via-[#1F1B17]/20 to-transparent opacity-85 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5">
                        <div className="flex items-end justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-xs text-[#E8DDC9]/90 tracking-wide mb-0.5 truncate">
                              {photo.category} · {photo.location}
                            </p>
                            <h3 className="font-serif-editorial text-xl font-medium leading-tight text-[#F8F4EC] truncate">
                              {photo.title}
                            </h3>
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-[#F3EBDD]/90 whitespace-nowrap shrink-0 pb-0.5">
                            <span>View Image</span>
                            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Floating Favourite Heart Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavourite(photo.id);
                      }}
                      aria-label={isFav ? `Remove ${photo.title} from favourites` : `Save ${photo.title} to favourites`}
                      aria-pressed={isFav}
                      className={`absolute top-3 right-3 z-10 w-10 h-10 rounded-full inline-flex items-center justify-center backdrop-blur-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F4EC] ${
                        isFav
                          ? 'bg-[#B98268] text-[#F8F4EC] shadow-md scale-100 opacity-100'
                          : 'bg-[#F8F4EC]/85 dark:bg-[#25231F]/80 text-[#302B26] dark:text-[#F3EBDD] sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100 hover:bg-[#F8F4EC] dark:hover:bg-[#332F29]'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isFav ? 'fill-current scale-110' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {/* Clean Unboxed Footer Metadata Row */}
                    <div className="px-4 py-3 flex items-center justify-between gap-2 bg-[#F8F4EC] dark:bg-[#40382F] border-t border-[#302B26]/8 dark:border-[#F3EBDD]/8">
                      <div className="min-w-0">
                        <h3 className="font-serif-editorial text-base font-medium text-[#302B26] dark:text-[#F3EBDD] truncate">
                          {photo.title}
                        </h3>
                        <p className="text-xs text-[#795C45] dark:text-[#C6B59D] truncate">
                          {photo.category} · {photo.photographer}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onSelectPhoto(photo)}
                        className="text-xs font-medium text-[#795C45] dark:text-[#C6B59D] hover:text-[#302B26] dark:hover:text-[#F3EBDD] whitespace-nowrap shrink-0 underline underline-offset-4"
                      >
                        Inspect
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Load More Pagination Control */}
            {hasMore && (
              <div className="mt-12 flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={onLoadMore}
                  className="px-8 py-3.5 min-h-[44px] rounded-full bg-[#302B26] text-[#F3EBDD] dark:bg-[#F3EBDD] dark:text-[#25231F] text-sm font-medium tracking-wide hover:bg-[#795C45] dark:hover:bg-[#D9C8AC] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#795C45]"
                >
                  Load More Photographs ({remainingCount} remaining)
                </button>
                <p className="text-xs text-[#795C45] dark:text-[#C6B59D] tabular-nums">
                  Showing {photos.length} of {totalFilteredCount} curated works
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
