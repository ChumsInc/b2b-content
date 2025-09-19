export type ImageSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'original';
export type ImageSizes = Partial<Record<ImageSize, number>>;

export type FilenameParts = { name: string, ext: string };
