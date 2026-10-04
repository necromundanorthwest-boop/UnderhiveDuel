# Required two-device and browser acceptance

Status: **NOT EXECUTED**. Protocol tests do not replace these checks.

Use two physical devices or independent remote users on a shared, reachable staging host. Record device/browser versions, URL, UTC time, match IDs and result. Never record private seat tokens.

1. Device A creates a room; B joins by code. Confirm a third join is rejected.
2. Lock one champion. Confirm the other device sees readiness but not the champion. Complete both locks. Repeat across rematches to cover all six champions, including one mirror match.
3. Verify free reroll selection/pass and sealed Command choices. Confirm one Command use per bout and two per match. Confirm dice already rerolled cannot be selected again.
4. Complete a match with legal Strikes and Blocks. Read the log to explain all six traits across the test matches. Verify Brutal rejection and Shock priority. Observe O.O.A. and DECISION labels, exact fraction explanations and standing sprites on decisions.
5. Check synchronized wound values, score, die faces/classes/status, current actor and attacker after every action. Confirm first-to-three stops the match and mutual rematch resets choices/resources.
6. Reload a seat in each choice phase and during resolution. Verify exact restoration and privacy. Open a replacement connection; confirm the old connection can no longer act.
7. Disconnect one device. Confirm the match pauses, restores within 60 seconds of detection, and abandons without a winner after expiry. Confirm a second disconnect does not extend the first deadline.
8. Check 320, 390, 768 and 1280 CSS pixels on entry, selection, reroll, combat, bout result, match result, paused and error screens. No horizontal page overflow, clipped controls or unreadable text. Test 200% text enlargement and touch targets ≥44 CSS pixels.
9. Keyboard-only: tab through Create/Join, champion locking, dice selection, Strike, Block/target/Cancel, next bout and rematch. Focus must remain visible. Test reduced motion.
10. Inspect each champion's idle, strike, block, hit and defeat poses on both sides. Use ASSET_MANIFEST.json, including polygon masks, local pivots and nonuniform rectangles. No neighboring sprite fragments, jump in scale or floating floor anchors.

Automated assistance: `node scripts/browser-smoke.mjs` covers two isolated browser contexts, three champion-pair matches, rematches, a reload, screenshots and layout assertions for entry/fight/result. It does not replace the physical two-device, full keyboard or all-phase responsive checklist.
