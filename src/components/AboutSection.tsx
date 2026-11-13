import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface AboutSectionProps {
  onExploreClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onExploreClick }) => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="prism-about-gradient py-20 sm:py-24 border-t border-[#302B26]/10 dark:border-[#F3EBDD]/10"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#795C45] dark:text-[#C6B59D]">
              About PRISM
            </p>
            <h2
              id="about-heading"
              className="font-serif-editorial text-4xl sm:text-5xl font-medium text-[#302B26] dark:text-[#F3EBDD] leading-[1.1] [text-wrap:balance]"
            >
              More Than Just Images.
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[#302B26]/85 dark:text-[#F3EBDD]/85 max-w-2xl">
              PRISM is a visual discovery space created for people who find inspiration in the details. From architecture and nature to fashion, art and everyday moments, explore a carefully curated world of beautiful imagery.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-6 text-sm text-[#795C45] dark:text-[#C6B59D]">
              <button
                type="button"
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-full bg-[#302B26] text-[#F3EBDD] dark:bg-[#F3EBDD] dark:text-[#25231F] font-medium hover:bg-[#795C45] dark:hover:bg-[#D9C8AC] transition-colors"
              >
                <span>Return to Gallery</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <span>Curated Perspectives · Vintage Editorial Archive</span>
            </div>
          </div>

          {/* Refractive Geometric Prism Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[360px] aspect-square rounded-2xl bg-[#F8F4EC]/55 dark:bg-[#25231F]/45 border border-[#302B26]/12 dark:border-[#F3EBDD]/12 p-8 flex items-center justify-center shadow-[0_18px_42px_rgba(48,43,38,0.08)]">
              <svg
                viewBox="0 0 280 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-full h-full"
              >
                <circle
                  cx="140"
                  cy="140"
                  r="112"
                  stroke="currentColor"
                  strokeOpacity="0.14"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                  className="text-[#795C45] dark:text-[#C6B59D]"
                />
                {/* Incoming light beam */}
                <line
                  x1="18"
                  y1="158"
                  x2="108"
                  y2="132"
                  stroke="#D9C8AC"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Refracted spectrum lines in brand palette */}
                <line x1="166" y1="126" x2="262" y2="96" stroke="#A6AA91" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="172" y1="138" x2="264" y2="134" stroke="#929078" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="178" y1="150" x2="260" y2="174" stroke="#B98268" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="184" y1="162" x2="252" y2="210" stroke="#795C45" strokeWidth="2.2" strokeLinecap="round" />

                {/* Central Prism Triangle */}
                <polygon
                  points="140,46 218,198 62,198"
                  fill="rgba(248,244,236,0.35)"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  className="text-[#302B26] dark:text-[#F3EBDD]"
                />
                <line
                  x1="140"
                  y1="46"
                  x2="140"
                  y2="198"
                  stroke="currentColor"
                  strokeOpacity="0.35"
                  strokeWidth="1"
                  className="text-[#302B26] dark:text-[#F3EBDD]"
                />
                <circle cx="140" cy="144" r="3" fill="#B98268" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
