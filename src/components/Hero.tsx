import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { HERO_IMAGES } from '../data/photos';
import { SmartImage } from './SmartImage';

interface HeroProps {
  totalPhotos: number;
  totalCollections: number;
  onExploreGallery: () => void;
  onDiscoverCollections: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  totalPhotos,
  totalCollections,
  onExploreGallery,
  onDiscoverCollections,
}) => {
  return (
    <section
      id="home"
      className="prism-hero-gradient relative overflow-hidden border-b border-[#302B26]/10 dark:border-[#F3EBDD]/10"
    >
      {/* Subtle geometric prism framing lines */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 w-[480px] h-[480px] text-[#795C45]/[0.07] dark:text-[#C6B59D]/[0.06]"
        viewBox="0 0 400 400"
        fill="none"
      >
        <polygon points="200,20 380,340 20,340" stroke="currentColor" strokeWidth="1" />
        <line x1="200" y1="20" x2="200" y2="340" stroke="currentColor" strokeWidth="0.75" />
        <line x1="200" y1="180" x2="310" y2="340" stroke="currentColor" strokeWidth="0.75" />
      </svg>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-12 pb-10 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Typography & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center py-2 lg:py-6">
            <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[#795C45] dark:text-[#C6B59D] mb-4">
              Visual Discovery Journal · Curated Archive
            </p>

            <h1 className="font-serif-editorial text-4xl sm:text-5xl lg:text-[3.75rem] font-medium leading-[1.08] tracking-[-0.015em] text-[#302B26] dark:text-[#F3EBDD] [text-wrap:balance] max-w-xl mb-6">
              Discover Beauty in Every Perspective.
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-[#302B26]/80 dark:text-[#C6B59D] max-w-lg mb-8">
              Explore a curated world of photography, creative inspiration and beautiful visual stories.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onExploreGallery}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 min-h-[44px] rounded-full bg-[#302B26] text-[#F3EBDD] dark:bg-[#F3EBDD] dark:text-[#25231F] text-sm font-medium tracking-wide hover:bg-[#795C45] dark:hover:bg-[#D9C8AC] transition-colors whitespace-nowrap shrink-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#795C45]"
              >
                <span>Explore Gallery</span>
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onDiscoverCollections}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 min-h-[44px] rounded-full border border-[#302B26]/25 dark:border-[#F3EBDD]/25 bg-[#F8F4EC]/70 dark:bg-[#332F29]/70 text-[#302B26] dark:text-[#F3EBDD] text-sm font-medium tracking-wide hover:bg-[#E8DDC9] dark:hover:bg-[#40382F] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#795C45]"
              >
                <span>Discover Collections</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Right Column: Overlapping Editorial Photographs */}
          <div className="lg:col-span-6 relative min-h-[360px] sm:min-h-[460px] lg:min-h-[500px] flex items-center justify-center">
            <div className="relative w-full max-w-[540px] h-[360px] sm:h-[460px] lg:h-[500px]">
              {/* Left-back Frame */}
              <div className="absolute left-0 top-10 sm:top-12 w-[48%] sm:w-[46%] rounded-xl overflow-hidden shadow-[0_18px_40px_rgba(48,43,38,0.14)] dark:shadow-[0_18px_40px_rgba(0,0,0,0.45)] border border-[#F8F4EC]/80 dark:border-[#40382F] transition-transform duration-500 hover:-translate-y-1.5 z-10">
                <SmartImage
                  src={HERO_IMAGES.secondary}
                  alt="Editorial fashion coat on sunlit European street"
                  aspectRatio="3:4"
                  priority
                />
              </div>

              {/* Center-Primary Hero Frame */}
              <div className="absolute left-[26%] top-0 w-[52%] sm:w-[50%] rounded-xl overflow-hidden shadow-[0_24px_56px_rgba(48,43,38,0.18)] dark:shadow-[0_24px_56px_rgba(0,0,0,0.55)] border-2 border-[#F8F4EC] dark:border-[#40382F] transition-transform duration-500 hover:-translate-y-1.5 z-20">
                <SmartImage
                  src={HERO_IMAGES.primary}
                  alt="Sunlit Parisian Haussmann limestone architecture"
                  aspectRatio="3:4"
                  priority
                />
              </div>

              {/* Right-Foreground Frame */}
              <div className="absolute right-0 bottom-0 sm:bottom-2 w-[42%] sm:w-[40%] rounded-xl overflow-hidden shadow-[0_18px_44px_rgba(48,43,38,0.18)] dark:shadow-[0_18px_44px_rgba(0,0,0,0.5)] border-2 border-[#F8F4EC] dark:border-[#40382F] transition-transform duration-500 hover:-translate-y-1.5 z-30">
                <SmartImage
                  src={HERO_IMAGES.tertiary}
                  alt="Morning porcelain espresso and clothbound journal on travertine"
                  aspectRatio="3:4"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Unboxed Archive Summary Strip */}
        <div className="mt-10 pt-6 border-t border-[#302B26]/10 dark:border-[#F3EBDD]/10 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-[#795C45] dark:text-[#C6B59D]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="tabular-nums font-medium text-[#302B26] dark:text-[#F3EBDD]">
              {totalPhotos} Curated Photographs
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">9 Visual Disciplines</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{totalCollections} Editorial Collections</span>
          </div>
          <span className="italic font-serif-editorial text-base text-[#795C45] dark:text-[#C6B59D]">
            Light, composition, and quiet permanence.
          </span>
        </div>
      </div>
    </section>
  );
};
