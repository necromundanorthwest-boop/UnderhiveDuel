# Stage 3 prototype gate

**PROTOTYPE GATE: NOT READY**

Review date: 3 October 2026 Pacific / 4 October UTC.
Rules authority 0.1.0; visual authority 0.1.0. The Foundry Background Study is the default. No champion statistics, traits, match mechanics or identities changed. Stage 4 has not begun.

## Completed implementation and executed checks

| Requirement | Evidence | Result |
|---|---|---|
| Deterministic local match engine before networking | `local-engine-results.txt`; complete five-bout example with every intermediate wound value; all 36 champion-pair completions | PASS |
| Frozen MVP rules fixtures R01–R32 | `test/rules.test.js` and R24 receipt fixture in `test/rooms.test.js` | PASS |
| Exact percentage adjudication | 12,800 surviving integer-Wounds states against independent BigInt cross-product oracle | PASS |
| Six champions and original assets | Frozen roster and all six original atlases; byte/hash checks | PASS |
| Frozen authority preservation | All 13 original authority hashes; dice/UI hashes and adopted background lock | PASS |
| Per-frame sprite clipping and anchors | All 36 exact rectangles, optional polygons, pivots and opponent mirroring; inspected rendered contact sheet | PASS for source geometry and diagnostic render |
| Sprite geometry at 320/390/768/1280 CSS widths | Combat-pose bounds and floor equations checked for each champion/side | PASS for geometry only |
| Server-owned randomness and legal actions | Crypto D6; intent allowlist; forged score/roll/damage fields rejected | PASS |
| Hidden selection and reroll commitments | Opponent responses inspected before and after simultaneous lock | PASS |
| Two-client full match and rematch | Independent HTTP clients against a real local listening server, plus actual remote transport module | PASS at protocol/transport level |
| Reconnect and lifecycle | Every choice phase and resolution; replacement; first-disconnect grace; expiry; restart error | PASS at service level |
| Duplicate/conflicting/stale commands | Receipt replay, unchanged random usage/token count; conflicting payload and stale version rejection | PASS |
| Source and run instructions | Dependency-free source, README, Docker option, deterministic tests, browser harness | COMPLETE |

Final automated suite: **48 tests passed, 0 failed**. `test-results.txt` contains the executed output. This total counts test cases, not the many internal assertions.

## Blocking publication checks

| Required gate | Actual status |
|---|---|
| Full browser responsive checks at 320, 390, 768, 1280 | **BLOCKED**. No browser binary; download failed. Geometry tests are not browser-layout tests. |
| Two-device browser smoke before publishing | **NOT EXECUTED**. No physical/remote-device results are claimed. Local HTTP clients and transport instances are not two devices. |
| Public server-authoritative test URL | **NOT PUBLISHED**. Available Sites hosting has no documented compatible shared-room authority; a suitable single-instance Node host is still required. |
| Full keyboard, touch, 200% text and reduced-motion validation | **PENDING BROWSER ACCESS**. Semantic controls and reduced-motion behavior are implemented but not accepted by real browser QA. |

No alpha was published because the user explicitly requires passing browser/two-device checks before publication. No static-only surrogate or unreliable per-Worker room map was deployed. No public URL is fabricated.

## Concrete next completion step

Run this source on an authorized, reachable single-instance Node staging host. Execute `scripts/browser-smoke.mjs` with an installed Chromium, complete `MANUAL_SMOKE_TEST.md` on two devices, fix any observed UI defects without changing the frozen mechanics, then publish that tested service and record the real HTTPS URL. This is unfinished Stage 3 work, not a request to begin Stage 4.
