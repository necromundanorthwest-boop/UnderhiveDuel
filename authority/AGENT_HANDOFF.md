# Agent handoff

## Stage
Rules and Roster (Stage 1)

## Gate status
READY — rulesVersion 0.1.0

## Files produced
GAME_RULES.md; CHAMPION_ROSTER.md; champions.json; WEAPON_RULES.md; MATCH_STATE_MACHINE.md; BALANCE_ASSUMPTIONS.md; IP_SEPARATION.md; MVP_ACCEPTANCE_CRITERIA.md. Supporting files: README.md, RULES_GATE_REVIEW.md, CONSISTENCY_CHECKS.md and OOA_SCREENING.md.

## Frozen decisions
D1: highest initiative attacks, tied dice reroll. D2: lower own percentage Wounds lost wins exhaustion; attacker breaks exact ties only. D3: rerolls precede final retention/Rending and no die is rerolled twice. Command Re-roll: one use per player per bout, two per match. Six profiles are unchanged. All other prior product boundaries remain in force.

## Changes from prior specification
Replaced raw-damage exhaustion scoring with exact percentage-loss scoring. Removed two-token same-bout spending. Updated the worked match, state fields, transitions, acceptance criteria and gate status. Added consistency verification and bounded O.O.A. screening. No champion rebalancing or game implementation.

## Known limitations
All-Strike O.O.A. screening is policy-dependent and does not validate balance or 30–60-second pacing. Slagjaw mirrors warrant observation. Full strategic matchup analysis, human playtests, production tests and competition review remain future work.

## Open issues
None blocking the rules freeze.

## Release blockers
No unresolved Stage 1 contradictions. Later implementation, assets, QA, hosting and competition validation are still required before release.

## Instructions to next agent
Proceed to Stage 2 Visual Identity using rulesVersion 0.1.0. Use champions.json for exact profiles. Show DECISION separately from O.O.A.; show exact loss fractions beside displayed percentages when explaining a decision. Distinguish one Command use available this bout from remaining match tokens. Never introduce rounding into adjudication, repeat pools or roster changes. Downstream rules changes must return to Stage 1.

RULES GATE: READY
