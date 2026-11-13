export type ThemeMode = 'light' | 'dark';

export type Category =
  | 'All'
  | 'Architecture'
  | 'Nature'
  | 'Fashion'
  | 'Interiors'
  | 'Art & Design'
  | 'Travel'
  | 'Photography'
  | 'Lifestyle'
  | 'Minimalism';

export type GalleryViewMode = 'all' | 'favourites';

export interface PhotoItem {
  id: string;
  title: string;
  category: Exclude<Category, 'All'>;
  imageUrl: string;
  alt: string;
  photographer: string;
  sourceLabel: string;
  sourceUrl: string;
  tags: string[];
  aspectRatio: '3:4' | '4:3' | '2:3' | '3:2' | '1:1' | '16:9';
  exif: string;
  location: string;
  description: string;
  collectionIds: string[];
  paletteTone: 'olive' | 'terracotta' | 'champagne' | 'sage';
}

export interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  coverAlt: string;
  gradientClass: string;
  accentHex: string;
}
