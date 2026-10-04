# Underhive Duel

**Underhive Duel** is a fast two-player browser dice duel. Choose one of six original champions, lock hidden rerolls, strike or block, manage limited Command rerolls, and race to three bout wins.

This repository is being prepared from the reviewed Stage 3 public-alpha candidate. The canonical gameplay authority is the Node server; the browser client never resolves authoritative dice independently.

## Public-alpha architecture

- two remote human players
- room-code multiplayer
- server-authoritative match state and RNG
- one Node service instance
- in-memory live rooms for the MVP
- no accounts, matchmaking, database, or persistence across server restarts
- static browser client served by the same Node service

## Deployment target

The intended public-alpha deployment is a single Render **Web Service**, not a Static Site.

After the Stage 3 package is imported, use the included `render.yaml` and `docs/DEPLOYMENT.md` to deploy and validate the public alpha.
