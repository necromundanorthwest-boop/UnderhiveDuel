# Champion roster — frozen 0.1.0
Frozen for implementation. No champion numeric values, weapons or traits were changed in this revision. Values are original tuning choices, not transcribed tabletop profiles. Exactly one fixed melee weapon and one trait per champion. Full traits are in WEAPON_RULES.md. Public names remain working names pending release review.

| Champion | Wounds | Weapon | Attack | Hit | Normal / critical damage | Trait |
|---|---:|---|---:|---|---|---|
| Bastion | 14 | Foundry blade | 4 | 3+ | 4 / 5 | Balanced |
| Slagjaw | 16 | Breaker maul | 4 | 4+ | 4 / 6 | Brutal |
| Vesper | 11 | Filament sabre | 5 | 3+ | 3 / 4 | Lethal 5+ |
| Guttermaw | 14 | Hooked talons | 5 | 4+ | 4 / 5 | Ceaseless |
| Rivet | 12 | Arc baton | 4 | 3+ | 4 / 5 | Shock |
| Cinder | 13 | Split-edge cleaver | 5 | 4+ | 4 / 5 | Rending |

## Original public identities
- **Bastion:** a foundry rescue construct repurposed for pit fighting. Broad plated silhouette; the reliable generalist. No passive armour reduction.
- **Slagjaw:** a furnace-grown labour brute wielding a demolition tool. Large health pool and difficult-to-block blows offset by fewer successes. No species-specific lore in public copy.
- **Vesper:** a glass-limbed wanderer whose filament blade rewards precision. Fragile, with abundant criticals and modest per-hit damage. No dodge rule.
- **Guttermaw:** a tunnel scavenger adapted to industrial waste. Several hooked limbs and repeated lunges. Free rerolls create consistency, not extra attacks.
- **Rivet:** an ageing tunnel marshal carrying an arc baton. A critical strike can interrupt the opposing pool, but the body remains vulnerable. No stun/APL effect.
- **Cinder:** a masked ash zealot with a damaged cleaver. One critical result can sharpen another hit through Rending. No spell or corruption resource.

Only names, short original descriptions and listed profiles belong in player-facing data. Internal tabletop associations are in IP_SEPARATION.md. champions.json is the canonical numeric specification; prose and examples must agree with it. No other attributes are inferred from archetype.
