# Risks.md - Risk Awareness

## Known Weaknesses
- Dependency on Supabase for backend; if it has downtime, app is affected.
- AI-generated code may have subtle bugs not caught in initial testing.
- Single developer; no team redundancy.

## Known Assumptions
- Target users will adopt the product as defined in PRD.
- Supabase will handle expected load without issues.
- No major security breaches in initial launch.

## Known Shortcuts
- Minimal unit testing in early phases; relying on E2E testing.
- Using default Supabase auth UI; may need customization later.
- No internationalization; assuming English-only market initially.

[Update this file as new risks are identified or mitigated.]