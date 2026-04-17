import type { AffiliateLink, AffiliateMetrics, AffiliateUser } from "./types";

const STORAGE_KEY = "ttc_affiliate_store_v1";
const SESSION_KEY = "ttc_affiliate_session";

type StoredAffiliateAccount = AffiliateUser & {
  password: string;
};

type LocalAffiliateStore = {
  users: StoredAffiliateAccount[];
  links: AffiliateLink[];
  metrics: Record<string, AffiliateMetrics>;
};

function readStore(): LocalAffiliateStore {
  if (typeof window === "undefined") {
    return { users: [], links: [], metrics: {} };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { users: [], links: [], metrics: {} };
    }
    return JSON.parse(raw) as LocalAffiliateStore;
  } catch {
    return { users: [], links: [], metrics: {} };
  }
}

function writeStore(store: LocalAffiliateStore) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function getAffiliateSessionUserId(): string | null {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(SESSION_KEY);
}

export function setAffiliateSessionUserId(userId: string) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(SESSION_KEY, userId);
}

export function clearAffiliateSession() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(SESSION_KEY);
}

export function findAffiliateUserByEmail(email: string): AffiliateUser | null {
  const store = readStore();
  const account = store.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  return account ? { ...account, password: undefined as any } : null;
}

export function findAffiliateUserById(userId: string): AffiliateUser | null {
  const store = readStore();
  const account = store.users.find((user) => user.id === userId);
  return account ? { ...account, password: undefined as any } : null;
}

export function createAffiliateUser(user: Omit<AffiliateUser, "createdAt"> & { password: string }) {
  const store = readStore();
  const existing = store.users.find((account) => account.email.toLowerCase() === user.email.toLowerCase() || account.affiliateId === user.affiliateId);
  if (existing) {
    throw new Error("A partner account already exists with that email or affiliate ID.");
  }

  const account: StoredAffiliateAccount = {
    ...user,
    createdAt: new Date().toISOString(),
  };
  store.users.push(account);
  writeStore(store);
  return { ...account, password: undefined as any };
}

export function validateAffiliateCredentials(email: string, password: string): AffiliateUser | null {
  const store = readStore();
  const account = store.users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
  );
  return account ? { ...account, password: undefined as any } : null;
}

export function getAffiliateLinksForOwner(ownerId: string) {
  const store = readStore();
  return store.links.filter((link) => link.ownerId === ownerId);
}

export function saveAffiliateLink(link: AffiliateLink) {
  const store = readStore();
  const index = store.links.findIndex((existing) => existing.id === link.id);
  if (index >= 0) {
    store.links[index] = link;
  } else {
    store.links.push(link);
  }
  writeStore(store);
}

export function getAffiliateMetrics(linkId: string): AffiliateMetrics {
  const store = readStore();
  return (
    store.metrics[linkId] || {
      shares: 0,
      copies: 0,
      clicks: 0,
      conversions: 0,
      revenue: 0,
    }
  );
}

export function saveAffiliateMetrics(linkId: string, metrics: AffiliateMetrics) {
  const store = readStore();
  store.metrics[linkId] = metrics;
  writeStore(store);
}

export function createAffiliateMetrics(linkId: string) {
  const metrics = getAffiliateMetrics(linkId);
  saveAffiliateMetrics(linkId, metrics);
  return metrics;
}

export function incrementAffiliateMetric(linkId: string, delta: Partial<AffiliateMetrics>) {
  const metrics = getAffiliateMetrics(linkId);
  const next = {
    ...metrics,
    shares: metrics.shares + (delta.shares ?? 0),
    copies: metrics.copies + (delta.copies ?? 0),
    clicks: metrics.clicks + (delta.clicks ?? 0),
    conversions: metrics.conversions + (delta.conversions ?? 0),
    revenue: metrics.revenue + (delta.revenue ?? 0),
  };
  saveAffiliateMetrics(linkId, next);
  return next;
}
