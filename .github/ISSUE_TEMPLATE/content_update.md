---
name: 📝 Content Update
about: Report incorrect, outdated, or missing content — speaker info, schedule, FAQs, sponsor details, copy errors, etc.
title: "content: "
labels: content
assignees: ""
---

<!--
  Use this template for content-only changes — no code logic involved.
  Examples: wrong speaker name, outdated FAQ answer, missing sponsor logo, broken image URL, typo in the CoC.
  For broken UI or layout issues, use the Bug Report template instead.
-->

## What content needs to change?

<!-- Be specific — which page, which section, and what exactly is wrong or missing. -->

**Page / Route:** e.g. `/schedule`, `/past-summits`, `/faqs`

**Section:** e.g. "2026 Speakers", "Tickets & Registration FAQs", "2025 Sponsor grid"

**Current content:**

<!-- Paste or describe what's currently on the site -->

**Correct content:**

<!-- What should it say / show instead? -->

## Which data file needs updating?

<!-- Check all that apply — see src/data/ -->

- [ ] `src/data/speakers.ts` — speaker profiles
- [ ] `src/data/sponsors.ts` — sponsor logos and tiers
- [ ] `src/data/faqs.ts` — FAQ questions and answers
- [ ] `src/data/summitData.ts` — past summit details and highlights
- [ ] `src/data/team.ts` — organising team members
- [ ] `src/data/tickets.ts` — ticket tiers _(requires developer review)_
- [ ] `src/data/benefits.ts` — attendance benefits
- [ ] `src/data/stats.ts` — summit metrics
- [ ] Static page content (Code of Conduct, Privacy Policy) _(requires developer review)_
- [ ] Not sure — please triage

## Supporting assets

<!--
  If this involves a new or updated image (speaker photo, sponsor logo):
  - Attach the image directly to this issue, OR
  - Share the Cloudinary URL if already uploaded

  Image requirements:
  - Speaker photos: square, minimum 400×400px, JPG or WebP, under 300KB
  - Sponsor logos: SVG preferred, transparent background, under 100KB
  See CONTENT_GUIDE.md for full image requirements.
-->

## Urgency

- [ ] 🔴 Urgent — affects a public-facing announcement or event deadline
- [ ] 🟡 Normal — should be fixed before next deployment
- [ ] 🟢 Low — nice to have, no time pressure

## Source / verification

<!--
  Where does the correct information come from?
  e.g. "Confirmed with speaker directly", "Updated from the event registration system", "Speaker submitted via form"
  This helps reviewers trust the change without needing to re-verify.
-->

## Additional context

<!-- Anything else the team should know. -->
