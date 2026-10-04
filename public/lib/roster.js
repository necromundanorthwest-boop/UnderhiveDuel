const data = {
  "schemaVersion": 1,
  "rulesVersion": "0.1.0",
  "status": "frozen",
  "champions": [
    {
      "id": "bastion",
      "name": "Bastion",
      "wounds": 14,
      "weapon": {
        "name": "Foundry blade",
        "attackDice": 4,
        "hitThreshold": 3,
        "normalDamage": 4,
        "criticalDamage": 5,
        "trait": {
          "id": "balanced"
        }
      }
    },
    {
      "id": "slagjaw",
      "name": "Slagjaw",
      "wounds": 16,
      "weapon": {
        "name": "Breaker maul",
        "attackDice": 4,
        "hitThreshold": 4,
        "normalDamage": 4,
        "criticalDamage": 6,
        "trait": {
          "id": "brutal"
        }
      }
    },
    {
      "id": "vesper",
      "name": "Vesper",
      "wounds": 11,
      "weapon": {
        "name": "Filament sabre",
        "attackDice": 5,
        "hitThreshold": 3,
        "normalDamage": 3,
        "criticalDamage": 4,
        "trait": {
          "id": "lethal",
          "threshold": 5
        }
      }
    },
    {
      "id": "guttermaw",
      "name": "Guttermaw",
      "wounds": 14,
      "weapon": {
        "name": "Hooked talons",
        "attackDice": 5,
        "hitThreshold": 4,
        "normalDamage": 4,
        "criticalDamage": 5,
        "trait": {
          "id": "ceaseless"
        }
      }
    },
    {
      "id": "rivet",
      "name": "Rivet",
      "wounds": 12,
      "weapon": {
        "name": "Arc baton",
        "attackDice": 4,
        "hitThreshold": 3,
        "normalDamage": 4,
        "criticalDamage": 5,
        "trait": {
          "id": "shock"
        }
      }
    },
    {
      "id": "cinder",
      "name": "Cinder",
      "wounds": 13,
      "weapon": {
        "name": "Split-edge cleaver",
        "attackDice": 5,
        "hitThreshold": 4,
        "normalDamage": 4,
        "criticalDamage": 5,
        "trait": {
          "id": "rending"
        }
      }
    }
  ]
}
;
export const rulesVersion = data.rulesVersion;
export const champions = Object.freeze(data.champions.map(c => Object.freeze(c)));
export const roster = Object.fromEntries(champions.map(c => [c.id,c]));
