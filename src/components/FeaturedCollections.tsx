import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CollectionItem, PhotoItem } from '../types/prism';
import { SmartImage } from './SmartImage';

interface FeaturedCollectionsProps {
  collections: CollectionItem[];
  photos: PhotoItem[];
  activeCollectionId: string | null;
  onSelectCollection: (collectionId: string) => void;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  collections,
  photos,
  activeCollectionId,
  onSelectCollection,
}) => {
  return (
    <section
      id="collections"
      aria-labelledby="collections-heading"
      className="prism-collections-gradient py-16 sm:py-20 border-t border-[#302B26]/10 dark:border-[#F3EBDD]/10"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#795C45] dark:text-[#C6B59D] mb-2">
              Editorial Monographs
            </p>
            <h2
              id="collections-heading"
              className="font-serif-editorial text-3xl sm:text-4xl lg:text-[2.75rem] font-medium text-[#302B26] dark:text-[#F3EBDD] [text-wrap:balance]"
            >
              Featured Collections
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#795C45] dark:text-[#C6B59D] max-w-md">
            Select a curated visual chapter below to filter the gallery by mood, palette, and story.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {collections.map((collection) => {
            const count = photos.filter((p) => p.collectionIds.includes(collection.id)).length;
            const isActive = activeCollectionId === collection.id;

            return (
              <button
                key={collection.id}
                type="button"
                onClick={() => onSelectCollection(collection.id)}
                aria-pressed={isActive}
                className={`group text-left rounded-2xl overflow-hidden border transition-all duration-300 bg-gradient-to-br ${collection.gradientClass} ${
                  isActive
                    ? 'border-[#302B26] dark:border-[#F3EBDD] ring-2 ring-[#795C45]/40 shadow-[0_18px_40px_rgba(48,43,38,0.16)]'
                    : 'border-[#302B26]/12 dark:border-[#F3EBDD]/12 shadow-[0_8px_24px_rgba(48,43,38,0.06)] hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(48,43,38,0.14)]'
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#795C45]`}
              >
                <div className="p-4 sm:p-5 flex flex-col h-full">
                  <div className="rounded-xl overflow-hidden mb-4 border border-[#302B26]/10 dark:border-[#F3EBDD]/10">
                    <SmartImage
                      src={collection.coverImage}
                      alt={collection.coverAlt}
                      title={collection.title}
                      aspectRatio="4:3"
                      className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 text-xs text-[#795C45] dark:text-[#C6B59D] mb-1.5">
                    <span>{collection.subtitle}</span>
                    <span className="tabular-nums font-medium">
                      {count} {count === 1 ? 'image' : 'images'}
                    </span>
                  </div>

                  <h3 className="font-serif-editorial text-2xl font-medium text-[#302B26] dark:text-[#F3EBDD] mb-2">
                    {collection.title}
                  </h3>

                  <p className="text-sm text-[#302B26]/80 dark:text-[#C6B59D] leading-relaxed mb-4 flex-1">
                    {collection.description}
                  </p>

                  <div className="pt-3 border-t border-[#302B26]/10 dark:border-[#F3EBDD]/10 flex items-center justify-between text-xs sm:text-sm font-medium text-[#302B26] dark:text-[#F3EBDD]">
                    <span>{isActive ? 'Viewing Collection' : 'Open Collection'}</span>
                    <ArrowRight
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
