import LoadingRitual from "@/components/common/LoadingRitual";
import AffiliateShareButtons from "./AffiliateShareButtons";
import { AffiliateService } from "./service";
import type { AffiliateLink, AffiliateMetrics } from "./types";

export type AffiliateDashboardProps = {
  links: AffiliateLink[];
  loading: boolean;
  metrics?: Record<string, AffiliateMetrics>;
};

const AffiliateDashboard = ({ links, loading, metrics }: AffiliateDashboardProps) => {
  if (loading) {
    return (
      <div className="flex min-h-[240px] items-center justify-center rounded-3xl border border-white/10 bg-[#3f1d52]/95 p-8 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.65)]">
        <LoadingRitual size="sm" text="Loading partner performance…" />
      </div>
    );
  }

  if (!links.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#3f1d52]/95 p-10 text-center shadow-[0_20px_60px_-28px_rgba(0,0,0,0.65)]">
        <p className="text-lg font-semibold text-white">No affiliate links yet</p>
        <p className="mt-3 text-sm leading-7 text-white/75">
          Create your first referral link to begin tracking partner performance for aligned friends, collaborators, and community allies.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-[#3f1d52]/95 p-6 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.65)]">
        <h2 className="text-2xl font-semibold text-white">Your referral links</h2>
        <p className="mt-2 text-sm text-white/75">Each link can be copied or shared through a channel that feels right for your community.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {links.map((link) => (
          <div key={link.id} className="rounded-3xl border border-white/10 bg-[#301446]/95 p-6 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.65)]">
            <h3 className="text-lg font-semibold text-white">{link.description}</h3>
            <p className="mt-3 text-sm text-white/70 break-all">{link.url}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-white/50">
              Created {new Date(link.createdAt).toLocaleDateString()}
            </p>
            {metrics?.[link.id] ? (
              <div className="mt-4 grid gap-2 rounded-2xl bg-white/5 border border-white/10 p-4 text-sm text-white/80 sm:grid-cols-2">
                <div>Shares: {metrics[link.id].shares}</div>
                <div>Copies: {metrics[link.id].copies}</div>
                <div>Clicks: {metrics[link.id].clicks}</div>
                <div>Conversions: {metrics[link.id].conversions}</div>
                <div className="sm:col-span-2">Revenue: ${metrics[link.id].revenue.toFixed(2)}</div>
              </div>
            ) : (
              <p className="mt-4 text-sm text-white/60">Performance data not available yet.</p>
            )}
            <div className="mt-6">
              <AffiliateShareButtons
                link={link.url}
                label={link.description}
                message={`Discover Tantra Movement with a gentle invitation: ${link.description}`}
                onShare={async () => {
                  await AffiliateService.recordShare(link.id, "share");
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffiliateDashboard;
