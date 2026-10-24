# Audit Report

Branch: `feature/production-readiness` (baseline commit `e4f8573`, on top of `master` @ `62ac77f`).
Date: 2026-10-24.

**Method.** Findings marked **[verified]** were confirmed by reading the code or running a command in this repo. Findings marked **[unverified]** are suspected but not yet checked. Nothing here was assumed from the project description.

## 1. Architecture (verified)

- Next.js 16.0.10 (App Router), React 19, TypeScript, Tailwind 3, Radix (checkbox, dialog, label, radio-group, slot), Redux Toolkit, react-toastify.
- Build uses `next build --webpack` because `next.config.ts` has a custom webpack config (Turbopack errors otherwise).
- Routing: `src/app/[locale]/...` with `en`/`ar`; `src/middleware.ts` redirects locale-less paths using `Accept-Language`. Next 16 warns that the `middleware` convention is deprecated in favour of `proxy`.
- Data: Prisma 6.19 + MySQL (Aiven). `src/lib/prisma.ts` uses the standard global-singleton pattern.
- Server data access: `src/server/db/products.ts` wraps queries in a custom `cache` (`revalidate: 3600`).
- Endpoints: `POST /api/orders`, `POST /api/openai`, `GET /api/test`.
- Pages: Home, Menu, Product `[id]`, Cart (+checkout form), About, Contact.
- Not present: authentication, admin area, order tracking, order confirmation page, tests, CI/CD, `sitemap`/`robots`.

## 2. Functional status

| Area | Status | Evidence |
|---|---|---|
| Browse menu / categories | Works | renders DB data |
| Product customization (size/extras) | Works but fragile | `add-to-cart.tsx`; see P1-3 |
| Cart add/remove/qty | **Buggy** | P0-3 |
| Checkout submit | Creates an order, **insecurely** | P0-1, P0-2 |
| Order confirmation | **Missing** (toast only) | `checkout.tsx` |
| Order tracking | **Missing** | no route |
| Admin / kitchen / staff auth | **Missing** | no route, no auth lib |
| Contact form | **Non-functional** | `<form>` at `Contact/index.tsx:107` has no `onSubmit`/`action` |
| AI assistant | Calls `/api/openai` | no rate limit, no grounding in menu data (P1-6) |
| Tests / CI | **None** | no test files, no `.github/` |

## 3. Issues

### P0 — Critical

- **P0-1 Client-trusted prices.** `POST /api/orders` stores `subTotal` and `totalPrice` exactly as sent by the browser. Only the existence of product IDs is checked. Anyone can order for any price. [verified, `api/orders/route.ts`]
- **P0-2 Orders are marked `paid: true` at creation** with no payment taking place, and `deliveryFee` is hardcoded to `5.0` server-side. No server-side validation of email, phone, or address (values are passed straight to Prisma). The raw exception message is returned to the client with a 500. [verified]
- **P0-3 Cart identity is the product ID only.** `AddToCart` finds an existing line by `item.id`, so a second customization of the same product overwrites the first line's size/extras instead of creating a distinct line. `RemoveCartItem` and `RemoveItemFromForm` also act on product ID. Different combinations cannot coexist. [verified, `cartSlice.ts`]
- **P0-4 Order lines do not record size, extras, or price.** `OrderProduct` only stores `productId` and `quantity`; the customization the customer chose is lost, so staff cannot see it and history cannot be reconstructed. [verified, `schema.prisma`]
- **P0-5 Secret metadata leak.** `GET /api/test` publicly returns whether the OpenAI key exists, its length, and its first 7 characters. `POST /api/openai` also logs the key prefix and length, and logs full request bodies. [verified]
- **P0-6 Migration safety.** .gitignore had a /prisma/migrations/ rule. The one existing migration (`20250602224348_`) is tracked (force-added), so nothing is lost today, but any *new* migration would have been silently ignored by `git add`. *(Corrected during implementation: this was initially reported as untracked migrations; that was wrong. The ignore rule has been removed.)* Separately, the production schema was applied by `prisma db push`, so the DB has no `_prisma_migrations` record. A `migrate resolve` attempt earlier in this project hung and was cancelled, so the **baseline state of the production DB is unconfirmed**. [verified]
- **P0-7 Credential exposure in chat history.** A full Aiven connection string (including password) was pasted into the assistant conversation earlier in this project. **Rotate that password.** (Action for the owner; it cannot be done from the repo.)

### P1 — High

- **P1-1 Money stored as `Float`** (`basePrice`, `price`, order totals). Rounding errors are possible. Needs `Decimal` or integer minor units.
- **P1-2 Order lifecycle is a single `paid` boolean.** No fulfillment status, payment status, history, timestamps per step, tracking token, or fulfillment method (delivery vs pickup).
- **P1-3 Customization model is enum-based.** `Size.name` is `SMALL|MEDIUM|LARGE` and `Extra.name` is `CHEESE|BACON|TOMATO|ONION|PEPPER`, which cannot express a real menu (drinks, sides, other ingredients) without a schema change. The product dialog title is hardcoded to the English text "Pizza" (`add-to-cart.tsx:80`), the size `RadioGroup` uses `defaultValue="comfortable"` and the same `id` for every option, and the extras use a `RadioGroup` wrapper around checkboxes. `defaultSize!` is a non-null assertion that crashes if a product has no `SMALL` size. [verified]
- **P1-4 Cart line display shows only `basePrice`** (`items.tsx:77`), not the line total including size and extras, so the line price shown disagrees with the subtotal.
- **P1-5 Cart persisted in `sessionStorage`** and read at module load. It is written from the `Items` component only, so changes made elsewhere may not persist until the cart page renders. Stored prices can go stale with no re-validation at checkout. [verified]
- **P1-6 AI assistant** is a generic system prompt with `max_tokens: 100`, not grounded in the restaurant's data; no rate limiting or abuse protection, so it is a cost risk. The code also pulls in unused AI dependencies (`ai`, `@google/generative-ai`) [verified in `package.json`; usage of those packages not checked].
- **P1-7 No automated tests and no CI.** Nothing blocks a broken change from reaching Vercel (which deploys every push to `master`).
- **P1-8 No access control exists anywhere** because no staff features exist yet; any admin build must be authenticated server-side from the first commit.
- **P1-9 Best Sellers query is wrong.** `getBestSellers` filters products that have any order and sorts by `createdAt desc`, not by sales. The accurate version is commented out in the same file. [verified]

### P2 — Medium

- **P2-1** Lint: 1 error (`localizeExtraName` unused in `menu/details.tsx:15`), 6 warnings (raw `<img>` in `MenuItem.tsx`, `details.tsx`). `tsc --noEmit` reports 4 syntax errors, all inside generated `.next/dev/types/*` (stale generated output from an interrupted build), none in `src/`. [verified by running both]
- **P2-2** `vercel.json` rewrites every non-API route to `/` and pins `builds` with `@vercel/next`; this is unusual for a Next.js App Router project and may be unnecessary or harmful. [verified content; effect unverified]
- **P2-3** `next-env.d.ts` and `*.tsbuildinfo` are ignored but exist locally; `tsconfig.json` was auto-modified by Next during builds.
- **P2-4** `env.example` is misnamed (should be `.env.example`), lists only `DATABASE_URL`, and `.gitignore` has `.env*`, which would also ignore a correctly named `.env.example`.
- **P2-5** Dependency audit: `npm install` reported 28 vulnerabilities (6 low, 4 moderate, 18 high). Not yet triaged; need `npm audit` review before any upgrade. `eslint-config-next` is pinned to 15.1.0 while Next is 16.0.10. `package.json` still has a `deploy` script targeting `gh-pages` that does not match the Vercel hosting. [verified]
- **P2-6** Currency/price formatting and locale-specific numbers for Arabic not yet reviewed. [unverified]
- **P2-7** `middleware.ts` locale detection ignores the `Accept-Language` quality values and doesn't persist a user choice. Minor.

### P3 — Optional

- Replace raw `<img>` with `next/image` where remote domains are whitelisted.
- Remove commented-out dead code in `products.ts` and the large commented seed block in `[locale]/page.tsx`.
- Rename/remove `issues.text`, `Preview Images/` if unused.

## 4. Not yet audited (to be done before the related phase)

Header/Navbar mobile behavior, Footer, About/Contact copy accuracy, `Hero`/`Offers`/`Specials` claims (the Offers bar contains marketing claims about "Delivery Guarantee" and "Safe Payments" that need to be backed by real policy or removed), full Arabic/RTL pass, accessibility pass, screenshots (no browser tooling has been run in this session), and Lighthouse/bundle measurements.

## 5. Business decisions required from the owner (not invented)

Delivery vs pickup availability, delivery zones/fee, minimum order, opening hours, accepted payment methods (and any online payment provider available in the merchant's country), cancellation policy, restaurant contact/address data, who the staff users are.
