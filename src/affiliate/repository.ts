import type { AffiliateLink, AffiliateMetrics } from "./types";
import { AffiliateClient } from "./affiliateClient";

export const AffiliateRepository = {
  /**
   * Persist an affiliate link through the custom affiliate platform.
   */
  async save(link: AffiliateLink): Promise<void> {
    const client = new AffiliateClient();
    await client.createAffiliateLink(link);
  },

  /**
   * Retrieve all stored affiliate links for the current account.
   */
  async findAll(ownerId: string): Promise<AffiliateLink[]> {
    const client = new AffiliateClient();
    return client.getAffiliateLinks(ownerId);
  },

  /**
   * Retrieve metrics for a specific affiliate link.
   */
  async findMetrics(linkId: string): Promise<AffiliateMetrics> {
    const client = new AffiliateClient();
    return client.getAffiliateMetrics(linkId);
  },

  async incrementMetrics(linkId: string, event: "copy" | "share"): Promise<AffiliateMetrics> {
    const client = new AffiliateClient();
    return client.incrementMetrics(linkId, event);
  },
};
