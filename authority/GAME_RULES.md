# Game rules — frozen 0.1.0
Status: frozen by user direction on 3 October 2026. D1, revised D2, D3 and the Command cap are authoritative; see RULES_GATE_REVIEW.md.

## Scope and match setup
Two remote human players join a private room. Each privately chooses one of six champions and locks that choice. Reveal both only when both have locked. Mirror matches are allowed. Players retain the same champion and predetermined weapon throughout the match. Each player starts with two Command Re-roll tokens. First to three bout wins wins; stop immediately at three. No champion abilities exist outside its listed weapon trait.

## Bout procedure
1. Reset both fighters to full Wounds, clear dice, reroll flags, Command-used-this-bout flags and Shock-used flags. Preserve score and remaining Command tokens.
2. Roll one server-generated D6 per player. Higher roll is attacker; ties reroll both dice until unequal (D1). Defender receives no statistical compensation.
3. Roll both Attack pools. Display both raw pools and tentative fail/normal/critical classifications. Keep stable die IDs.
4. Resolve the optional Balanced or Ceaseless choice, if applicable, using the window in WEAPON_RULES.md. Reveal both choices and resulting rolls together.
5. Each player simultaneously commits a Command choice: pass, or select exactly one die that has never been rerolled, provided at least one token remains and Command has not been used this bout. One token buys one reroll: maximum one use per player per bout and two uses per player per match. Apply both players’ committed choices together; there is no second Command window. Successful dice may be risked. Declining saves tokens. Once locked, a choice cannot be revised.
6. Retain final successes. Natural 1 always fails; natural 6 always succeeds critically. Other results meeting Hit succeed. Lethal changes successful 5s to criticals on the relevant weapon. Apply Rending once if eligible (D3).
7. Attacker resolves first. On a turn, select one unresolved success and Strike or legally Block. A resolved success leaves its owner's pool. Alternate while both have successes. If one player has none, the other resolves remaining successes without empty turns. No voluntary pass is allowed in this phase.
8. Strike removes Normal or Critical Damage from the opponent's current wounds. Apply Shock, if triggered, as part of that same action. Clamp wounds at zero. Immediately end on O.O.A.; later dice cannot retaliate or cause a simultaneous O.O.A.
9. Block spends the selected success and cancels exactly one eligible opposing unresolved success. Normal blocks normal; critical blocks normal or critical. Brutal restricts the blocker to a critical. Cannot block if no legal target exists. Two normal dice cannot combine to block a critical.
10. If both pools are empty and both fighters live, the fighter who has lost the smaller percentage of their own starting Wounds wins by DECISION (D2). Equivalently, the winner inflicted the larger percentage loss on the opponent. Divide each fighter’s actual wound loss by that fighter’s own starting Wounds. Compare the exact fractions: if A lost a of WA and B lost b of WB, compare a×WB with b×WA; a smaller left product means A wins, a larger left product means B wins. Only exact equality awards the bout to the attacker. Never adjudicate using rounded display percentages, raw damage totals or absolute remaining wounds. Do not reroll or restore wounds within a bout.
11. Award exactly one point. Announce O.O.A. or DECISION with the reason, score and tokens. If neither player has three points, begin the next bout after both acknowledge readiness. Otherwise show match result and offer mutual rematch.

## Timing and resource rules
No competitive decision timer or automatic tactical choice in the MVP. The 30–60-second target is a usability hypothesis, measured separately from room joining and champion selection. Animations must not govern authority or delay access to a legal next action. A stalled connected player may be left by the opponent; do not invent a timeout victory. Disconnect handling is defined in MATCH_STATE_MACHINE.md.

Weapon rerolls are free and reset each bout. Command tokens persist across bouts. The per-bout Command-use flag resets each bout; the match token total does not. Free weapon rerolls do not consume the Command-use allowance. A die can be rerolled only once across both sources (local clarification; not stated explicitly in this supplied Lite PDF). A reroll replaces the old face even when worse. All choices are committed before their random outcomes are revealed. No initiative rerolls using Command tokens.

## Injury
The PDF reduces Hit after wounds fall below half. In this single-exchange design, all attack rolls and rerolls finish before damage, and wounds reset before the next pool. Injury therefore has no later attack roll to modify. Never reclassify already-retained successes after an injury. No movement or separate injury subsystem is implemented.

## Complete worked bout (O.O.A.)
Rivet: 12 Wounds, 4 dice, Hit 3+, damage 4/5, Shock. Slagjaw: 16 Wounds, 4 dice, Hit 4+, damage 4/6, Brutal.

- Initiative: Slagjaw 5, Rivet 1; Slagjaw attacks.
- Raw rolls: Rivet [5,4,2,1]; Slagjaw [6,6,4,1]. Neither has a free reroll trait.
- Rivet spends one Command token rerolling the 2 into 3. Slagjaw passes. Final pools: Rivet three normals; Slagjaw two criticals and one normal.
- Slagjaw critical Strike: Rivet 12 → 6.
- Rivet normal Strike: Slagjaw 16 → 12. Rivet cannot normal-Block Slagjaw because of Brutal.
- Slagjaw critical Strike: Rivet 6 → 0; immediate O.O.A. Slagjaw wins. Rivet's two unused normals and Slagjaw's unused normal are discarded. Rivet has one Command token left if starting with two.

## Complete worked best-of-five match
The following independent match uses the same two champions. Each starts with two tokens. N = normal Strike; C = critical Strike. All failed dice are discarded after final retention. Each bracket lists every raw die, including failures. Every bout resets Wounds to Rivet 12 / Slagjaw 16. Neither weapon has free rerolls or Rending.

| Bout | Initiative (Rivet / Slagjaw) | Raw Rivet / raw Slagjaw | Command decisions | Full resolution in order | Result; score R:S; tokens R:S |
|---|---|---|---|---|---|
| 1 | 6 / 2 | [6,4,3,1] / [6,5,2,1] | Both pass | R C: S→11, Shock discards S's 5; S C: R→6; R N: S→7; R N: S→3 | Decision R: loss R 6/12=50%, S 13/16=81.25%; 1:0; 2:2 |
| 2 | 1 / 5 | [5,4,2,1] / [6,6,4,1] | R 2→3; S passes | S C: R→6; R N: S→12; S C: R→0; stop | O.O.A. S; 1:1; 1:2 |
| 3 | 4 / 2 | [6,5,2,1] / [6,4,2,1] | R 1→4; S 2→5 | R C: S→11, Shock discards S's 4; S C: R→6; R N: S→7; S N: R→2; R N: S→3 | Decision S: loss R 10/12≈83.33%, S 13/16=81.25%; 1:2; 0:1 |
| 4 | 3 / 6 | [6,6,3,1] / [6,5,3,1] | R passes; S 3→4 | S C: R→6; R C: S→11, Shock discards S's 5; S N: R→2; R C: S→6; R N: S→2 | Decision R: loss R 10/12≈83.33%, S 14/16=87.5%; 2:2; 0:0 |
| 5 | 6 / 1 | [6,6,4,2] / [6,5,4,1] | Both pass | R C: S→11, Shock discards S's 5; S C: R→6; R C: S→6 (no second Shock); S N: R→2; R N: S→2 | Decision R: loss R 10/12≈83.33%, S 14/16=87.5%; 3:2; 0:0 |

These are possible rolls and legal choices, not optimal-play advice or a representative sample. Bout 3 deliberately demonstrates the revised scoring: Rivet inflicts more raw damage (13 versus 10) but loses a greater proportion of starting Wounds, so Slagjaw wins. Bout 4 has been revised to preserve a complete five-bout example. The frequent decisions in this example are not measured decision rates. Every player spends at most one Command token in any bout, and two in the match.

## Exact-tie and Block examples
With Rivet at 6/12 Wounds and Slagjaw at 8/16, each has lost exactly 50%; whichever fighter was attacker wins the exhausted-pool decision. With no damage to either fighter, the same exact-tie rule applies. A Rivet critical may instead be spent to Block one Slagjaw success despite Brutal; that spends the critical and cancels one target, but does not trigger Shock.

## Explicit exclusions
Movement, Charge simulation, terrain, range, ranged attacks, defence/save dice, armour saves, objectives, positioning, APL, activations, turning points, counteracting, CP generation, additional ploys, custom equipment, weapon selection, roster construction, campaign, progression, inventory, accounts, matchmaking, spectators, chat, AI opponents, draws/replayed bouts, sudden death, extra pools, persistent databases and defender compensation are excluded. Internal probability analysis does not constitute an in-game AI opponent.
