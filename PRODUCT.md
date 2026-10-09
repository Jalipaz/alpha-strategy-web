# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are B2B companies and founders/owners — mainly SMBs across the United States, Spain, Brazil, and Latin America — who need business strategy, digital marketing, or help expanding into new markets. A secondary audience of individual professionals exists (personal branding, LinkedIn optimization, business English training) but the site should read as B2B-first.

## Product Purpose

Alpha Strategy Group is an international consulting firm that drives measurable business growth by integrating three dimensions: business strategy & consulting, digital marketing, and professional development. Success for a visitor means recognizing a credible, premium, multi-market consulting partner and reaching out (contact form, email, or WhatsApp).

## Positioning

"We don't just build brands — we build opportunities." The firm's differentiator is the integrated triple focus (strategy + marketing + professional development) delivered across four markets (US, Spain, Brazil, Latin America) with trilingual service (EN/ES/PT) — a combination a single-discipline agency or freelancer could not credibly replicate.

## Operating Context

- Headquartered in Miami (2 S Biscayne Blvd, Suite 3200 #4784, Miami, FL 33131), with active reach in the US, Spain, Brazil, and Latin America.
- Methodology: Diagnosis → Strategy → Execution → Optimization → Scaling.
- Services: Strategy & Consulting, Digital Marketing, Automation & Sales, Business Expansion, Professional Development, Language Training (business English) — plus a Web Design & Development offering (custom sites, mobile-first, SEO, bilingual-ready).
- Contact channels: contact form (EmailJS), direct email (info@alphastrategygroupusa.com), WhatsApp (+591 75025505).
- Existing stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion, next-intl (en/es/pt), lucide-react icons, EmailJS for form submission.
- Existing routes: `/` (home), `/about`, `/services`, `/contact`, all under `app/[locale]/`.

## Capabilities and Constraints

- Trilingual site (English, Spanish, Portuguese) via next-intl — all new copy must have EN/ES/PT translations in `messages/*.json`.
- Contact form submission depends on EmailJS (service/template/public key are hardcoded client-side in `contact/page.tsx`) — preserve this integration unless the user asks to change it.
- No company logo asset currently exists in `public/` — only default Next.js placeholder SVGs.

## Brand Commitments

- Firm name: Alpha Strategy Group.
- Tagline / voice line used verbatim across the site: "We don't just build brands. We build opportunities."
- Trilingual identity (EN/ES/PT) is a binding brand commitment, not just a feature.

## Evidence on Hand

- No real client logos, testimonials, case studies, or press exist yet, and none should be fabricated for the redesign — confirmed with the user.
- Stats on the current homepage (4+ Markets, 100+ Clients, 5 Service Pillars) are real/approved figures and must be preserved exactly in any redesign.

## Product Principles

- Integrated triple focus (strategy, marketing, professional development) is the core differentiator — never present these as separate, unrelated offerings.
- B2B credibility first: the site should primarily read as a serious, premium consulting partner for companies, with professional-development/training services positioned as an adjacent strength, not the headline.
- Multi-market, trilingual reach is proof of scale — surface the four-market, three-language story rather than treating it as a footnote.
- No fabricated social proof: real stats stay, but no invented logos/testimonials/case studies.

## Accessibility & Inclusion

No product-specific accessibility requirement has been established beyond standard web accessibility practice.
