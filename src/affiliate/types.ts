export type AffiliateUser = {
  id: string;
  name: string;
  email: string;
  affiliateId: string;
  createdAt: string;
};

export type AffiliateLink = {
  id: string;
  ownerId: string;
  url: string;
  description: string;
  createdAt: string;
  status: "active" | "pending";
};

export type AffiliateLinkInput = {
  url: string;
  affiliateId: string;
  description: string;
};

export type AffiliateMetrics = {
  shares: number;
  copies: number;
  clicks: number;
  conversions: number;
  revenue: number;
};
