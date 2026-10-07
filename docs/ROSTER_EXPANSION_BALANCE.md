# Roster expansion balance — 0.2.0

The original six profiles are unchanged. This release adds four existing-trait profiles; it adds no combat rule or phase.

## Final profiles

| Champion | Wounds | Dice | Hit | Normal / critical | Trait | Strength and weakness |
|---|---:|---:|---:|---:|---|---|
| Shadowlurker | 12 | 5 | 3+ | 3 / 6 | Rending | Accurate critical burst and Rending; only 12 Wounds and 3 normal damage. |
| Votive | 13 | 5 | 3+ | 3 / 5 | Balanced | Five accurate dice with a controlled Balanced reroll; 13 Wounds and only 3 normal damage. |
| Pitjack | 14 | 4 | 4+ | 4 / 6 | Ceaseless | Ceaseless plus heavy 4/6 damage; only four dice at Hit 4+, and 14 Wounds. |
| Ironhaul | 16 | 4 | 3+ | 3 / 6 | Brutal | 16 Wounds, accurate four-die pool and Brutal; normal damage is only 3 and it cannot freely reroll. |

## Method

Engine-driven deterministic Monte Carlo using seed 20261003, 1,000 bouts for each attacker role in each of 55 unordered pairings (10 mirrors, 45 distinct pairs), in each of two resource conditions: no Command and one eligible Command available to each fighter. Total: 220,000 bouts in the final screen. Initiative roles are balanced exactly; within-bout dice use the engine's seeded D6 source.
Free rerolls follow historical BALANCE_ASSUMPTIONS.md: Balanced rerolls the first failure; Ceaseless rerolls the largest same-face failure group with lowest-face tie-break. Command selects the first untouched failure. Combat always Strikes, criticals first. This reproduces the historical O.O.A. screening policy; it does not model optimal play, Block choices, or full-match token allocation.
Each 2,000-bout cell has worst-case approximate 95% binomial uncertainty ±2.2 percentage points (an individual attacker-role stratum ±3.1 points). Policy uncertainty is much larger. No timing claims follow from offline execution.

## Candidate changes before freeze

- Shadowlurker initially used 11 Wounds and 3/5 damage. Very low all-Strike survival against Bastion and Guttermaw led to 12 Wounds and 3/6 damage; normal damage remains weak.
- Votive initially had 3/4 damage. Its weak offense under the same policy led to 3/5, retaining the low normal damage and controlled reroll identity.
- Pitjack initially had 15 Wounds. Its 62.7% equally weighted non-mirror win average and positive matchup results across the field led to 14 Wounds. Its final mean is below 60%.
- Ironhaul remains 16 Wounds, 4 dice, Hit 3+, 3/6, Brutal. Its weak normal damage deliberately distinguishes it from Slagjaw.
Initial and intermediate full screens are preserved in release-evidence. Only new profiles changed.

## Final policy-screen overview

| New champion | Mean non-mirror win rate, both resource conditions | Lowest cell | Highest cell |
|---|---:|---:|---:|
| Shadowlurker | 50.7% | 36.4% | 76.0% |
| Votive | 48.7% | 24.7% | 84.0% |
| Pitjack | 58.6% | 50.3% | 79.0% |
| Ironhaul | 51.4% | 36.4% | 73.7% |

## Flagged findings and decision

No new champion exceeds 60% against every opponent under both tested resource conditions. Same-trait Pareto checks also find no new profile strictly superior to its original counterpart. These are limited safety findings, not proof of balance.
Several individual pairings exceed the historical 70% investigation threshold, especially involving Vesper under an all-Strike policy. This is also present in the unchanged baseline (Bastion–Vesper reaches 92.0% with Command); Votive–Vesper reaches 84.0%. Vesper's critical Block utility is intentionally absent from this policy, so these results are flagged for human play rather than used to rebalance the original six.
Ironhaul mirrors have low O.O.A. rates: 12.4% without Command, 24.1% with one Command each. Low normal damage against 16 Wounds explains the result. DECISION still terminates every bout. No new pool, damage rule or forced timer is added to conceal this tradeoff.
Pitjack remains a relatively strong policy performer (58.6% mean). Its closest tested cell is 50.3%; retain this as a named playtest concern rather than calling the roster perfectly balanced.
Profiles are frozen for 0.2.0 after these explicit findings. Submission readiness still separately requires browser, multiplayer and deployed-commit verification.

## All 55 pairings

| Pair | A wins, no Command | O.O.A., no Command | A wins, Command | O.O.A., Command |
|---|---:|---:|---:|---:|
| bastion / bastion | 49.0% | 76.0% | 52.4% | 87.4% |
| bastion / slagjaw | 62.6% | 58.4% | 50.9% | 77.0% |
| bastion / vesper | 86.8% | 86.7% | 92.0% | 95.6% |
| bastion / guttermaw | 45.2% | 77.1% | 43.9% | 87.5% |
| bastion / rivet | 69.7% | 73.7% | 71.4% | 88.5% |
| bastion / cinder | 63.0% | 79.2% | 58.3% | 89.7% |
| bastion / shadowlurker | 63.5% | 90.4% | 62.4% | 96.5% |
| bastion / votive | 67.6% | 85.0% | 71.5% | 92.7% |
| bastion / pitjack | 48.3% | 77.0% | 45.2% | 84.4% |
| bastion / ironhaul | 63.1% | 56.0% | 57.2% | 74.6% |
| slagjaw / slagjaw | 49.6% | 24.3% | 50.7% | 46.8% |
| slagjaw / vesper | 58.8% | 45.4% | 64.8% | 71.0% |
| slagjaw / guttermaw | 38.1% | 60.8% | 47.5% | 75.5% |
| slagjaw / rivet | 45.6% | 40.5% | 48.4% | 69.1% |
| slagjaw / cinder | 53.1% | 39.1% | 57.6% | 62.7% |
| slagjaw / shadowlurker | 48.1% | 59.0% | 54.9% | 78.0% |
| slagjaw / votive | 40.7% | 53.5% | 49.0% | 69.3% |
| slagjaw / pitjack | 40.6% | 48.0% | 48.4% | 66.2% |
| slagjaw / ironhaul | 46.1% | 19.4% | 47.4% | 37.2% |
| vesper / vesper | 50.2% | 85.5% | 51.2% | 96.3% |
| vesper / guttermaw | 13.7% | 86.8% | 10.3% | 94.7% |
| vesper / rivet | 34.2% | 75.3% | 28.7% | 91.5% |
| vesper / cinder | 37.7% | 72.8% | 29.5% | 88.2% |
| vesper / shadowlurker | 26.7% | 86.4% | 23.9% | 95.2% |
| vesper / votive | 17.3% | 89.1% | 16.0% | 95.7% |
| vesper / pitjack | 23.9% | 76.8% | 20.9% | 87.5% |
| vesper / ironhaul | 32.5% | 54.1% | 26.3% | 76.2% |
| guttermaw / guttermaw | 48.8% | 78.3% | 49.4% | 89.8% |
| guttermaw / rivet | 66.1% | 70.3% | 70.0% | 87.7% |
| guttermaw / cinder | 67.5% | 81.2% | 62.3% | 90.2% |
| guttermaw / shadowlurker | 63.2% | 89.5% | 60.4% | 95.0% |
| guttermaw / votive | 72.2% | 87.1% | 75.3% | 93.5% |
| guttermaw / pitjack | 49.7% | 75.0% | 47.4% | 86.1% |
| guttermaw / ironhaul | 63.6% | 55.7% | 54.8% | 74.1% |
| rivet / rivet | 48.1% | 66.5% | 48.8% | 87.0% |
| rivet / cinder | 56.6% | 66.5% | 56.0% | 86.1% |
| rivet / shadowlurker | 32.2% | 86.5% | 32.8% | 95.9% |
| rivet / votive | 47.3% | 78.1% | 53.8% | 93.0% |
| rivet / pitjack | 42.2% | 63.5% | 41.2% | 81.2% |
| rivet / ironhaul | 50.8% | 47.3% | 45.1% | 73.6% |
| cinder / cinder | 47.2% | 65.9% | 48.9% | 80.5% |
| cinder / shadowlurker | 43.8% | 77.6% | 48.9% | 90.5% |
| cinder / votive | 42.1% | 77.4% | 50.8% | 88.4% |
| cinder / pitjack | 41.1% | 68.8% | 43.5% | 81.2% |
| cinder / ironhaul | 44.2% | 35.9% | 42.2% | 59.5% |
| shadowlurker / shadowlurker | 49.8% | 93.7% | 49.3% | 97.7% |
| shadowlurker / votive | 53.2% | 87.9% | 57.1% | 96.0% |
| shadowlurker / pitjack | 41.9% | 82.8% | 36.4% | 92.1% |
| shadowlurker / ironhaul | 46.6% | 64.4% | 38.3% | 84.1% |
| votive / votive | 50.7% | 85.5% | 48.4% | 93.1% |
| votive / pitjack | 43.9% | 80.0% | 39.7% | 88.3% |
| votive / ironhaul | 58.4% | 47.9% | 48.5% | 66.2% |
| pitjack / pitjack | 51.0% | 72.9% | 49.9% | 84.0% |
| pitjack / ironhaul | 55.6% | 43.9% | 54.2% | 62.8% |
| ironhaul / ironhaul | 51.4% | 12.4% | 52.0% | 24.1% |
