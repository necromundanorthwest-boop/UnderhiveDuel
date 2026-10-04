# Match state machine — frozen 0.1.0
D1, revised D2, D3 and the one-per-bout Command cap are frozen. This is a declarative contract, not implementation code.

## Minimal authority
One authoritative room service owns membership, secrets, phase, all dice, legality, wounds, scores and tokens. Clients submit intent only. In-memory rooms are sufficient for MVP; a server restart may lose a match and must be communicated honestly. No SQL requirement. Public/private views must be constructed separately: never transmit a secret merely hidden by CSS.

## States and transitions
| State | Accepted input / trigger | Transition and effect |
|---|---|---|
| WAITING | Join valid room with vacant seat | Bind second player; CHAMPION_SELECT. |
| CHAMPION_SELECT | Each player chooses a valid ID and locks privately | When both locked, reveal together; initialize score 0:0, tokens 2:2; BOUT_SETUP. |
| BOUT_SETUP | Server only | Increment bout number (initially 0), restore Wounds, clear bout flags; INITIATIVE. |
| INITIATIVE | Server only | Roll until unequal; save each pair for explanation; higher becomes attacker; ATTACK_ROLL. |
| ATTACK_ROLL | Server only | Create stable IDs and both initial pools; WEAPON_REROLL. |
| WEAPON_REROLL | Eligible owners lock a legal selection or pass | When both ready, roll selected dice once and reveal; COMMAND_REROLL. |
| COMMAND_REROLL | Each owner locks one eligible die ID or passes | Validate one-die selection, unused bout allowance and remaining token; when both ready, deduct one per use, mark Command used, and roll atomically; RETAIN. |
| RETAIN | Server only | Final classifications, Rending once, fail discard; RESOLVE or BOUT_RESULT if both empty. |
| RESOLVE | Current player supplies owned unspent die ID plus Strike or Block and target ID | Validate, apply action atomically, check O.O.A., then exhaustion; else give turn to opponent if they have dice, otherwise retain turn. |
| BOUT_RESULT | Server score commit, then both acknowledge | Award once; if score 3, MATCH_RESULT; otherwise wait for both, then BOUT_SETUP. |
| MATCH_RESULT | Both request rematch | Fresh match ID, clear selections and ready flags; CHAMPION_SELECT. One request waits. |
| PAUSED | Server observes disconnect | Record underlying state; accept reconnect only, no game mutations; restore state when both connected. |
| ABANDONED | Explicit leave during active match, or disconnect grace expires | End without a competitive winner; cannot resume. |

A match-winning BOUT_RESULT transitions directly to MATCH_RESULT; it does not wait for bout readiness. If a player has no successes, skip their resolution turns. Initial attacker with no successes cedes the first actual resolution to defender. An action ending the bout never schedules another combat action.

## Exact exhausted-pool adjudication
After checking immediate O.O.A., let a=WA-currentA and b=WB-currentB. Compare integer products a×WB and b×WA. Lower proportional loss wins; equality alone gives the decision to attacker. No rounding, epsilon tolerance, raw-damage fallback or further tie-break is allowed. Store the exact losses and starting Wounds with the result. The UI may display rounded percentages alongside fractions.

## Reconnection policy
Issue an unguessable private seat token; room code alone does not reclaim a seat. Pause an active match for up to 60 seconds from the first disconnect; do not reset that deadline if the other player disconnects. If both reconnect in time, resume the exact stored phase and any sealed commitments. If not, mark ABANDONED without awarding points. One active connection per seat; a valid replacement invalidates the old connection. Pre-match rooms can be discarded after 15 minutes of inactivity. Terminal rooms may expire after 15 minutes; a lost or expired room returns a clear error. These service retention limits are not tactical timers.

## State data
Room ID/code; match ID; rulesVersion; status and pausedFrom; version counter; seat authentication tokens (private); connections; champion commitments (private until both lock); champion IDs; bout number; attacker; initiative history; per-player starting/current Wounds; score; remaining Command tokens; commandUsedThisBout per player; dice with IDs/faces/reroll provenance/classification/status; Shock-used; sealed choices; current actor; bout winner/reason and awarded flag; readiness; recent action receipts; disconnect deadline.

## Idempotence and validation
Each command includes match ID, unique action ID and expected state version. Authenticate seat, validate phase and ownership, then apply once. Cache committed action receipts for the live match. An identical retry returns its previous receipt without spending, rolling or scoring again; reusing an ID with different payload is rejected. Reject stale commands with a fresh authorized snapshot. Server transitions and choices are serialized per room. All receipt views preserve opponent secrecy.

Reject multiple Command die IDs or a second new Command use in the same bout; reject out-of-turn combat, altered damage or dice values, invalid champion IDs, invalid Block types, nonexistent/cancelled/spent dice, mixed-face Ceaseless selections, overspending, repeated rerolls, late edits to locks and cross-room requests. A client can never submit a roll result or declare victory. Transactional here means atomic room mutation, not a requirement for a database.

## Invariants
Exactly two seats; 0–2 tokens per player, decreasing within a match; at most one Command use per player per bout; 0 ≤ wounds ≤ starting wounds; exactly one trait per champion; no more dice than Attack; each die spent/cancelled at most once; score advances once per bout; no draw under D2; terminal match has one player at 3 and 3–5 completed bouts. Animations do not alter state. Server restart recovery is explicitly outside MVP.
