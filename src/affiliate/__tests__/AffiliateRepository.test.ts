import { describe, it, expect, vi, beforeEach } from "vitest";
import { AffiliateRepository } from "../repository";
import { AffiliateClient } from "../affiliateClient";

const createAffiliateLink = vi.fn();
const getAffiliateLinks = vi.fn();
const getAffiliateMetrics = vi.fn();
const incrementMetrics = vi.fn();

vi.mock("../affiliateClient", () => ({
  AffiliateClient: vi.fn().mockImplementation(() => ({
    createAffiliateLink,
    getAffiliateLinks,
    getAffiliateMetrics,
    incrementMetrics,
  })),
}));

describe("AffiliateRepository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls AffiliateClient.createAffiliateLink on save", async () => {
    const mockClient = new AffiliateClient();
    const createAffiliateLinkMock = (mockClient.createAffiliateLink as unknown) as vi.Mock;
    createAffiliateLinkMock.mockResolvedValue(undefined);

    await AffiliateRepository.save({
      id: "1",
      ownerId: "owner-1",
      url: "https://tantramovement.com/affiliate/test",
      description: "Test",
      createdAt: new Date().toISOString(),
      status: "active",
    });

    expect(createAffiliateLinkMock).toHaveBeenCalledTimes(1);
  });

  it("calls AffiliateClient.getAffiliateLinks on findAll", async () => {
    const mockClient = new AffiliateClient();
    const getAffiliateLinksMock = (mockClient.getAffiliateLinks as unknown) as vi.Mock;
    getAffiliateLinksMock.mockResolvedValue([]);

    const result = await AffiliateRepository.findAll("owner-1");

    expect(getAffiliateLinksMock).toHaveBeenCalledTimes(1);
    expect(getAffiliateLinksMock).toHaveBeenCalledWith("owner-1");
    expect(result).toEqual([]);
  });

  it("calls AffiliateClient.getAffiliateMetrics on findMetrics", async () => {
    const mockClient = new AffiliateClient();
    const getAffiliateMetricsMock = (mockClient.getAffiliateMetrics as unknown) as vi.Mock;
    getAffiliateMetricsMock.mockResolvedValue({ shares: 0, copies: 0, clicks: 0, conversions: 0, revenue: 0 });

    const result = await AffiliateRepository.findMetrics("1");

    expect(getAffiliateMetricsMock).toHaveBeenCalledWith("1");
    expect(result).toEqual({ shares: 0, copies: 0, clicks: 0, conversions: 0, revenue: 0 });
  });
});
