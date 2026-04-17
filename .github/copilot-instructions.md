# Copilot Instructions for Tantra Movement Affiliate Integration

## Project overview
- Purpose: integrate Sellify Partners affiliate/referral program into the Tantra Movement website.
- Target repo: `/home/ohm/DEV/ttc.tantramovement.com.local`
- Reference package: https://github.com/sellify/partners
- This should be a brand-aligned integration, not a generic affiliate network experience.

## Key objectives
- Add partner onboarding and referral link generation.
- Add a partner/affiliate dashboard or reporting UI.
- Add brand-aligned landing content and disclosures.
- Track referrals through Sellify Partners and store partner metadata securely.

## Brand alignment rules
- Keep the tone gentle, supportive, inclusive, and trauma-aware.
- Avoid salesy or transactional language such as "earn now", "make money fast", "limited time", or "click here to profit".
- Refer to partners as "collaborators", "friends", or "community allies." Use language like "share the practice", "support the work", and "invite others into conscious growth." 
- Use site-consistent visual styling, spacing, and typography.
- Ensure affiliate content does not feel invasive or disruptive to the existing Tantra Movement identity.

## Developer guidance
- Use existing front-end conventions from `src/` and avoid introducing a separate marketing-style layer.
- Prefer lightweight, accessible UI components and avoid heavy, flashy affiliate widgets.
- Keep any new copy consistent with existing site voice and page structure.
- If the site uses Supabase or backend services for user data, extend those safely rather than creating separate data silos.
- Use `VITE_AFFILIATE_ORIGIN` to centralize production affiliate URL generation, defaulting to `https://tantramovement.com`.
- Ensure production affiliate links are generated for the root domain and not for `ttc.tantramovement.com` or other staging hosts.
- If WordPress is installed at `tantramovement.com`, serve affiliate pages under a dedicated root-domain path such as `/affiliate` and route that path to the affiliate app via reverse proxy or subdirectory mapping.
- Document the integration clearly in `docs/affiliate-program.md` and keep instructions updated.

## What to watch for
- Do not hardcode affiliate program text or branding that conflicts with Tantra Movement.
- Do not add overtly commercial or pushy CTAs.
- Do not skip brand-review language for partner-facing copy.
- Keep affiliate flows contained behind the site’s existing navigation and styling.

## References
- `docs/affiliate-program.md`
- `.github/instructions/specs/affiliate/*`
- `src/` front-end conventions in the existing project
