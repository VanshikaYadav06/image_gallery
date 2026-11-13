import React from 'react';
import { Heart, Search, Shuffle, X } from 'lucide-react';
import { CATEGORIES, SEARCH_SUGGESTIONS } from '../data/photos';
import { Category, CollectionItem, GalleryViewMode } from '../types/prism';

interface SearchAndFiltersProps {
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: Category;
  onCategoryChange: (cat: Category) => void;
  viewMode: GalleryViewMode;
  onViewModeChange: (mode: GalleryViewMode) => void;
  favouritesCount: number;
  activeCollection: CollectionItem | null;
  onClearCollection: () => void;
  onSurpriseMe: () => void;
  filteredCount: number;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchInputRef,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  viewMode,
  onViewModeChange,
  favouritesCount,
  activeCollection,
  onClearCollection,
  onSurpriseMe,
  filteredCount,
}) => {
  return (
    <section
      id="explore"
      aria-label="Search and Category Filters"
      className="prism-search-gradient border-b border-[#302B26]/10 dark:border-[#F3EBDD]/10 py-10 sm:py-12"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-6">
        {/* Search Row + Action Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-2xl">
            <label htmlFor="prism-search-input" className="sr-only">
              Search photographs by title, category, or tags
            </label>
            <Search
              className="w-4 h-4 text-[#795C45] dark:text-[#C6B59D] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              ref={searchInputRef}
              id="prism-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by title, mood, category, or tag (e.g. Venice, 35mm Film)..."
              className="w-full h-12 pl-11 pr-11 rounded-full bg-[#F8F4EC] dark:bg-[#40382F] text-[#302B26] dark:text-[#F3EBDD] placeholder-[#795C45]/60 dark:placeholder-[#C6B59D]/60 border border-[#302B26]/15 dark:border-[#F3EBDD]/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#929078] dark:focus:ring-[#A5A185] transition-shadow"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search query"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full inline-flex items-center justify-center text-[#795C45] dark:text-[#C6B59D] hover:bg-[#E8DDC9] dark:hover:bg-[#332F29] transition-colors"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* View Mode & Surprise Me */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div
              role="tablist"
              aria-label="Gallery view mode"
              className="inline-flex items-center p-1 rounded-full bg-[#E8DDC9]/80 dark:bg-[#25231F]/80 border border-[#302B26]/10 dark:border-[#F3EBDD]/10"
            >
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'all'}
                onClick={() => onViewModeChange('all')}
                className={`px-4 py-1.5 min-h-[36px] rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  viewMode === 'all'
                    ? 'bg-[#F8F4EC] dark:bg-[#40382F] text-[#302B26] dark:text-[#F3EBDD] shadow-sm'
                    : 'text-[#795C45] dark:text-[#C6B59D] hover:text-[#302B26] dark:hover:text-[#F3EBDD]'
                }`}
              >
                All Perspectives
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'favourites'}
                onClick={() => onViewModeChange('favourites')}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 min-h-[36px] rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  viewMode === 'favourites'
                    ? 'bg-[#B98268] dark:bg-[#C18B70] text-[#F8F4EC] dark:text-[#25231F] shadow-sm'
                    : 'text-[#795C45] dark:text-[#C6B59D] hover:text-[#302B26] dark:hover:text-[#F3EBDD]'
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${viewMode === 'favourites' ? 'fill-current' : ''}`}
                  aria-hidden="true"
                />
                <span>Saved</span>
                <span className="tabular-nums">({favouritesCount})</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onSurpriseMe}
              className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full bg-[#929078] hover:bg-[#795C45] dark:bg-[#A5A185] dark:hover:bg-[#C18B70] text-[#F8F4EC] dark:text-[#25231F] text-sm font-medium transition-colors whitespace-nowrap shrink-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#302B26]"
            >
              <Shuffle className="w-4 h-4" aria-hidden="true" />
              <span>Surprise Me</span>
            </button>
          </div>
        </div>

        {/* Quick Search Suggestions */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[#795C45] dark:text-[#C6B59D]">
          <span className="uppercase tracking-wider opacity-80">Suggested:</span>
          {SEARCH_SUGGESTIONS.map((term) => {
            const active = searchQuery.toLowerCase() === term.toLowerCase();
            return (
              <button
                key={term}
                type="button"
                onClick={() => onSearchChange(active ? '' : term)}
                className={`px-2.5 py-1 rounded-full transition-colors whitespace-nowrap shrink-0 border ${
                  active
                    ? 'bg-[#302B26] text-[#F3EBDD] border-[#302B26] dark:bg-[#F3EBDD] dark:text-[#25231F] dark:border-[#F3EBDD]'
                    : 'bg-[#F8F4EC]/70 dark:bg-[#40382F]/60 border-[#302B26]/12 dark:border-[#F3EBDD]/12 hover:bg-[#D9C8AC]/60 dark:hover:bg-[#4A4137]'
                }`}
              >
                {term}
              </button>
            );
          })}
        </div>

        {/* Category Filter Pills */}
        <div
          role="group"
          aria-label="Filter by photography category"
          className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => onCategoryChange(cat.name)}
                aria-pressed={isSelected}
                className={`px-4 py-2 min-h-[40px] rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#795C45] ${
                  isSelected
                    ? `${cat.activeBg} ${cat.activeText} border-transparent shadow-sm`
                    : 'bg-[#F8F4EC]/85 dark:bg-[#332F29] text-[#302B26]/85 dark:text-[#F3EBDD]/85 border-[#302B26]/12 dark:border-[#F3EBDD]/12 hover:bg-[#D9C8AC]/55 dark:hover:bg-[#40382F]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Active Collection Banner & Live Result Summary */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs sm:text-sm text-[#795C45] dark:text-[#C6B59D]">
          <div className="flex flex-wrap items-center gap-2">
            {activeCollection && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D9C8AC]/70 dark:bg-[#40382F] text-[#302B26] dark:text-[#F3EBDD] border border-[#302B26]/15 dark:border-[#F3EBDD]/15">
                <span>Collection: {activeCollection.title}</span>
                <button
                  type="button"
                  onClick={onClearCollection}
                  aria-label="Clear collection filter"
                  className="hover:opacity-70 inline-flex items-center"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            )}
            <span className="tabular-nums">
              Showing {filteredCount} {filteredCount === 1 ? 'photograph' : 'photographs'}
              {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
              {viewMode === 'favourites' ? ' · Saved' : ''}
            </span>
          </div>

          {(searchQuery || selectedCategory !== 'All' || activeCollection) && (
            <button
              type="button"
              onClick={() => {
                onSearchChange('');
                onCategoryChange('All');
                onClearCollection();
              }}
              className="underline underline-offset-4 hover:text-[#302B26] dark:hover:text-[#F3EBDD] transition-colors whitespace-nowrap"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
