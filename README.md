# Underhive Duel

**Underhive Duel** is a fast two-player browser dice duel. Choose one of six original champions, lock hidden rerolls, strike or block, manage limited Command rerolls, and race to three bout wins.

The reviewed **Stage 3 public-alpha candidate is now imported into this repository**. The canonical gameplay authority is the Node server; the browser client does not resolve authoritative dice independently.

## Public-alpha architecture

- two remote human players
- room-code multiplayer
- server-authoritative match state and RNG
- six frozen champions
- one Node service instance
- in-memory live rooms for the MVP
- no accounts, matchmaking, database, or persistence across server restarts
- static browser client served by the same Node service

## Local run

Requires Node.js 22+.

```bash
npm install
npm test
npm start
```

Then open:

```text
http://localhost:3000
```

## Public deployment

The intended public-alpha target is a single Render **Web Service**, not a Static Site.

- Runtime: Docker
- Branch: `main`
- Instances: 1
- Health check: `/health`
- Persistent disk: none
- Environment secrets: none required

The included `render.yaml` encodes this topology.

## Current release gate

The Stage 3 source package reports 48 automated tests passing. Repository CI additionally verifies:

- the Node test suite;
- Playwright browser smoke/responsive checks;
- Docker image construction;
- container startup;
- `/health` response.

A real two-device smoke test remains required before calling the public alpha fully validated.

## Open source

Source code and repository documentation are distributed under the MIT License. Original project assets are included for the public alpha; provenance and reuse terms should be reviewed before downstream redistribution beyond this repository.
