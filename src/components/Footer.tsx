import React from 'react';
import { CATEGORIES } from '../data/photos';
import { Category } from '../types/prism';
import { PrismLogo } from './PrismLogo';

interface FooterProps {
  onSelectCategory: (cat: Category) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const exploreCategories = CATEGORIES.filter((c) => c.name !== 'All').slice(0, 8);

  return (
    <footer className="prism-footer-gradient text-[#F3EBDD] border-t border-[#F3EBDD]/10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#F3EBDD]/12">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <PrismLogo variant="light" />
            <p className="text-sm leading-relaxed text-[#E8DDC9]/80 max-w-sm">
              Discover Beauty in Every Perspective. A curated visual discovery journal celebrating quiet architecture, timeless fashion, botanical stillness, and analog light.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-serif-editorial text-lg font-medium text-[#F8F4EC]">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-[#E8DDC9]/80">
              <li>
                <a href="#home" className="hover:text-[#F8F4EC] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#explore" className="hover:text-[#F8F4EC] transition-colors">
                  Explore Gallery
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-[#F8F4EC] transition-colors">
                  Collections
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#F8F4EC] transition-colors">
                  About PRISM
                </a>
              </li>
            </ul>
          </div>

          {/* Explore Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-serif-editorial text-lg font-medium text-[#F8F4EC]">
              Categories
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-[#E8DDC9]/80">
              {exploreCategories.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => onSelectCategory(cat.name)}
                  className="text-left hover:text-[#F8F4EC] transition-colors truncate"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Editorial Social Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-serif-editorial text-lg font-medium text-[#F8F4EC]">
              Journal Links
            </h3>
            <ul className="space-y-2 text-sm text-[#E8DDC9]/80">
              <li>
                <a
                  href="https://unsplash.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F8F4EC] transition-colors"
                >
                  Instagram Archive
                </a>
              </li>
              <li>
                <a
                  href="https://www.pexels.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F8F4EC] transition-colors"
                >
                  Pinterest Boards
                </a>
              </li>
              <li>
                <a
                  href="https://pixabay.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F8F4EC] transition-colors"
                >
                  Editorial Dispatch
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E8DDC9]/65">
          <p>© {new Date().getFullYear()} PRISM Visual Discovery Archive. All rights reserved.</p>
          <p className="font-serif-editorial italic text-sm text-[#D9C8AC]">
            Discover Beauty in Every Perspective.
          </p>
        </div>
      </div>
    </footer>
  );
};
