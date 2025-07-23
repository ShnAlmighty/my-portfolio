/**
 * Utility functions for image optimization
 */

/**
 * Get the appropriate image size based on viewport width
 * @param viewportWidth - The width of the viewport
 * @returns The appropriate image size
 */
export function getImageSize(viewportWidth: number): number {
  if (viewportWidth < 640) return 640;
  if (viewportWidth < 768) return 750;
  if (viewportWidth < 1024) return 828;
  if (viewportWidth < 1280) return 1080;
  if (viewportWidth < 1536) return 1200;
  return 1920;
}

/**
 * Generate srcSet for responsive images
 * @param src - The base image URL
 * @param sizes - Array of sizes to generate srcSet for
 * @returns The srcSet string
 */
export function generateSrcSet(src: string, sizes: number[] = [640, 750, 828, 1080, 1200, 1920]): string {
  return sizes.map(size => `${src}?w=${size} ${size}w`).join(', ');
}

/**
 * Generate sizes attribute for responsive images
 * @param sizes - Object with breakpoints and sizes
 * @returns The sizes string
 */
export function generateSizes(sizes: Record<string, string> = {
  '(max-width: 640px)': '100vw',
  '(max-width: 768px)': '75vw',
  '(max-width: 1024px)': '50vw',
  'default': '33vw'
}): string {
  return Object.entries(sizes)
    .map(([breakpoint, size]) => breakpoint === 'default' ? size : `${breakpoint} ${size}`)
    .join(', ');
}

/**
 * Get image dimensions from URL or path
 * @param src - The image URL or path
 * @returns The image dimensions (width and height)
 */
export function getImageDimensions(src: string): { width: number, height: number } {
  // This is a placeholder. In a real app, you would use an image processing library
  // or store the dimensions in a database or metadata file.
  return {
    width: 1200,
    height: 800,
  };
}

/**
 * Calculate aspect ratio from width and height
 * @param width - The width of the image
 * @param height - The height of the image
 * @returns The aspect ratio
 */
export function calculateAspectRatio(width: number, height: number): number {
  return width / height;
}

/**
 * Get the appropriate quality based on the device
 * @param isHighDensity - Whether the device has a high-density display
 * @returns The appropriate quality
 */
export function getImageQuality(isHighDensity: boolean): number {
  return isHighDensity ? 80 : 75;
}