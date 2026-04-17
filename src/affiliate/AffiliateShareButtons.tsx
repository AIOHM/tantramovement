import { useMemo, useState } from "react";
import {
  Copy,
  Share2,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  MessageSquare,
} from "lucide-react";

export type AffiliateShareButtonsProps = {
  link: string;
  label: string;
  message: string;
  onShare?: () => void;
};

const AffiliateShareButtons = ({ link, label, message, onShare }: AffiliateShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const nativeShareSupported = typeof navigator !== "undefined" && "share" in navigator;

  const encodedLink = encodeURIComponent(link);
  const encodedMessage = encodeURIComponent(`${message}\n\n${link}`);
  const subject = encodeURIComponent(label);

  const shareItems = useMemo(
    () => [
      {
        name: "Email",
        href: `mailto:?subject=${subject}&body=${encodedMessage}`,
        icon: Mail,
      },
      {
        name: "WhatsApp",
        href: `https://api.whatsapp.com/send?text=${encodedMessage}`,
        icon: MessageCircle,
      },
      {
        name: "Facebook",
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`,
        icon: Facebook,
      },
      {
        name: "X",
        href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodedLink}`,
        icon: Twitter,
      },
      {
        name: "LinkedIn",
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`,
        icon: Linkedin,
      },
      {
        name: "Telegram",
        href: `https://t.me/share/url?url=${encodedLink}&text=${encodeURIComponent(message)}`,
        icon: MessageCircle,
      },
      {
        name: "SMS",
        href: `sms:?body=${encodedMessage}`,
        icon: MessageSquare,
      },
    ],
    [encodedLink, encodedMessage, message, subject]
  );

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(link);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = link;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      onShare?.();
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleNativeShare = async () => {
    if (!nativeShareSupported) {
      return;
    }

    try {
      await navigator.share({
        title: label,
        text: message,
        url: link,
      });
    } catch {
      // ignore share cancellation
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-primary/20 bg-background/80 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">Share your link</p>
            <p className="mt-2 text-sm leading-6 text-foreground/75">Copy it or choose one of the apps below to share it instantly.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-primary/5"
            >
              <Copy className="h-4 w-4" />
              {copied ? "Copied" : "Copy link"}
            </button>
            {nativeShareSupported ? (
              <button
                type="button"
                onClick={handleNativeShare}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-4 rounded-3xl border border-primary/10 bg-card p-4">
          <p className="text-sm text-secondary">Referral URL</p>
          <p className="mt-2 break-all text-sm text-foreground">{link}</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {shareItems.map(({ name, href, icon: Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => onShare?.()}
            className="inline-flex items-center gap-2 rounded-3xl border border-primary/20 bg-card px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:bg-primary/5"
          >
            <Icon className="h-4 w-4" />
            {name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default AffiliateShareButtons;
