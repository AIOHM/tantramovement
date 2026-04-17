import type { AffiliateLink, AffiliateLinkInput, AffiliateMetrics } from "./types";
import { AffiliateRepository } from "./repository";
import { affiliateLinkForPath } from "@/lib/affiliate";

export const AffiliateService = {
  /**
   * Create a new affiliate link entry.
   *
   * The URL is normalized to the production root domain using
   * `src/lib/affiliate.ts`, which defaults to `https://tantramovement.com`.
   */
  async createAffiliateLink(data: AffiliateLinkInput, ownerId: string): Promise<AffiliateLink> {
    const formattedUrl = affiliateLinkForPath(data.url, data.affiliateId);
    const link: AffiliateLink = {
      id: `${Date.now()}`,
      ownerId,
      url: formattedUrl,
      description: data.description,
      createdAt: new Date().toISOString(),
      status: "active",
    };

    await AffiliateRepository.save(link);
    return link;
  },

  /**
   * Fetch all affiliate links for the current partner.
   */
  async getAffiliateLinks(ownerId: string): Promise<AffiliateLink[]> {
    return AffiliateRepository.findAll(ownerId);
  },

  /**
   * Fetch performance metrics for a specific affiliate link.
   */
  async getAffiliateMetrics(linkId: string): Promise<AffiliateMetrics> {
    return AffiliateRepository.findMetrics(linkId);
  },

  async recordShare(linkId: string, event: "copy" | "share") {
    return AffiliateRepository.incrementMetrics(linkId, event);
  },
};
