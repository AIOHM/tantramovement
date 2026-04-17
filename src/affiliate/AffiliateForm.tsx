import { useState, type FormEvent } from "react";
import type { AffiliateLinkInput } from "./types";

export type AffiliateFormProps = {
  onSubmit: (input: AffiliateLinkInput) => Promise<void>;
};

const AffiliateForm = ({ onSubmit }: AffiliateFormProps) => {
  const [url, setUrl] = useState("");
  const [affiliateId, setAffiliateId] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const trimmedUrl = url.trim();
    const trimmedAffiliateId = affiliateId.trim();
    const trimmedDescription = description.trim();

    if (!trimmedUrl || !trimmedAffiliateId || !trimmedDescription) {
      setError("Please enter a URL, your affiliate ID, and a short description.");
      return;
    }

    const validatePath = (value: string) => value.startsWith("/") || /^https?:\/\//i.test(value);
    if (!validatePath(trimmedUrl)) {
      setError("Please enter a valid URL or path that begins with /, http://, or https://.");
      return;
    }

    setLoading(true);

    try {
      await onSubmit({ url: trimmedUrl, affiliateId: trimmedAffiliateId, description: trimmedDescription });
      setSuccess("Partner link created. Use the share panel below to copy and promote your referral URL.");
      setUrl("");
      setAffiliateId("");
      setDescription("");
    } catch (submitError) {
      setError("Unable to create the affiliate link right now. Please try again later.");
      console.error(submitError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="rounded-3xl border border-primary/20 bg-card p-6 shadow-warm">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.22em] text-secondary">Partner link target</p>
          <p className="text-sm leading-6 text-foreground/75">
            Enter the path or full Tantra Movement page you want to promote, and add your affiliate ID so the link can be shared.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2" htmlFor="affiliate-url">
              Referral URL or path
            </label>
            <input
              id="affiliate-url"
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="/workshops, /teacher-course, or https://tantramovement.com/teacher-course"
              className="w-full rounded-xl border border-primary/20 bg-background/90 px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2" htmlFor="affiliate-id">
              Your affiliate ID
            </label>
            <input
              id="affiliate-id"
              type="text"
              value={affiliateId}
              onChange={(event) => setAffiliateId(event.target.value)}
              placeholder="your-partner-id"
              className="w-full rounded-xl border border-primary/20 bg-background/90 px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2" htmlFor="affiliate-description">
          Partner invitation description
        </label>
        <textarea
          id="affiliate-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Write a gentle invitation that feels aligned with Tantra Movement."
          className="w-full min-h-[140px] rounded-[1.5rem] border border-primary/20 bg-card px-4 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {success && <p className="text-sm text-secondary">{success}</p>}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
      >
        {loading ? "Saving…" : "Create partner link"}
      </button>
    </form>
  );
};

export default AffiliateForm;
