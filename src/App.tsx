import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { FeaturedCollections } from './components/FeaturedCollections';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Lightbox } from './components/Lightbox';
import { LiquidAuraCursor } from './components/LiquidAuraCursor';
import { MasonryGallery } from './components/MasonryGallery';
import { Navbar } from './components/Navbar';
import { SearchAndFilters } from './components/SearchAndFilters';
import { COLLECTIONS, PHOTOS } from './data/photos';
import { Category, GalleryViewMode, PhotoItem, ThemeMode } from './types/prism';

const THEME_STORAGE_KEY = 'prism-theme';
const FAVOURITES_STORAGE_KEY = 'prism-favourites';
const INITIAL_VISIBLE_COUNT = 15;
const LOAD_MORE_STEP = 12;

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const [favourites, setFavourites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVOURITES_STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<GalleryViewMode>('all');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [lightboxPhoto, setLightboxPhoto] = useState<PhotoItem | null>(null);
  const lastSurpriseIdRef = useRef<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Sync theme with <html> and LocalStorage
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage quota errors
    }
  }, [theme]);

  // Persist favourites in LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(favourites));
    } catch {
      // Ignore storage quota errors
    }
  }, [favourites]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const toggleFavourite = useCallback((id: string) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const activeCollection = useMemo(
    () => COLLECTIONS.find((c) => c.id === activeCollectionId) || null,
    [activeCollectionId]
  );

  const filteredPhotos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return PHOTOS.filter((photo) => {
      if (viewMode === 'favourites' && !favourites.includes(photo.id)) {
        return false;
      }
      if (selectedCategory !== 'All' && photo.category !== selectedCategory) {
        return false;
      }
      if (activeCollectionId && !photo.collectionIds.includes(activeCollectionId)) {
        return false;
      }
      if (query) {
        const searchable = [
          photo.title,
          photo.category,
          photo.photographer,
          photo.location,
          ...photo.tags,
        ]
          .join(' ')
          .toLowerCase();
        if (!searchable.includes(query)) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedCategory, activeCollectionId, viewMode, favourites]);

  // When searching or filtering, reveal all matching items; otherwise respect pagination
  const isFiltered =
    Boolean(searchQuery.trim()) ||
    selectedCategory !== 'All' ||
    Boolean(activeCollectionId) ||
    viewMode === 'favourites';

  const displayedPhotos = useMemo(() => {
    if (isFiltered) return filteredPhotos;
    return filteredPhotos.slice(0, visibleCount);
  }, [filteredPhotos, isFiltered, visibleCount]);

  const hasMore = !isFiltered && displayedPhotos.length < filteredPhotos.length;

  const scrollToExplore = useCallback(() => {
    const el = document.getElementById('explore');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToCollections = useCallback(() => {
    const el = document.getElementById('collections');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleFocusSearch = useCallback(() => {
    scrollToExplore();
    window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 320);
  }, [scrollToExplore]);

  const handleOpenFavourites = useCallback(() => {
    setViewMode((prev) => (prev === 'favourites' ? 'all' : 'favourites'));
    scrollToExplore();
  }, [scrollToExplore]);

  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('All');
    setActiveCollectionId(null);
    setViewMode('all');
  }, []);

  const handleSelectCollection = useCallback(
    (collectionId: string) => {
      setActiveCollectionId((prev) => (prev === collectionId ? null : collectionId));
      setSelectedCategory('All');
      setViewMode('all');
      scrollToExplore();
    },
    [scrollToExplore]
  );

  const handleCategorySelectFromFooter = useCallback(
    (cat: Category) => {
      setSelectedCategory(cat);
      setActiveCollectionId(null);
      setViewMode('all');
      scrollToExplore();
    },
    [scrollToExplore]
  );

  const handleSurpriseMe = useCallback(() => {
    const pool = filteredPhotos.length > 1 ? filteredPhotos : PHOTOS;
    const candidates = pool.filter(
      (p) => p.id !== lastSurpriseIdRef.current && p.id !== lightboxPhoto?.id
    );
    const sourcePool = candidates.length > 0 ? candidates : pool;
    const picked = sourcePool[Math.floor(Math.random() * sourcePool.length)];
    if (picked) {
      lastSurpriseIdRef.current = picked.id;
      setLightboxPhoto(picked);
    }
  }, [filteredPhotos, lightboxPhoto]);

  const lightboxList = useMemo(() => {
    if (!lightboxPhoto) return [];
    const inFiltered = filteredPhotos.some((p) => p.id === lightboxPhoto.id);
    return inFiltered ? filteredPhotos : PHOTOS;
  }, [filteredPhotos, lightboxPhoto]);

  const lightboxIndex = useMemo(() => {
    if (!lightboxPhoto) return 0;
    const idx = lightboxList.findIndex((p) => p.id === lightboxPhoto.id);
    return idx >= 0 ? idx : 0;
  }, [lightboxList, lightboxPhoto]);

  const handlePrevLightbox = useCallback(() => {
    if (lightboxList.length === 0) return;
    const prevIdx = (lightboxIndex - 1 + lightboxList.length) % lightboxList.length;
    setLightboxPhoto(lightboxList[prevIdx]);
  }, [lightboxIndex, lightboxList]);

  const handleNextLightbox = useCallback(() => {
    if (lightboxList.length === 0) return;
    const nextIdx = (lightboxIndex + 1) % lightboxList.length;
    setLightboxPhoto(lightboxList[nextIdx]);
  }, [lightboxIndex, lightboxList]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F3EBDD] dark:bg-[#25231F] text-[#302B26] dark:text-[#F3EBDD] transition-colors duration-300">
      <LiquidAuraCursor theme={theme} />

      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        favouritesCount={favourites.length}
        viewMode={viewMode}
        onOpenFavourites={handleOpenFavourites}
        onFocusSearch={handleFocusSearch}
        onResetExplore={handleResetFilters}
      />

      <main className="flex-1">
        <Hero
          totalPhotos={PHOTOS.length}
          totalCollections={COLLECTIONS.length}
          onExploreGallery={scrollToExplore}
          onDiscoverCollections={scrollToCollections}
        />

        <SearchAndFilters
          searchInputRef={searchInputRef}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          favouritesCount={favourites.length}
          activeCollection={activeCollection}
          onClearCollection={() => setActiveCollectionId(null)}
          onSurpriseMe={handleSurpriseMe}
          filteredCount={filteredPhotos.length}
        />

        <MasonryGallery
          photos={displayedPhotos}
          totalFilteredCount={filteredPhotos.length}
          hasMore={hasMore}
          onLoadMore={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
          favourites={favourites}
          onToggleFavourite={toggleFavourite}
          onSelectPhoto={setLightboxPhoto}
          viewMode={viewMode}
          onResetFilters={handleResetFilters}
          onSwitchToAll={() => setViewMode('all')}
        />

        <FeaturedCollections
          collections={COLLECTIONS}
          photos={PHOTOS}
          activeCollectionId={activeCollectionId}
          onSelectCollection={handleSelectCollection}
        />

        <AboutSection onExploreClick={scrollToExplore} />
      </main>

      <Footer onSelectCategory={handleCategorySelectFromFooter} />

      <Lightbox
        photo={lightboxPhoto}
        currentIndex={lightboxIndex}
        totalCount={lightboxList.length}
        isFavourite={lightboxPhoto ? favourites.includes(lightboxPhoto.id) : false}
        onClose={() => setLightboxPhoto(null)}
        onPrev={handlePrevLightbox}
        onNext={handleNextLightbox}
        onToggleFavourite={toggleFavourite}
        onSurpriseNext={handleSurpriseMe}
      />
    </div>
  );
}
