# Implementation Plan

Branch: `feature/production-readiness`. `master` is not modified; merge only after review.
Each phase ends with: type-check, lint, build, and the tests that exist at that point. A phase is not "done" until those pass.

## Ground rules
- Preserve the visual identity (colors, fonts, layout). No restyling in Phases 2–6.
- DB changes are additive migrations, reviewed before applying. **Never** `migrate reset` or `db push --force-reset`. The production DB is only touched after a verified backup and explicit owner approval; development/CI use a separate database.
- No invented business data. Unknown values become settings.

## Phase 1 — Audit (done)
Deliverables: `AUDIT_REPORT.md`, this file.

## Phase 2 — Critical fixes (no schema change needed)
| Task | Files | Acceptance |
|---|---|---|
| Remove secret-leaking endpoint; stop logging keys/bodies | `api/test/route.ts`, `api/openai/route.ts` | `/api/test` gone or returns only `{ok:true}`; no key data in logs |
| Server computes prices; client totals ignored | `api/orders/route.ts`, new `src/lib/pricing.ts` | Tampered totals in request have no effect; unit tests prove it |
| Server-side validation (zod) for order payload | new `src/lib/validation/order.ts` | Invalid email/phone/qty/empty cart → 400 with field errors |
| Orders no longer created as `paid: true` | `api/orders/route.ts` | New orders are unpaid |
| Safe error responses | `api/orders/route.ts` | No raw exception text to client |
| Cart line identity = product + size + extras | `cartSlice.ts`, `add-to-cart.tsx`, `items.tsx`, `lib/cart.tsx` | Two customizations of one product are two lines; remove/qty act per line; unit tests |
| Cart line shows line total | `items.tsx` | Line price equals unit price × qty |
| Dialog title not hardcoded; radio/checkbox semantics; no `!` crash | `add-to-cart.tsx` | Product with no SMALL size doesn't crash |
| Lint error, `.env.example`, `.gitignore` for migrations | various | `eslint` 0 errors; migrations tracked |
| Contact form: either real endpoint or honest removal | `Contact/index.tsx` | No dead submit button — needs owner decision on delivery of messages (email/DB) |

Dependencies: add `zod`, `vitest` (justified: validation and tests).

## Phase 3 — Order domain (schema migration)
Additive Prisma migration: `Order` gets `fulfillmentStatus`, `paymentStatus`, `fulfillmentMethod`, `paymentMethod`, `trackingToken` (unique, random), `customerName`, `notes`, `idempotencyKey` (unique), timestamps; new `OrderStatusEvent`; `OrderProduct` gets name/size/extras/unit-price snapshots; money moves to `Decimal(10,2)`. Existing rows are backfilled by the migration (existing `paid` → `paymentStatus`). Status transitions in a pure, unit-tested module. Order creation in one transaction with idempotency. Confirmation page + tracking page (`/[locale]/orders/[token]`, polling).
Acceptance: migration applied cleanly to a **fresh test DB and to a copy of current data**; duplicate submit returns the same order; invalid transitions rejected.
Risk: schema change on the live DB — requires backup + owner sign-off before production apply.

## Phase 4 — Staff operations
Auth.js (credentials, bcrypt hashes) for staff; roles ADMIN/STAFF; server-side authorization on every admin route/action; order list/detail/status actions; kitchen view; product/category/size/extra management with archive instead of delete; restaurant settings table; minimal analytics with documented metric definitions.
Needs from owner: first admin account provisioning approach, opening hours, delivery/pickup policy.

## Phase 5 — Customer improvements
Menu search and URL-based category filter, availability flags, empty/loading states, edit-from-cart, optional customer accounts (guest checkout stays).

## Phase 6 — Payments & notifications
Cash on delivery/pickup first (no provider needed). Online payments only after the owner names a provider available in their country; webhook-verified, idempotent. Email notifications need an email provider decision.

## Phase 7 — UI/UX & i18n polish
Consistency pass within the existing design; RTL/Arabic pass; accessibility pass; responsive pass; replace unsupported marketing claims with real, configurable content.

## Phase 8 — Performance, security, tests
Measure first (build output, Lighthouse). Rate-limit `/api/openai` and `/api/orders`; ground the assistant in menu data. Playwright E2E for the full journey against a test DB.

## Phase 9 — CI/CD & production verification
`.github/workflows/ci.yml` (install → lint → typecheck → unit → integration (MySQL service) → E2E → build → `npm audit`), deploy workflow gated on CI, health endpoint, `CI_CD_REPORT.md`, `PRODUCTION_CHECKLIST.md`, backup/restore runbook. Actual workflow runs can only be verified once the branch is pushed to GitHub.

## Open blockers (need the owner)
1. Rotate the exposed Aiven password. 2. Confirm production DB state / allow baseline. 3. Business rules listed in the audit §5. 4. Payment provider and email provider choice. 5. GitHub push permission (earlier pushes needed the right account) and Vercel/GitHub secrets for CD.
