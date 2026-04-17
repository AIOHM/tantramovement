# Affiliate Feature Documentation

## Overview
The `src/affiliate/` feature implements a root-domain-focused affiliate experience for Tantra Movement.
It supports affiliate link creation, partner referral copy, and metrics display using a custom affiliate backend integration.

## Structure
- `AffiliateForm.tsx` — UI for creating partner affiliate links.
- `AffiliateDashboard.tsx` — Presentation component for listing affiliate links and metrics.
- `AffiliateDashboardPage.tsx` — Page-level component that loads affiliate data from the service layer.
- `service.ts` — Business logic for creating link entries and fetching affiliate data.
- `repository.ts` — Data access layer that proxies requests to `AffiliateClient`.
- `affiliateClient.ts` — Backend integration wrapper for the custom affiliate platform.
- `types.ts` — Shared affiliate type definitions.
- `affiliateCopy.ts` — Brand-aligned copy strings for affiliate pages.

## Component Usage

### `AffiliateForm`
Use `AffiliateForm` when you need a partner link creation form.

Props:
- `onSubmit: (data: AffiliateLinkInput) => Promise<void>`

Example:

```tsx
<AffiliateForm onSubmit={AffiliateService.createAffiliateLink} />
```

The component validates:
- required URL/path
- required description
- URL must begin with `/`, `http://`, or `https://`

### `AffiliateDashboard`
Use `AffiliateDashboard` to display links and performance metrics.

Props:
- `links: AffiliateLink[]`
- `loading: boolean`
- `metrics?: Record<string, AffiliateMetrics>`

Example:

```tsx
<AffiliateDashboard links={links} loading={loading} metrics={metrics} />
```

If `loading` is true, the component shows a loading ritual.
If there are no links, it shows a brand-aligned empty state.

## Service API

### `AffiliateService.createAffiliateLink(data)`
Creates a new affiliate link entry.
- Normalizes URLs to the production root domain using `src/lib/affiliate.ts`.
- Calls `AffiliateRepository.save` to persist the link.

### `AffiliateService.getAffiliateLinks()`
Fetches all affiliate link entries.

### `AffiliateService.getAffiliateMetrics(linkId)`
Fetches performance metrics for a specific link.

## Repository API

### `AffiliateRepository.save(link)`
Persists affiliate links by forwarding data to the custom affiliate platform via `AffiliateClient.createAffiliateLink()`.

### `AffiliateRepository.findAll()`
Returns all affiliate links from the custom affiliate platform via `AffiliateClient.getAffiliateLinks()`.

### `AffiliateRepository.findMetrics(linkId)`
Returns affiliate metrics from the custom affiliate platform via `AffiliateClient.getAffiliateMetrics(linkId)`.

## Environment Variables
- `VITE_AFFILIATE_ORIGIN` — production root-domain origin for affiliate links (default: `https://tantramovement.com`).

## Routing
- `/affiliate` — landing page for affiliate partner onboarding and link creation.
- `/affiliate/dashboard` — dashboard page for affiliate link performance.

## Notes
The current affiliate integration is implemented through `AffiliateClient` as a wrapper.
It can be extended with real request validation, error handling, and application-level authentication.
