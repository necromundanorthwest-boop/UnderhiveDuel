# Weapon rules — frozen 0.1.0
Source: supplied Kill Team Lite Rules, PDF page 3; Fight permissions on page 2. Descriptions below are paraphrased. D3 fixes local timing; the user-approved cap is one Command use per player per bout, two per match.

## Resolution order and choices
Initial pools are public. A weapon-reroll window opens for owners of Balanced/Ceaseless; others are automatically ready. Both eligible players submit sealed choices, then all accepted rerolls reveal together. A pass locks that window. One common Command window follows, likewise sealed until both lock. Each owner may select exactly one eligible die or pass; selecting two dice is invalid even with two tokens remaining. Players with zero tokens, no eligible dice or a used-this-bout Command flag automatically pass. Do not expose an opponent's selected die IDs or spent token count until both lock. Final retention and Rending follow. Zero-success pools still receive eligible reroll opportunities before exhaustion is adjudicated.

A die records id, original face, current face, rerolled boolean, reroll source, final classification, transformation and spent/cancelled state. IDs are assigned at initial roll in pool order. Rerolls change faces, not identity. Changing a normal to critical is a transformation, not a reroll. Rending cannot transform a fail.

| Trait | Frozen behavior | Example / important restriction |
|---|---|---|
| Balanced | Owner may select zero or one attack die, of any face, for one free reroll. | [1,3,4,6] can reroll the 1. May also risk a success. |
| Brutal | Opponent must spend a critical success to Block any of this fighter's successes. | Cannot normal-Block its normal. Does not stop this fighter using its own normal to block a non-Brutal enemy normal. |
| Ceaseless | Owner chooses one face value from the initial pool, then any nonempty subset of dice showing that face, or passes. Reroll those dice once. | [1,2,2,4,6] may reroll both 2s, just one 2, or the 1; never both 1 and 2. Not limited to failed results. |
| Lethal 5+ | Final successful faces 5 and 6 count as critical. | With Hit 3+, 3–4 are normal; 5–6 critical. Trait never makes a failed face successful. |
| Rending | After all rerolls, if at least one critical and one normal remain, upgrade exactly one normal to critical. Apply once. | [6,4,4,2,1] at Hit 4+ becomes two criticals plus one normal. No repeated promotion. |
| Shock | On the first critical Strike of this fighter in the bout, also cancel one opposing unresolved normal; if none, cancel one critical if available. | Critical Blocks never trigger it. Subsequent critical Strikes do not repeat it. An empty opposing pool offers no cancellation. |

Rending is automatic in this frozen ruleset: there is no downside to upgrading a retained normal under this six-trait roster. To avoid another choice prompt, upgrade the lowest-ID eligible normal and announce it. This operationalizes the source's optional upgrade; if future content makes the option consequential, it must return to the rules stage.

For Shock choose the lowest-ID eligible opposing die automatically. All eligible dice of that type are interchangeable in this roster. The critical Strike and cancellation form one atomic action; a lethal strike still ends the bout immediately with no opposing reply. Mark Shock used on the first critical Strike even when the opposing pool is empty.

## Required feedback
Expose original and replacement reroll results, token expenditure, final normal/critical classification, Rending's promoted die, and Shock's cancelled die. Explain disabled Block permissions with the relevant trait. Example messages: “5: critical, Lethal 5+”; “Critical required to Block: Brutal”; “Rending: normal upgraded”; “Shock: normal removed.” No silent trait processing.

## Edge cases
- Rerolling away the only natural critical means Rending cannot trigger unless another final critical exists.
- A Command reroll that creates a critical may enable Rending.
- Cannot Command-reroll a die already rerolled by Balanced/Ceaseless, even if it failed again.
- A die rerolled into another chosen Ceaseless face is not recursively rerolled.
- A critical Block cancels one success, never two normals.
- Normal successes are not defence dice. No Shoot blocking combination applies.
- A valid Command choice consumes one token and sets commandUsedThisBout atomically. A duplicate request returns its original receipt; a new second-use request is rejected. Next bout clears the flag but does not replenish tokens.
- No extra rules, including Punishing, Severe, Devastating, Stun or armour, are implicit in a champion's theme.
