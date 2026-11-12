/**
 * Website Thumbnail Service
 * 
 * Generates thumbnails for client websites using screenshot APIs
 * Provides graceful fallbacks for failed fetches
 */

// Thumbnail API options (choose one based on your preference)
const THUMBNAIL_SERVICES = {
  // Free, reliable, no API key needed - PRIMARY SERVICE
  thumbnailws: (url: string) =>
    `https://api.thumbnail.ws/api/${import.meta.env.VITE_THUMBNAIL_WS_KEY || 'free'}/thumbnail/get?url=${encodeURIComponent(url)}&width=800`,

  // Free tier: 100 requests/month
  screenshotone: (url: string) =>
    `https://api.screenshotone.com/take?access_key=${import.meta.env.VITE_SCREENSHOT_API_KEY}&url=${encodeURIComponent(url)}&viewport_width=1280&viewport_height=720&format=jpg&image_quality=80`,

  // Free tier: No API key needed (rate limited)
  screenshotapi: (url: string) =>
    `https://shot.screenshotapi.net/screenshot?url=${encodeURIComponent(url)}&width=1280&height=720&output=image&file_type=jpg&wait_for_event=load`,

  // Fallback: Use a placeholder service
  placeholder: (url: string) => {
    const domain = new URL(url).hostname;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(domain)}&size=400&background=random&format=svg`;
  },
};

/**
 * Get thumbnail URL for a website with retry logic
 * Falls back to placeholder if URL is invalid or service fails
 */
export function getWebsiteThumbnail(websiteUrl: string | undefined, retryCount = 0): string {
  console.log(`🔍 getWebsiteThumbnail called:`, { websiteUrl, retryCount });

  if (!websiteUrl) {
    console.log('⚠️ No websiteUrl provided, using placeholder');
    return getPlaceholderThumbnail('No Website');
  }

  try {
    // Validate and normalize URL
    const normalizedUrl = websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`;
    const url = new URL(normalizedUrl);

    console.log(`✅ Valid URL detected: ${url.toString()}`);

    // Try different services based on retry count - start with most reliable
    if (retryCount === 0) {
      const thumbnailUrl = THUMBNAIL_SERVICES.thumbnailws(url.toString());
      console.log(`🖼️ Using thumbnail.ws (most reliable): ${thumbnailUrl}`);
      return thumbnailUrl;
    } else if (retryCount === 1) {
      const thumbnailUrl = THUMBNAIL_SERVICES.screenshotapi(url.toString());
      console.log(`🖼️ Fallback to screenshotapi: ${thumbnailUrl}`);
      return thumbnailUrl;
    } else if (retryCount === 2) {
      const thumbnailUrl = THUMBNAIL_SERVICES.screenshotone(url.toString());
      console.log(`🖼️ Fallback to screenshotone: ${thumbnailUrl}`);
      return thumbnailUrl;
    } else {
      console.log('🖼️ Max retries reached, using placeholder');
      return getPlaceholderThumbnail(url.hostname);
    }
  } catch (error) {
    console.warn('❌ Invalid website URL:', websiteUrl, error);
    return getPlaceholderThumbnail(String(websiteUrl || 'Invalid URL'));
  }
}

/**
 * Get placeholder thumbnail with website name or domain
 * Uses local default image or falls back to external service
 */
export function getPlaceholderThumbnail(_text?: string | undefined | null): string {
  // Check if developer has set a custom placeholder in localStorage
  const customPlaceholder = localStorage.getItem('zubaze_default_thumbnail');
  if (customPlaceholder) {
    console.log('🎨 Using custom developer placeholder');
    return customPlaceholder;
  }

  // Use our default placeholder image (supports .svg, .png, .jpg)
  const defaultPlaceholder = '/assets/images/default-thumbnail.png';
  console.log('🎨 Using default system placeholder');
  return defaultPlaceholder;
}

/**
 * Get text-based placeholder (for backwards compatibility or fallback)
 */
export function getTextPlaceholder(text: string | undefined | null): string {
  const safeText = String(text || 'No Website');
  const cleanText = safeText.replace(/^https?:\/\//, '').split('/')[0];
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanText)}&size=400&background=6366f1&color=fff&format=svg&bold=true`;
}

/**
 * Handle thumbnail load error with retry logic
 */
export function handleThumbnailError(
  event: React.SyntheticEvent<HTMLImageElement>,
  fallbackText: string | undefined,
  originalUrl?: string
): void {
  const img = event.currentTarget;
  const currentRetry = parseInt(img.dataset.retryCount || '0');
  const safeFallbackText = String(fallbackText || 'Unknown');

  console.log(`❌ Thumbnail error for ${safeFallbackText}, retry ${currentRetry}`);

  // If current src is already our placeholder, don't do anything (prevent infinite loop)
  if (img.src.includes('/assets/images/default-thumbnail')) {
    console.log('🛑 Already showing placeholder, stopping retries');
    return;
  }

  // If we've already tried retries or there's no original URL, go straight to placeholder
  if (currentRetry >= 2 || !originalUrl || img.dataset.fallbackAttempted === 'true') {
    img.dataset.fallbackAttempted = 'true';
    const placeholderUrl = getPlaceholderThumbnail(safeFallbackText);
    console.log(`🎯 Using placeholder: ${placeholderUrl}`);
    img.src = placeholderUrl;
    return;
  }

  // Try next service (but limit to 2 retries max to reduce flickering)
  if (currentRetry < 2) {
    img.dataset.retryCount = (currentRetry + 1).toString();
    const newUrl = getWebsiteThumbnail(originalUrl, currentRetry + 1);
    console.log(`🔄 Retry ${currentRetry + 1}: ${newUrl}`);
    img.src = newUrl;
  } else {
    // After retries, use placeholder
    img.dataset.fallbackAttempted = 'true';
    const placeholderUrl = getPlaceholderThumbnail(safeFallbackText);
    console.log(`🎯 Final fallback: ${placeholderUrl}`);
    img.src = placeholderUrl;
  }
}

/**
 * Preload thumbnail image
 * Returns a promise that resolves when image loads or rejects on error
 */
export function preloadThumbnail(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => reject(new Error('Failed to load thumbnail'));
    img.src = url;
  });
}
