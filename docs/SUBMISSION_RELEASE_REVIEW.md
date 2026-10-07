# Underhive Duel 0.2.0 — recovered release review

**RECOVERED BUILD NOT READY** — browser and Docker execution gates remain blocked.

Audit date: 2026-10-07. No merge or deployment performed. This is a pre-release review; deployed verification is a later step, not a prerequisite for preparing this branch.

## Recovered provenance and production comparison

- Recovered branch: `release/ten-champions-0.2.0`.
- Recovered HEAD: `29922af9da092c053ebde93a8f363c3042fa2550`.
- Production `main`, freshly verified through GitHub: `3fd21ff4baf46b4dc8c89d321fc50228d80f68d2` (also the recovered commit's parent).
- Review branch: `release/0.2.0-ten-champion`, prepared locally. Not pushed, merged, or deployed.
- Recovered working tree was clean; ignored `docs/asset-proof/atlas-contact-sheet.svg` was present.
- All 345 original ZIP file entries match the salvage inventory SHA-256 values. Initial Git inspection refreshed the extracted `.git/index`; verification against the untouched ZIP confirms this is not an archive integrity failure.

## Verified audit results

| Gate | Observed result |
| --- | --- |
| Roster | Ten unique champions, including Shadowlurker, Votive, Pitjack and Ironhaul |
| Versions | package, roster rulesVersion and manifest rulesVersion/visualVersion are 0.2.0 |
| Release authority | `authority/releases/0.2.0/champions.json` equals public roster byte for byte; generated JS roster agrees through automated tests |
| Original six | Profiles, original atlas bytes and all 36 original manifest frame entries compared directly with production main and are unchanged |
| Frozen authority/UI/background | Hash-lock tests pass |
| New frames | All 24 required portrait/idle/strike/block/hit/defeat frames present; actual PNG hashes, dimensions, rectangles, pivots and masks verified |
| All sprite states | 60 nonempty frames; actual opaque-component checks found zero foreign or clipped component pixels across all 60; renderer call tests cover both facing directions |
| Static visual review | Existing 60-frame contact sheet inspected; no obvious neighboring-pose contamination or missing poses observed |
| Unit/integration tests | Fresh `npm test`: 53 passed, 0 failed, 0 skipped, on Node 24.19.0 |
| Ordered pairings | All 100 deterministic full-match pairing checks pass; these are completion tests, not balance estimates |
| HTTP multiplayer | 14 synchronized matches with mutual rematches pass; transport-module seat restore also passes |
| Balance screening | Fresh full 220,000-bout run, 55 unordered pairings × two resource conditions × two attacker roles × 1,000 samples; JSON reproduced byte for byte |
| 320/390/768/1280 | Mathematical arena geometry checks pass; actual browser layout and touch-control checks BLOCKED |
| Browser multiplayer/rematch | BLOCKED before launch; no browser match or rematch success claimed |
| Docker build/start/health | BLOCKED: Docker command and daemon unavailable |

Pixel checks use alpha > 128, matching the recovered measurement method. They do not substitute for live canvas/browser inspection. No physical-device test is claimed.

## Balance findings

The reproducible screen retains the documented new-champion mean non-mirror win rates: Shadowlurker 50.7%, Votive 48.7%, Pitjack 58.6%, Ironhaul 51.4%. Pitjack remains a playtest concern. Ironhaul mirror O.O.A. rates remain 12.4% without Command and 24.1% with Command. Individual matchup outliers exceed 70%, including unchanged original pairings. These fixed all-Strike policies omit Block strategy and optimal full-match resource allocation; they do not prove competitive balance. No profile was changed in this continuation.

## Continuation changes

1. Restored the production browser harness's mutual-rematch synchronization fix. The recovered harness waited after the first rematch request for a game-version change that requires both requests. Both players now click before the harness waits for synchronized progression, matching production main. Syntax validation passes; browser execution remains unverified.
2. Added `scripts/validate-sprite-pixels.py`, a read-only validator of actual atlas pixels against current masks. It writes diagnostic evidence only.
3. Added fresh test, screening, pixel and blocked-browser evidence; updated this review and known issues.

No gameplay, roster, atlas, balance, server topology or deployment changes were made.

## Execution blockers and exact remaining work

1. **Browser runtime:** Playwright is available, but its Chromium binary is absent. Chromium installation repeatedly downloaded an invalid/truncated archive. `npm run test:browser` therefore reports BLOCKED before launch. An attempt to install Chromium/Docker with the system package manager also failed on setgroups/seteuid permissions. Run in an environment with working Chromium: `npm install --no-save playwright`, `npx playwright install --with-deps chromium`, then `npm run test:browser`. Inspect actual screenshots at all four widths and exercise all 60 states, including mirrored poses and floor anchors. Existing harness covers six full browser match pairings, reconnection, error screens and mutual rematches; its successful execution and screenshot review remain necessary.
2. **Docker/Node 22:** Run `docker build -t underhive-duel-020 .`, then run one container with `PORT=3000` and a mapped port. Assert `/health` reports both versions as 0.2.0, test static asset delivery, and stop the container. The current Dockerfile uses Node 22 Alpine, non-root user `node`, and `node server/http.js`. Local Node 24 tests do not replace the Node 22/container gate. Repository CI already describes browser and Docker jobs.
3. Publish the prepared review branch without overwriting remote work, and run CI or equivalent validation. Record executed results and screenshot review here. The branch is currently local, so no remote PR or CI success is claimed.
4. Only after every release gate passes may this be marked ready for release review. Preserve all six original champions. Do not merge or deploy as part of this continuation.

## Evidence paths

- `docs/release-evidence/recovered-unit-tests.txt`
- `docs/release-evidence/recovered-screening-log.txt`
- `docs/release-evidence/matchup-screening.json` (fresh reproduction, unchanged)
- `docs/release-evidence/recovered-pixel-validation.json`
- `docs/release-evidence/recovered-browser-attempt.txt`
- `docs/browser-evidence/results.json` (fresh BLOCKED result)
- `docs/asset-proof/atlas-contact-sheet.png` (recovered visual diagnostic)

Historical Stage 3 browser reports and screenshots are not evidence of this release passing.

## Recovered changes relative to verified production main

These 39 paths were already changed in the recovered commit; they were not reimplemented:

```text
M	.github/workflows/ci.yml
M	.gitignore
M	README.md
A	authority/ASSET_MANIFEST_0.1.0.json
A	authority/releases/0.2.0/README.md
A	authority/releases/0.2.0/champions.json
A	docs/ASSET_GENERATION.md
M	docs/DEPLOYMENT.md
M	docs/KNOWN_ISSUES.md
A	docs/ROSTER.md
A	docs/ROSTER_EXPANSION_BALANCE.md
A	docs/SUBMISSION_RELEASE_REVIEW.md
M	docs/asset-proof/atlas-contact-sheet.png
A	docs/release-evidence/atlas-validation.json
A	docs/release-evidence/initial-profile-screening.json
A	docs/release-evidence/matchup-screening.json
A	docs/release-evidence/screening-log.txt
A	docs/release-evidence/second-profile-screening.json
A	docs/release-evidence/unit-tests.txt
M	package.json
M	public/ASSET_MANIFEST.json
M	public/app.js
A	public/assets/sprites/ironhaul-atlas.png
A	public/assets/sprites/pitjack-atlas.png
A	public/assets/sprites/shadowlurker-atlas.png
A	public/assets/sprites/votive-atlas.png
M	public/champions.json
M	public/lib/engine.js
M	public/lib/roster.js
M	public/style.css
M	scripts/asset-proof.py
M	scripts/browser-smoke.mjs
A	scripts/manifest-new-atlases.py
A	scripts/screen-roster.mjs
A	scripts/sync-roster.mjs
M	server/http.js
M	test/assets.test.js
A	test/expansion.test.js
M	test/rules.test.js
```

Screening JSON SHA-256: `6db75c9b3746874ca9e0f6eaa7c9379b7a0246e1bf60809fb8f196cf5b6dd1d7`.

**RECOVERED BUILD NOT READY** — remaining blockers: executable browser/layout/all-state/multiplayer/rematch validation and Docker/Node 22 validation.
