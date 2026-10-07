# Underhive Duel 0.2.0 — submission release review

**RECOVERED BUILD READY FOR RELEASE REVIEW**

Updated 2026-10-07. The user has authorized publication and deployment. Pre-deployment gates pass; public deployment verification follows the main merge.

## Provenance and scope

Recovered branch `release/ten-champions-0.2.0`, HEAD `29922af9da092c053ebde93a8f363c3042fa2550`. Production baseline `3fd21ff4baf46b4dc8c89d321fc50228d80f68d2` was verified on GitHub. All 345 archived files matched the salvage inventory. The recovered implementation was preserved, with only diagnostic and test-harness changes during this continuation.

Published branch: `release/0.2.0-ten-champion`. PR: https://github.com/necromundanorthwest-boop/UnderhiveDuel/pull/1 . Initial published tree exactly matched audited local commit `16503c3`; API publication created a different commit identity while preserving the complete tree.

## Release gate evidence

Passing CI: https://github.com/necromundanorthwest-boop/UnderhiveDuel/actions/runs/37579182972

Tested branch commit: `0391249042698a8db4e1802807aef71330bee0a0`. The browser report records GitHub's synthetic PR merge SHA as sourceCommit. Subsequent changes add public-deployment verification and documentation; gameplay, atlas and roster bytes are unchanged.

| Gate | Result |
| --- | --- |
| Versions and roster | PASS: 0.2.0; ten champions, including Shadowlurker, Votive, Pitjack and Ironhaul; release/public/generated roster agrees |
| Original six | PASS: profiles, atlas bytes and 36 manifest frames equal verified production baseline |
| Frozen authority/UI/background | PASS: existing hash-lock tests |
| Automated tests | PASS: 53 tests on Node 22 in GitHub CI; earlier local Node 24 run also passes |
| Ordered pairings | PASS: 100 deterministic full-match pairing checks |
| HTTP multiplayer | PASS: 14 synchronized matches with mutual rematches |
| Balance reproduction | PASS: 220,000 bouts, 55 unordered pairings; fresh output matches saved JSON byte for byte |
| Pixel validation | PASS: 60 nonempty frames, all 24 additions; zero foreign or clipped opaque-component pixels under current masks |
| Chromium sprite validation | PASS: all 60 states in both orientations (120 frame renders), plus 200 arena renders covering ten champions, five poses and four widths |
| Browser layouts | PASS: 320, 390, 768, 1280; no horizontal overflow and enabled controls at least 44×44 CSS pixels |
| Browser multiplayer | PASS: six complete matches; all four additions in both seats plus a new-champion mirror |
| Mutual rematches | PASS: six; fresh match identity and reset Command tokens verified |
| Connection behavior | PASS: offline pause, reconnection and reload seat restore |
| Docker | PASS: image builds, starts and returns healthy 0.2.0 rules/visual versions |

The actual normal/mirrored Chromium contact sheets were visually reviewed. Representative selection, fight, result and connection-error screenshots were reviewed across the four widths. The 320px selector intentionally scrolls internally; browser selection of later champions remains functional. Full screenshots are in the passing workflow's browser-evidence artifact (14-day retention). Structured results are preserved in `release-evidence/ci-browser-results.json`. No physical-device testing is claimed.

## Failure resolved

The browser harness previously issued rematch clicks before both polling clients had synchronized after a reload and after the first consent. This could produce a legitimate stale-version rejection and then a test timeout. The fixed harness waits for the reload's new synchronized state, the first player's acknowledged consent, and finally a new match ID after the second consent. The server's stale-action protections, game rules and transport code remain unchanged. Early failed CI runs 37578874058 and 37579030243 are superseded by the passing run above.

The earlier recovery report incorrectly described the first consent as requiring both requests before a version increment. In fact every accepted consent increments the version; the defect was stale browser timing. This report corrects that explanation.

## Balance limits

The fixed all-Strike screen retains mean non-mirror win rates of 50.7% Shadowlurker, 48.7% Votive, 58.6% Pitjack and 51.4% Ironhaul. Pitjack's strength and Ironhaul's low mirror O.O.A. rates (12.4%/24.1%) remain playtest concerns. Individual matchup outliers exceed 70%, including original pairings. This policy omits Block strategy and optimal match-level resource use; it does not prove competitive balance. No rebalance was performed.

## Deployment target and next verification

Existing service: `srv-db0rj8k9v7es73cnrlvg`, https://underhive-duel.onrender.com . Render account workspace `tea-db0bn62d0e5s73aub4rg`. Confirmed Docker service tracking main, auto-deploy on commit, one instance, free plan, Oregon. The observed previous deploy is baseline `3fd21ff` with versions 0.1.0.

Merge the authorized release and let the existing auto-deploy run. The added `Live release verification` workflow waits for `/health` to report the exact GitHub SHA and versions 0.2.0, then validates all sprites/layouts, two public browser matches covering all four additions, mutual rematches and reconnection. Public success must be observed before declaring the website updated. No additional service, database, persistent disk, AI, weapon builder, accounts, matchmaking or progression is introduced.

Known platform limits remain: one in-memory authority, active matches lost on process restart, polling latency, session-bound seat recovery and large initial sprite downloads.

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


**RECOVERED BUILD READY FOR RELEASE REVIEW**
