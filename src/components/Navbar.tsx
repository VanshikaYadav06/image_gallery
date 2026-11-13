import React, { useEffect, useState } from 'react';
import { Heart, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { GalleryViewMode, ThemeMode } from '../types/prism';
import { PrismLogo } from './PrismLogo';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  favouritesCount: number;
  viewMode: GalleryViewMode;
  onOpenFavourites: () => void;
  onFocusSearch: () => void;
  onResetExplore: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  favouritesCount,
  viewMode,
  onOpenFavourites,
  onFocusSearch,
  onResetExplore,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home', onClick: undefined },
    { label: 'Explore', href: '#explore', onClick: onResetExplore },
    { label: 'Collections', href: '#collections', onClick: undefined },
    { label: 'About', href: '#about', onClick: undefined },
  ];

  const handleMobileNavClick = (href: string, cb?: () => void) => {
    setMobileOpen(false);
    if (cb) cb();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 border-b border-[#302B26]/10 dark:border-[#F3EBDD]/10 ${
        scrolled
          ? 'bg-[#E8DDC9]/92 dark:bg-[#332F29]/92 backdrop-blur-md shadow-[0_4px_24px_rgba(48,43,38,0.06)]'
          : 'bg-[#E8DDC9]/80 dark:bg-[#332F29]/82 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-16 sm:h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          aria-label="PRISM Home"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#795C45] dark:focus-visible:ring-[#C6B59D] rounded-sm"
        >
          <PrismLogo />
        </a>

        {/* Zone 2: Center Editorial Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-normal tracking-wide text-[#302B26]/80 dark:text-[#F3EBDD]/85"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => item.onClick?.()}
              className="relative py-1 whitespace-nowrap shrink-0 hover:text-[#302B26] dark:hover:text-[#F3EBDD] transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#795C45] dark:after:bg-[#C6B59D] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#795C45] rounded-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onFocusSearch}
            aria-label="Jump to search"
            className="inline-flex items-center justify-center w-10 h-10 sm:w-auto sm:px-3 sm:py-2 rounded-full text-sm text-[#302B26] dark:text-[#F3EBDD] hover:bg-[#D9C8AC]/60 dark:hover:bg-[#40382F] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#795C45]"
          >
            <Search className="w-4 h-4 sm:mr-1.5" aria-hidden="true" />
            <span className="hidden lg:inline">Search</span>
          </button>

          <button
            type="button"
            onClick={onOpenFavourites}
            aria-label={`View saved favourites (${favouritesCount})`}
            aria-pressed={viewMode === 'favourites'}
            className={`inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-full text-sm transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#795C45] ${
              viewMode === 'favourites'
                ? 'bg-[#B98268] text-[#F8F4EC] dark:bg-[#C18B70] dark:text-[#25231F]'
                : 'bg-[#F8F4EC]/75 dark:bg-[#40382F] text-[#302B26] dark:text-[#F3EBDD] border border-[#302B26]/12 dark:border-[#F3EBDD]/12 hover:bg-[#F8F4EC] dark:hover:bg-[#4A4137]'
            }`}
          >
            <Heart
              className={`w-4 h-4 ${viewMode === 'favourites' ? 'fill-current' : ''}`}
              aria-hidden="true"
            />
            <span className="hidden sm:inline">Favourites</span>
            <span className="tabular-nums text-xs opacity-85">({favouritesCount})</span>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#F8F4EC]/75 dark:bg-[#40382F] text-[#302B26] dark:text-[#F3EBDD] border border-[#302B26]/12 dark:border-[#F3EBDD]/12 hover:bg-[#D9C8AC]/70 dark:hover:bg-[#4A4137] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#795C45]"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Sun className="w-4 h-4" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full text-[#302B26] dark:text-[#F3EBDD] hover:bg-[#D9C8AC]/60 dark:hover:bg-[#40382F] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#795C45]"
          >
            {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-[#302B26]/10 dark:border-[#F3EBDD]/10 bg-[#F8F4EC]/96 dark:bg-[#332F29]/98 px-6 py-4 flex flex-col gap-1"
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleMobileNavClick(item.href, item.onClick)}
              className="w-full text-left py-3 px-2 min-h-[44px] font-serif-editorial text-xl text-[#302B26] dark:text-[#F3EBDD] hover:text-[#795C45] dark:hover:text-[#C6B59D] border-b border-[#302B26]/8 dark:border-[#F3EBDD]/8 last:border-b-0 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};
