import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/common/SEO";
import AffiliateForm from "./AffiliateForm";
import AffiliateShareButtons from "./AffiliateShareButtons";
import type { AffiliateLink } from "./types";
import { affiliateCopy } from "./affiliateCopy";
import { AffiliateService } from "./service";
import { getCurrentAffiliateUser, logoutAffiliate } from "./auth";

const AffiliateLanding = () => {
  const [createdLink, setCreatedLink] = useState<AffiliateLink | null>(null);
  const [user, setUser] = useState(getCurrentAffiliateUser());
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getCurrentAffiliateUser());
  }, []);

  const handleCreateLink = async (input: Parameters<typeof AffiliateService.createAffiliateLink>[0]) => {
    if (!user) {
      navigate("/affiliate/login");
      return;
    }
    const link = await AffiliateService.createAffiliateLink(input, user.id);
    setCreatedLink(link);
  };

  const handleLogout = () => {
    logoutAffiliate();
    setUser(null);
  };

  return (
    <Layout>
      <SEO title="Tantra Movement Affiliate Partners" description={affiliateCopy.pageDescription} />

      <section className="relative overflow-hidden px-6 py-24 sm:py-28 bg-[#592C66] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_35%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_20%)] blur-3xl" />
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[3rem] border border-white/10 bg-slate-950/90 p-12 shadow-[0_32px_120px_-52px_rgba(0,0,0,0.75)] sm:p-16">
            <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr]">
              <div className="space-y-6 text-white">
                <span className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/80 shadow-sm backdrop-blur-sm">
                  Partner program
                </span>
                <h1 className="text-4xl font-display font-bold tracking-tight sm:text-5xl">
                  {affiliateCopy.pageTitle}
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-white/70">{affiliateCopy.pageDescription}</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Simple flow</p>
                    <p className="mt-3 text-sm leading-6 text-white/65">Enter a target page, add your partner ID, then copy and share your referral link.</p>
                  </div>
                  <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Root domain sharing</p>
                    <p className="mt-3 text-sm leading-6 text-white/65">The generated link stays on tantramovement.com so the experience feels seamless and authentic.</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-2xl shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.24em] text-primary">How to use</p>
                <div className="mt-6 space-y-4 text-sm leading-7 text-white/70">
                  <p>Use a Tantra Movement page URL or path from tantramovement.com, then add your affiliate code. The system will generate a shareable promo link instantly.</p>
                  <p>After creation, copy the link and choose an app to share: email, WhatsApp, Facebook, X, LinkedIn, Telegram, or SMS.</p>
                  <p>Keep your invitation gentle and aligned with the brand voice. This is about conscious collaboration, not hard selling.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_0.95fr]">
            <div className="rounded-[2rem] border border-white/10 bg-[#2c1441]/95 p-10 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.6)]">
              <h2 className="text-2xl font-semibold text-white">Build your affiliate link</h2>
              <p className="mt-4 text-white/70">Create the link you want to promote, then share it with aligned friends and collaborators.</p>
              {user ? (
                <AffiliateForm onSubmit={handleCreateLink} />
              ) : (
                <div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 text-white/80">
                  <p className="text-lg font-semibold text-white">Partner access required</p>
                  <p className="mt-3 text-sm text-white/80">Sign in or create a partner account to manage your referral links and dashboard.</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to="/affiliate/login" className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">Sign in</Link>
                    <Link to="/affiliate/signup" className="inline-flex rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Create account</Link>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#2c1441]/95 p-10 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.6)]">
              <h2 className="text-2xl font-semibold text-white">Why this works</h2>
              <div className="mt-4 space-y-5 text-white/75">
                <div className="rounded-3xl bg-white/5 p-4 border border-white/10">
                  <p className="font-semibold text-white">One referral link, many channels</p>
                  <p className="mt-2 text-sm text-white/70">Create a link once and share it wherever your community gathers.</p>
                </div>
                <p className="text-sm text-white/75">Your affiliate ID stays attached to the referral link so you receive proper credit for each introduction.</p>
                <p className="text-sm text-white/75">Designed for calm, ethical sharing with friends who are already curious about Tantra Movement.</p>
              </div>
            </div>
          </div>

          {createdLink ? (
            <div className="mt-10 rounded-[2rem] border border-white/10 bg-[#2c1441]/95 p-10 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.6)]">
              <h2 className="text-2xl font-semibold text-white">Your shareable referral link</h2>
              <p className="mt-3 text-white/70">Copy or choose a channel to send this link now.</p>
              <div className="mt-8">
                <AffiliateShareButtons
                  link={createdLink.url}
                  label={createdLink.description}
                  message={`I’m inviting you to explore Tantra Movement through a gentle partner referral: ${createdLink.description}`}
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </Layout>
  );
};

export default AffiliateLanding;
