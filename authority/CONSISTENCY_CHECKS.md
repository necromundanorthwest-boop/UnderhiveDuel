# Internal consistency checks — rules 0.1.0

PASS — specification-level verification completed 3 October 2026.

## Executed checks
- Compared all six champion objects against the previously delivered ZIP: identical names, Wounds, weapons, attack dice, thresholds, damage and traits. Only top-level status/version changed.
- Compared integer cross-products with exact rational arithmetic for 6,400 surviving integer-Wounds states across all 36 ordered roster pairings: complete agreement, including exact ties.
- Replayed the five-bout Markdown example from its actual raw dice, rerolls and action rows. Checked turn order, retained dice, first-critical Shock removal, damage, exhaustion, percentage winner, token cap, cumulative score and immediate match end.
- Verified the separate worked O.O.A. bout arithmetic.
- Checked seven explicit percentage-scoring outcomes, including the raw-damage reversal, unequal raw losses at equal percentages, equal raw losses at unequal percentages, and zero-loss tie.
- Checked six Command eligibility boundaries: one use with two tokens accepted; selecting two dice, repeating a use, spending with zero tokens remaining and rerolling an already-rerolled die rejected; one remaining token in a fresh bout accepted.
- Confirmed frozen metadata, complete required files, and removal of obsolete pending-gate language. Reviewed revised acceptance criteria R01–R32 for consistency with the freeze.

## Replayed example results
- Bout 1: Wounds R:S 6:3, Decision R, score 1:0, tokens 2:2
- Bout 2: Wounds R:S 0:12, O.O.A. S, score 1:1, tokens 1:2
- Bout 3: Wounds R:S 2:3, Decision S, score 1:2, tokens 0:1
- Bout 4: Wounds R:S 2:2, Decision R, score 2:2, tokens 0:0
- Bout 5: Wounds R:S 2:2, Decision R, score 3:2, tokens 0:0

## Limits
These are document/data and offline arithmetic checks, not tests of an implemented game or server. All multiplayer, secret-view, reconnection and UI acceptance tests still require implementation. Probability tables for the unchanged attack pools remain valid because they exclude Command and bout scoring. The separate O.O.A. screening includes the revised one-use-per-bout cap.

RULES GATE: READY
