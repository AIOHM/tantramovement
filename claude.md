# Claude.md - The Law File

## Core Philosophy
We build aiohm.app as a structured SaaS product using AI as a tool under strict human control. AI executes within defined constraints; humans decide architecture, scope, and abstractions. This ensures fast shipping, maintainable code, and scalable growth.

## Tech Stack Allow & Deny Lists
### Allowed Technologies
- Frontend: React (with TypeScript), Vite, Tailwind CSS
- Backend: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- State Management: React hooks, Context API (no Redux unless approved)
- Testing: Vitest, Playwright for E2E
- Deployment: Vercel or similar (to be decided)

### Denied Technologies
- No Vue.js, Angular, or other frameworks
- No raw CSS; use Tailwind only
- No Firebase (use Supabase)
- No GraphQL unless absolutely necessary
- No server-side rendering unless for SEO-critical pages

## Architecture Rules
- Use component-based architecture with clear separation of concerns
- Backend logic lives in Supabase Edge Functions or client-side with Supabase client
- No monolithic components; break down into reusable parts
- Follow atomic design principles for UI components

## File & Naming Conventions
- Files: kebab-case for components (e.g., `user-profile.tsx`), camelCase for utilities
- Components: PascalCase (e.g., `UserProfile.tsx`)
- Folders: lowercase with hyphens (e.g., `user-management/`)
- Hooks: `use` prefix (e.g., `useAuth.ts`)
- Constants: UPPER_SNAKE_CASE

## UI Discipline
- Use Tailwind for all styling; no custom CSS
- Consistent color palette and spacing from design system
- Responsive design mandatory
- Accessibility: Use semantic HTML, ARIA where needed
- No inline styles

## Backend Discipline
- All data operations through Supabase client
- Use Row Level Security (RLS) for all tables
- Edge Functions for complex logic, keep them lightweight
- No direct database queries from client

## Security Guardrails
- Never store secrets in client code
- Use Supabase Auth for authentication
- Validate all inputs on client and server
- Implement proper error handling without exposing sensitive info
- Regular security audits

## Error Handling Rules
- Use try-catch in async functions
- Display user-friendly error messages
- Log errors to console or monitoring service
- Graceful degradation for network failures

## Auth & Permissions Rules
- Supabase Auth handles user management
- Role-based access: user, admin, etc.
- Check permissions before rendering UI elements
- Secure API calls with JWT tokens

## Phase Execution Rules
- Follow the phased approach in tasks.md
- Do not skip phases
- Complete all tasks in a phase before moving to next
- Review and approve AI outputs before committing

## Role-Based Agent System
- Product Architect: Defines features and UX
- Backend Architect: Designs data models and APIs
- Frontend Engineer: Implements UI components
- AI Systems Agent: Handles integrations and automation
- QA / Breaker Agent: Tests and finds vulnerabilities

## STOP / ASK Rule
If any instruction conflicts with this file, AI must STOP and ASK for clarification. Do not proceed with conflicting actions.