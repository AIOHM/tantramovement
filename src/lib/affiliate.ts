const DEFAULT_AFFILIATE_ORIGIN = import.meta.env.VITE_AFFILIATE_ORIGIN || "https://tantramovement.com";

export const AFFILIATE_ORIGIN = DEFAULT_AFFILIATE_ORIGIN;

export function normalizeAffiliateUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith("/")) {
    return `${AFFILIATE_ORIGIN}${pathOrUrl}`;
  }

  try {
    const url = new URL(pathOrUrl);
    const isSameOrigin = url.origin === AFFILIATE_ORIGIN;
    if (isSameOrigin) {
      return url.toString();
    }

    return `${AFFILIATE_ORIGIN}${url.pathname}${url.search}${url.hash}`;
  } catch {
    const normalizedPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
    return `${AFFILIATE_ORIGIN}${normalizedPath}`;
  }
}

export function affiliateLinkForPath(path: string, affiliateId?: string) {
  const normalizedUrl = normalizeAffiliateUrl(path);
  if (!affiliateId?.trim()) {
    return normalizedUrl;
  }

  try {
    const url = new URL(normalizedUrl);
    url.searchParams.set("affid", affiliateId.trim());
    return url.toString();
  } catch {
    return normalizedUrl;
  }
}
