# Contributing to Underhive Duel

Underhive Duel is currently a bounded public-alpha project.

## Development principles

- Preserve server-authoritative match state and RNG.
- Keep one authoritative Node process for the MVP.
- Do not add accounts, matchmaking, campaign progression, or persistence without a separate approved scope.
- Keep gameplay-rule changes separate from visual, accessibility, deployment, or reliability fixes.
- Preserve the frozen Stage 3 rules and visual authority files unless an explicit later stage supersedes them.

## Pull requests

Keep pull requests narrow and include:
1. the problem being addressed;
2. the smallest proposed change;
3. tests for changed behavior;
4. confirmation that server authority is preserved;
5. documentation changes for user-visible behavior.

Do not include third-party copyrighted art, logos, rules text, or proprietary assets without clear redistribution rights.
