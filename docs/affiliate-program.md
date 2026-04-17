# Affiliate Program Integration for Tantra Movement

## Overview
This document describes the integration of the Sellify Partners affiliate program into the Tantra Movement website. The integration should enable partner onboarding, referral link tracking, and partner reporting, while preserving the brand’s spiritual, inclusive, and trauma-aware identity.

## Scope
- Integrate Sellify Partners as the affiliate/referral backend.
- Add partner signup and partner dashboard UI.
- Add affiliate landing page content in site style.
- Add brand-aligned rules for partner copy and disclosure.
- Keep affiliate features consistent with the existing Tantra Movement site design.
- Ensure the affiliate flow is served from the production root domain `https://tantramovement.com`, not from a staging or local subdomain.

## Requirements
- Use Sellify Partners for referral tracking and link generation.
- Enable partner onboarding with a guided application or signup flow.
- Show partner performance metrics like referrals, conversions, and payout status.
- Maintain a gentle, ethical brand voice through all affiliate pages.
- Ensure any affiliate landing pages include clear disclosure and ethical context.
- Generate referral links with the production origin `https://tantramovement.com`.
- If WordPress occupies the root `/` on the same server, host the affiliate UI under a dedicated path such as `/affiliate` or `/partners` and configure the webserver to proxy or rewrite traffic to the affiliate application without exposing the subdomain.

## Brand Alignment Rules
- Tone: warm, supportive, conscious, and non-salesy.
- Language: use words like "support", "share", "invite", and "collaborate".
- Visuals: match existing site palette, soft layouts, balanced whitespace.
- Avoid aggressive CTAs and high-pressure affiliate language.
- Any new copy should be reviewed against current Tantra Movement branding.

## Implementation Plan
1. Install or integrate the Sellify Partners package.
2. Add a `src/affiliate/` feature area for partner onboarding, referral tracking, and reporting.
3. Build a partner signup flow that matches current UI conventions.
4. Add a brand-aligned affiliate landing page explaining the program.
5. Add a partner dashboard or admin view for affiliate performance.
6. Use a centralized affiliate origin helper and `VITE_AFFILIATE_ORIGIN` so production referral URLs resolve from `https://tantramovement.com`.
7. If WP is installed at the root domain, serve affiliate pages under a dedicated path such as `/affiliate` or `/partners` and configure the webserver to proxy those requests to the affiliate application.
8. Review all copy for brand alignment and trauma-aware language.
9. Document the integration in `docs/affiliate-program.md`.

## Notes
- This integration should feel like an extension of the Tantra Movement journey, not a separate merchant experience.
- Affiliate partners are collaborators on conscious growth, not just sales agents.
- Keep the referral experience respectful and aligned with the site’s values.
