import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/common/SEO";
import AffiliateDashboard from "./AffiliateDashboard";
import AffiliateForm from "./AffiliateForm";
import AffiliateShareButtons from "./AffiliateShareButtons";
import { AffiliateService } from "./service";
import { getCurrentAffiliateUser, logoutAffiliate } from "./auth";
import type { AffiliateLink, AffiliateMetrics } from "./types";

const AffiliateDashboardPage = () => {
  const [links, setLinks] = useState<AffiliateLink[]>([]);
  const [metrics, setMetrics] = useState<Record<string, AffiliateMetrics>>({});
  const [createdLink, setCreatedLink] = useState<AffiliateLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState(getCurrentAffiliateUser());

  useEffect(() => {
    setUser(getCurrentAffiliateUser());
  }, []);

  useEffect(() => {
    const loadAffiliateData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);

      try {
        const fetchedLinks = await AffiliateService.getAffiliateLinks(user.id);
        setLinks(fetchedLinks);

        const metricEntries = await Promise.all(
          fetchedLinks.map(async (link) => {
            const result = await AffiliateService.getAffiliateMetrics(link.id);
            return [link.id, result] as const;
          })
        );

        setMetrics(Object.fromEntries(metricEntries));
      } catch (err) {
        console.error(err);
        setError("Unable to load affiliate performance data at this time.");
      } finally {
        setLoading(false);
      }
    };

    loadAffiliateData();
  }, [user]);

  const handleCreateLink = async (input: Parameters<typeof AffiliateService.createAffiliateLink>[0]) => {
    if (!user) {
      return;
    }

    const link = await AffiliateService.createAffiliateLink(input, user.id);
    const newMetrics = await AffiliateService.getAffiliateMetrics(link.id);
    setCreatedLink(link);
    setLinks((prevLinks) => [link, ...prevLinks]);
    setMetrics((prevMetrics) => ({ ...prevMetrics, [link.id]: newMetrics }));
  };

  return (
    <Layout>
      <SEO
        title="Affiliate Dashboard"
        description="View your Tantra Movement partner referral links and performance metrics."
      />
      <section className="w-full min-h-screen px-6 pt-24 pb-16 bg-[#592C66] text-white">
        <div className="mx-auto max-w-6xl relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#4f2b68]/95 p-10 shadow-[0_24px_80px_-38px_rgba(0,0,0,0.7)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),transparent_40%)]" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between relative">
            <div>
              <h1 className="text-4xl font-display font-bold text-white">Affiliate partner dashboard</h1>
              <p className="mt-4 text-lg leading-8 text-white/70">
                Review your referral links and see how your partner invitations are performing across the root-domain experience.
              </p>
            </div>
            {user ? (
              <button
                type="button"
                onClick={() => {
                  logoutAffiliate();
                  window.location.href = "/affiliate";
                }}
                className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Sign out
              </button>
            ) : null}
          </div>
          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
        </div>

        {!user ? (
          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/10 p-10 text-white/80">
            <h2 className="text-2xl font-semibold text-white">Partner access required</h2>
            <p className="mt-3 text-sm text-white/75">Sign in or create a partner account to view your referral links and analytics.</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link to="/affiliate/login" className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">Sign in</Link>
              <Link to="/affiliate/signup" className="inline-flex rounded-full border border-primary/20 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-primary/5">Create account</Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 space-y-10">
            <div className="rounded-[2rem] border border-white/10 bg-[#3f1d52]/95 p-10 shadow-[0_24px_80px_-38px_rgba(0,0,0,0.7)]">
              <h2 className="text-3xl font-semibold text-white">Create a partner referral link</h2>
              <p className="mt-3 text-white/75">Enter your destination, affiliate ID, and invitation copy. The generated link will include your chosen ID in the query string.</p>
              <div className="mt-8">
                <AffiliateForm onSubmit={handleCreateLink} />
              </div>
            </div>

            {createdLink ? (
              <div className="rounded-[2rem] border border-white/10 bg-[#301446]/95 p-8 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.65)]">
                <h3 className="text-2xl font-semibold text-white">Link created</h3>
                <p className="mt-3 text-white/75">Your new referral link is ready to share.</p>
                <div className="mt-6 space-y-4">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/70 break-all">{createdLink.url}</div>
                  <AffiliateShareButtons
                    link={createdLink.url}
                    label={createdLink.description}
                    message={`Discover Tantra Movement with a gentle invitation: ${createdLink.description}`}
                  />
                </div>
              </div>
            ) : null}

            <div className="rounded-[2rem] border border-white/10 bg-[#3f1d52]/95 p-10 shadow-[0_24px_80px_-38px_rgba(0,0,0,0.7)]">
              <AffiliateDashboard links={links} loading={loading} metrics={metrics} />
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default AffiliateDashboardPage;
