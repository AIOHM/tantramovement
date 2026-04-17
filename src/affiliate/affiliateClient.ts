import type { AffiliateLink, AffiliateMetrics } from "./types";
import { getAffiliateLinksForOwner, saveAffiliateLink, getAffiliateMetrics, createAffiliateMetrics, saveAffiliateMetrics } from "./localAffiliateStore";

export class AffiliateClient {
  async createAffiliateLink(link: AffiliateLink): Promise<void> {
    saveAffiliateLink(link);
    createAffiliateMetrics(link.id);
  }

  async getAffiliateLinks(ownerId: string): Promise<AffiliateLink[]> {
    return getAffiliateLinksForOwner(ownerId);
  }

  async getAffiliateMetrics(linkId: string): Promise<AffiliateMetrics> {
    return getAffiliateMetrics(linkId);
  }

  async incrementMetrics(linkId: string, event: "copy" | "share"): Promise<AffiliateMetrics> {
    const metrics = getAffiliateMetrics(linkId);
    const updated = {
      ...metrics,
      shares: metrics.shares + (event === "share" ? 1 : 0),
      copies: metrics.copies + (event === "copy" ? 1 : 0),
    };
    saveAffiliateMetrics(linkId, updated);
    return updated;
  }
}
