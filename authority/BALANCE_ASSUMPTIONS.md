# Balance assumptions and probability checks
Rules and current roster are frozen as 0.1.0; competitive balance is not validated. D2 now compares percentage of starting Wounds lost. No roster values were changed.

## Method
Enumerated every initial ordered D6 pool (6^4=1,296 or 6^5=7,776 outcomes), then every possible replacement sequence for the stated free-reroll policy, weighting each branch by 6^-(initial dice + rerolled dice). Values are exhaustive probabilities rounded for display, not Monte Carlo estimates. No Command tokens or opponent decisions are included. Lethal is included in the raw classification; Rending is applied only in the post-trait column.

Policy: Balanced rerolls one failed die if any; otherwise passes. Ceaseless chooses the most frequent failed face (ties choose the lowest face) and rerolls all dice of that face; otherwise passes. These are success-seeking example policies, not assertions of optimal combat strategy. Legal player choices may differ. Rending upgrades one normal whenever eligible.

For a plain n-die Hit h+ pool: success probability per die=(7-h)/6; E[successes]=n(7-h)/6; P[zero]=(1-(7-h)/6)^n. For ordinary criticals, E[criticals]=n/6 and P[any]=1-(5/6)^n. Lethal 5+ at Hit 3+ has critical probability 2/6. For Rending, the promotion probability is 1-(5/6)^n-(2/3)^n+(1/2)^n for this Hit 4+ profile.

| Champion | Raw E[successes] | Post E[successes] | Raw → post E[criticals] | Raw → post P(any critical) | Raw → post P(zero successes) |
|---|---:|---:|---|---|---|
| Bastion | 2.667 | 3.202 | 0.667 → 0.800 | 51.77% → 58.77% | 1.23% → 0.41% |
| Slagjaw | 2.000 | 2.000 | 0.667 → 0.667 | 51.77% → 51.77% | 6.25% → 6.25% |
| Vesper | 3.333 | 3.333 | 1.667 → 1.667 | 86.83% → 86.83% | 0.41% → 0.41% |
| Guttermaw | 2.500 | 3.310 | 0.833 → 1.103 | 59.81% → 71.14% | 3.12% → 0.51% |
| Rivet | 2.667 | 2.667 | 0.667 → 0.667 | 51.77% → 51.77% | 1.23% → 1.23% |
| Cinder | 2.500 | 2.500 | 0.833 → 1.331 | 59.81% → 59.81% | 3.12% → 3.12% |

## Damage ceilings and implications
- Bastion: mean unopposed pool damage 13.61; all-critical maximum 20.
- Slagjaw: mean unopposed pool damage 9.33; all-critical maximum 24.
- Vesper: mean unopposed pool damage 11.67; all-critical maximum 20.
- Guttermaw: mean unopposed pool damage 14.34; all-critical maximum 25.
- Rivet: mean unopposed pool damage 11.33; all-critical maximum 20.
- Cinder: mean unopposed pool damage 11.33; all-critical maximum 25.

Unopposed damage ignores blocking, Shock removal and early O.O.A.; it is not expected actual damage. Brutal changes legal choices, not pool probabilities. Shock's trigger availability equals P(any critical), but actually firing requires a critical Strike before defeat; actual cancellation further requires an enemy success. Rending's extra critical probability is about 49.77% per pool. These values should be regression targets for an eventual rules engine.

At most one Command reroll is available per player per bout, with two uses across the whole match. Its opportunity is conditional and the second token retains future-bout value; spending both in one bout is forbidden. One rerolled failure adds p expected successes (2/3 at Hit 3+, 1/2 at Hit 4+). Rerolling a normal to seek a critical risks losing it. Successful free rerolls cannot be rerolled again with tokens.

Under D1, each initiative pair ties with probability 1/6, expected pairs until a result are 6/5, and each player becomes attacker with probability 1/2 independently each bout. No finite hard cap on tie rerolls is specified; the server can yield execution between batches without replacing the random rule.

## Pathological matchup candidates, not established findings
| Matchup / pattern | Risk | Required later test |
|---|---|---|
| Bastion vs Rivet | Same offensive base, but Bastion has more Wounds plus consistency; Shock must compensate. | Compare both initiative roles, not pooled win rate alone. |
| Guttermaw vs Cinder | Guttermaw gains more expected successes and one extra Wound; Cinder's extra criticals must create meaningful counterplay. | Measure Rending's Block value, decision wins and matchup win rate. |
| Vesper vs Slagjaw | Vesper can legally Block Brutal often, but two Slagjaw critical Strikes can exceed Vesper's 11 Wounds. | Check lethal threat visibility and attacker sweeps. |
| Rivet vs low-critical pools | Shock can remove the opponent's only critical when no normal remains. | Verify normal-first targeting and strategic benefit. |
| Both sides all fail / exactly offsetting Blocks | No O.O.A. and exactly tied percentage Wounds lost. | D2 must end deterministically; log attacker tie-break frequency. |
| Repeated defensive play | Percentage-loss decision scoring can reward preserving a lead in remaining Wounds percentage by blocking. | Measure whether this creates meaningful choice or an obvious repetitive policy. |

No champion strictly exceeds every other's listed stats and trait effects, but that does not establish absence of a dominant strategy. The roster remains unchanged. Only the limited O.O.A. screening below has been run; no full strategic matchup analysis or human playtest has occurred.

## Later QA plan and tuning gates
Evaluate all 15 unordered distinct matchups plus six mirrors, separated by attacker/defender. At least 1,000 bouts per ordered role under documented simple policies provides a screening baseline, not optimal-play proof. Report uncertainty, policy, resource context and rules version. Inspect any distinct matchup over 70% in one direction after random initiative, mirror seat asymmetry, high attacker win rates, and one champion exceeding 60% against all five others. Treat these as investigation thresholds, not automatic balance claims. Confirm any tuning with human decisions.

Measure full best-of-five matches separately because tokens couple bouts. Record median and p90 duration, number of resolution choices, O.O.A./decision split, tie-break frequency, token use and abandoned games. Target familiarized median 30–60 seconds, from first initiative to match result, including between-bout readiness. Champion selection and network joining are separate measures. Five bouts can contain up to 50 resolution actions for this 4–5-die roster, plus reroll/readiness decisions, so the timing target is at risk and requires evidence.

Do not add a timer, extra attacks, passive abilities or defender bonuses to fix pacing without a rules revision. Adjust animations/UI first; numeric tuning returns to Stage 1 and increments rulesVersion.

## Limited O.O.A. screening after freeze
See OOA_SCREENING.md: 840,000 policy-controlled bouts, with unchanged profiles. Average O.O.A. frequencies were 66.9% without Command and 82.7% with one eligible Command use available per fighter. Slagjaw mirrors were the low-end signal. These are all-Strike results, not optimal-play rates or balance validation. No rebalancing was performed.
