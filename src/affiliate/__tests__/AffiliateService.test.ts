import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { AffiliateService } from "../service";
import { AffiliateRepository } from "../repository";

vi.mock("../repository", () => ({
  AffiliateRepository: {
    save: vi.fn(),
    findAll: vi.fn(),
    findMetrics: vi.fn(),
  },
}));

describe("AffiliateService", () => {
  const repository = AffiliateRepository as unknown as {
    save: vi.Mock;
    findAll: vi.Mock;
    findMetrics: vi.Mock;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates an affiliate link and calls the repository", async () => {
    repository.save.mockResolvedValue(undefined);

    const affiliateLink = await AffiliateService.createAffiliateLink(
      {
        url: "/affiliate/test",
        affiliateId: "partner123",
        description: "Test link",
      },
      "owner-1"
    );

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({
      ownerId: "owner-1",
      url: "https://tantramovement.com/affiliate/test?affid=partner123",
      description: "Test link",
      status: "active",
    }));
    expect(affiliateLink.id).toBeDefined();
    expect(affiliateLink.createdAt).toBeDefined();
  });

  it("fetches affiliate links via the repository", async () => {
    const links = [
      { id: "1", url: "https://tantramovement.com/affiliate/test", description: "Test", createdAt: new Date().toISOString() },
    ];
    repository.findAll.mockResolvedValue(links);

    const result = await AffiliateService.getAffiliateLinks("owner-1");

    expect(repository.findAll).toHaveBeenCalledWith("owner-1");
    expect(result).toEqual(links);
  });

  it("fetches metrics for a specific link via the repository", async () => {
    const metrics = { shares: 2, copies: 1, clicks: 5, conversions: 1, revenue: 20 };
    repository.findMetrics.mockResolvedValue(metrics);

    const result = await AffiliateService.getAffiliateMetrics("1");

    expect(repository.findMetrics).toHaveBeenCalledWith("1");
    expect(result).toEqual(metrics);
  });
});
