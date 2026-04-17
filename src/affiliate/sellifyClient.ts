import type { AffiliateLink, AffiliateMetrics } from "./types";
import { getAffiliateLinksForOwner, saveAffiliateLink, getAffiliateMetrics, createAffiliateMetrics, saveAffiliateMetrics } from "./localAffiliateStore";

const SELLIFY_API_BASE = import.meta.env.VITE_SELLIFY_API_BASE || "";

export class SellifyClient {
  private get baseUrl() {
    return SELLIFY_API_BASE;
  }

  private get headers() {
    return {
      "Content-Type": "application/json",
      ...(import.meta.env.VITE_SELLIFY_API_TOKEN ? { Authorization: `Bearer ${import.meta.env.VITE_SELLIFY_API_TOKEN}` } : {}),
    };
  }

  async createAffiliateLink(link: AffiliateLink): Promise<void> {
    if (!this.baseUrl) {
      saveAffiliateLink(link);
      createAffiliateMetrics(link.id);
      return;
    }

    await fetch(`${this.baseUrl}/api/affiliate-links`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(link),
    });
  }

  async getAffiliateLinks(ownerId: string): Promise<AffiliateLink[]> {
    if (!this.baseUrl) {
      return getAffiliateLinksForOwner(ownerId);
    }

    const response = await fetch(`${this.baseUrl}/api/affiliate-links?ownerId=${ownerId}`, {
      headers: this.headers,
    });
    return response.ok ? response.json() : [];
  }

  async getAffiliateMetrics(linkId: string): Promise<AffiliateMetrics> {
    if (!this.baseUrl) {
      return getAffiliateMetrics(linkId);
    }

    const response = await fetch(`${this.baseUrl}/api/affiliate-links/${linkId}/metrics`, {
      headers: this.headers,
    });
    return response.ok ? response.json() : { shares: 0, copies: 0, clicks: 0, conversions: 0, revenue: 0 };
  }

  async incrementMetrics(linkId: string, event: "copy" | "share"): Promise<AffiliateMetrics> {
    if (!this.baseUrl) {
      const metrics = getAffiliateMetrics(linkId);
      const updated = {
        ...metrics,
        shares: metrics.shares + (event === "share" ? 1 : 0),
        copies: metrics.copies + (event === "copy" ? 1 : 0),
      };
      saveAffiliateMetrics(linkId, updated);
      return updated;
    }

    const response = await fetch(`${this.baseUrl}/api/affiliate-links/${linkId}/metrics`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ event }),
    });
    return response.ok ? response.json() : { shares: 0, copies: 0, clicks: 0, conversions: 0, revenue: 0 };
  }
}
