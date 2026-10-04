# MVP acceptance criteria
Frozen acceptance contract, rules 0.1.0. Specification-level checks and worked-example arithmetic have been executed; no game exists yet, so implementation acceptance remains pending. See CONSISTENCY_CHECKS.md.

## Rules and examples
| ID | Test input / condition | Required result |
|---|---|---|
| R01 | Both lock champions; attempt later switch | Reveal simultaneously; switch rejected during match; mirrors allowed. |
| R02 | Initiative 4:4 then 2:5 | Tie recorded, second player attacker; no defender bonus (D1). |
| R03 | Hit 3+, raw [1,2,3,6] | Two failures, one normal, one critical. |
| R04 | Normal Block targeting critical | Reject without spending either die. Two normals cannot combine. |
| R05 | Critical Block targeting normal or critical | Spend blocker and exactly one target. |
| R06 | Block a Brutal weapon using normal, then critical | Normal rejected even against normal target; critical permitted. |
| R07 | Ceaseless [1,2,2,4,6], select two 2s | Allowed; selecting 1 and 2 together rejected; subset of one chosen face allowed. |
| R08 | Balanced die rerolled then selected for Command | Reject; remaining token count unchanged. |
| R09 | Select two distinct Command dice with two tokens | Reject atomically: neither die changes and both tokens remain. One selected eligible die consumes one token and the bout allowance. |
| R10 | Rending final [6,4,4,2,1], Hit 4+ | Exactly two criticals and one normal; no recursive promotion. |
| R11 | Rending initial only 6 rerolled to fail | No promotion unless another final critical exists. |
| R12 | Lethal 5+, Hit 3+, [1,3,5,6] | Fail, normal, critical, critical. |
| R13 | First Shock critical Strike with opposing N+C | Cancel N; if only C, cancel C; second critical Strike cancels nothing. |
| R14 | Shock critical Block | No Shock activation. |
| R15 | Attacker pool empty, defender two successes | Defender resolves both without waiting for empty turns. |
| R16 | Lethal Strike while enemy retains dice | Immediate bout win, no retaliation or second point. |
| R17 | Rivet loses 10/12; Slagjaw loses 13/16; both pools empty | Slagjaw wins: 81.25% lost is lower than 83.33…%, despite taking more raw damage; DECISION, not O.O.A. |
| R18 | Rivet loses 6/12; Slagjaw loses 8/16, or both lose zero | Exact equal fractions: attacker wins by DECISION; score advances once. |
| R19 | New bout after token expenditure | Wounds, Shock and Command-used-this-bout reset; remaining match tokens do not. |
| R20 | Score reaches 3:0 or 3:2 | Match ends immediately; no fourth or sixth bout respectively. |
| R21 | Replay every worked-example row | Exact wounds, scores, tokens and result reasons match GAME_RULES.md. |
| R22 | Wounds fall below half mid-resolution | Retained dice stay unchanged. |
| R23 | First Command succeeds; new action ID requests another in same bout | Reject, even if one match token remains; no extra roll or expenditure. |
| R24 | Retry the identical accepted Command action ID | Return original receipt; no extra token or random result. |
| R25 | Command used once in bout 1 and once in bout 2; attempt in bout 3 | Reject: zero match tokens; no replenishment. |
| R26 | Free weapon reroll, then Command on a different untouched die | Legal; free reroll does not consume Command allowance. Same already-rerolled die remains ineligible. |
| R27 | Pass Command in a bout, then next bout | No token spent; next bout still allows at most one use. |
| R28 | Equal raw losses: Rivet 4/12, Slagjaw 4/16; Rivet attacker | Slagjaw wins; 25% < 33.33…%; not an exact percentage tie. |
| R29 | Different raw losses but equal fractions: 3/12 and 4/16 | Both 25%; attacker wins, regardless of higher raw damage. |
| R30 | Compare all surviving integer-Wounds states for all six profiles | Integer cross-products must agree with exact rational comparison. Display formatting must never enter adjudication. |
| R31 | Rending starts without a critical, Command creates a 6 with normal remaining | Upgrade one normal after Command; never before the replacement result. |
| R32 | One fighter reaches zero while opponent still has successes | O.O.A. takes priority; never await exhaustion or percentage comparison. |

## Multiplayer and lifecycle
Two independent remote clients must create/join a room, privately select, complete a match and mutually rematch. Client-supplied roll results/damage/score must never be accepted. Reject cross-room commands, wrong-seat actions, stale state, wrong phases and edits to sealed locks. A duplicate action ID returns the original result without new randomness, expenditure or scoring. A conflicting payload under the same ID is rejected.

Inspect network responses to verify champion choices and pending reroll selections are secret until both lock. Test reconnect in each choice phase and during resolution; restore exact state without opponent-secret leakage. Test 60-second disconnect expiry and clear ABANDONED result, valid seat replacement, invalid seat tokens, server restart error and room expiry. Reconnect timers do not award victory. No database or restart persistence is required.

## Presentation and comprehension
Champion select, VS presentation, opposing pixel fighters, Wounds bars with numeric values, bout score, remaining tokens, dice faces, success classes, current actor and legal Strike/Block choices must be visible. Colour cannot be the sole indication of die class, ownership or legal action. Clearly distinguish O.O.A. from DECISION. Show why a Block is illegal and what each trait changed. Buttons must remain readable and usable on desktop and mobile; keyboard and focus support required for primary controls.

## Balance / pacing evidence
Follow BALANCE_ASSUMPTIONS.md. Probability targets must match to rounding under the same policy. Record matchup screening and human timing rather than asserting balance from marginal dice averages. The 30–60-second target is unverified. Escalate persistent roster-wide dominance, unexplainable outcomes and excessive forced choices to rules review.

## Exclusion audit and stage boundary
No movement, ranged system, positioning, extra abilities, timer-based tactical outcomes, AI opponent, inventory, accounts, progression, open matchmaking or SQL has slipped into scope. Stage 1 emits specifications only. Public hosting and competition compliance are later gates. D1, revised D2, D3 and the Command cap are approved and frozen as 0.1.0. The rules gate permits proceeding to Visual Identity; roster rebalancing is not authorized by this revision.
