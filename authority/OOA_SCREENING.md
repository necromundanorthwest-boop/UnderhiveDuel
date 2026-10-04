# O.O.A. frequency screening — unchanged roster, rules 0.1.0

## Finding
No obvious roster-wide shortage of O.O.A. results appears under the tested all-Strike policy: the equally weighted 21-pair average is 66.9% without Command rerolls and 82.7% when each fighter has one Command use available. Slagjaw mirrors are the clearest low-end signal: 24.3% and 46.5%, respectively. Some Slagjaw non-mirror pairings are also below 50% without Command. Preserve the roster and observe these in later playtests.

This does **not** establish that O.O.A. frequency is sufficient during strategic play. Players never Block in this screening; blocking can change the distribution substantially. No target O.O.A. rate was supplied. The finding is only that the current damage/Wounds profiles can produce frequent knockouts; it is not a balance approval, a theoretical upper bound or a prediction of human play.

## Method
Offline Monte Carlo arithmetic screening: 20,000 independent bouts for each of 15 distinct unordered matchups and six mirrors, in each of two resource conditions: 840,000 bouts total. Python standard-library random generator, fixed seed 20261003. Each bout begins at full Wounds. Attacker is sampled uniformly, equivalent to D1's repeated fair D6 initiative procedure. Resolve critical Strikes before normal Strikes, alternate legally, apply Shock once with normal-first cancellation, and stop immediately on O.O.A. Rending and Lethal use the frozen rules.

Free-reroll policy matches BALANCE_ASSUMPTIONS.md: Balanced rerolls one failure; Ceaseless rerolls the largest group of one failed face, lowest-face tie-break. For the one-Command condition, each fighter rerolls the first remaining failed die that has not already been rerolled, or passes if none exists. At most one Command use occurs per player. The second condition describes a single bout with a token available, not every bout of a match; match tokens still total two per player. No full-match resource policy is inferred.

Sampling uncertainty is at most approximately ±0.7 percentage points for an individual cell's approximate 95% binomial interval. Policy uncertainty is much larger. Pair weights are equal, not estimates of champion-selection popularity. Percent scoring does not alter whether O.O.A. already occurred; it only adjudicates the remaining exhausted-pool bouts.

| Pair | O.O.A., no Command | O.O.A., one Command available each |
|---|---:|---:|
| Bastion / Bastion | 76.2% | 87.1% |
| Bastion / Slagjaw | 58.8% | 75.8% |
| Bastion / Vesper | 86.1% | 95.7% |
| Bastion / Guttermaw | 77.4% | 87.6% |
| Bastion / Rivet | 73.4% | 88.2% |
| Bastion / Cinder | 79.1% | 90.2% |
| Slagjaw / Slagjaw | 24.3% | 46.5% |
| Slagjaw / Vesper | 45.8% | 70.3% |
| Slagjaw / Guttermaw | 57.8% | 76.3% |
| Slagjaw / Rivet | 39.6% | 67.4% |
| Slagjaw / Cinder | 38.4% | 61.5% |
| Vesper / Vesper | 85.9% | 95.7% |
| Vesper / Guttermaw | 85.9% | 94.4% |
| Vesper / Rivet | 75.8% | 91.7% |
| Vesper / Cinder | 71.8% | 88.4% |
| Guttermaw / Guttermaw | 78.1% | 88.3% |
| Guttermaw / Rivet | 72.6% | 87.5% |
| Guttermaw / Cinder | 81.3% | 90.5% |
| Rivet / Rivet | 66.4% | 87.3% |
| Rivet / Cinder | 66.4% | 85.1% |
| Cinder / Cinder | 64.4% | 80.6% |

## Decision
No stat or trait changes. The O.O.A. observation is a non-blocking playtest concern; the specified DECISION rule already resolves all non-O.O.A. bouts. Later QA should measure actual O.O.A./decision rates under blocking and match-level resource conservation before proposing a roster revision.
