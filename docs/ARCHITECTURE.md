# Minimal live room authority

The client is static HTML/CSS/ES modules with the supplied PNG/SVG assets. A single dependency-free Node process serves it and a JSON room API. The rules engine is shared code; **only server instances of the engine are authoritative for remote play**. Clients can inspect the rules, but cannot supply faces, damage, scores, traits, winners or champion statistics.

## State and serialization

Every room holds two private 192-bit seat tokens, connection IDs, one match, sealed choices and command receipts in memory. All validation and state commits execute synchronously without an intervening await. Transition functions clone the input, validate first and return the new state. Rejected actions cannot mutate the old state or consume randomness. Server dice use `crypto.randomInt(1,7)`; the seeded generator is used only by tests and the explicit local mode.

A command carries `matchId`, `actionId`, `expectedVersion` and an allowlisted action. Receipts are keyed by seat and action ID. Canonical payload equality makes an identical retry safe and rejects a conflicting reuse. Receipt metadata retains the original committed match/version; the response also provides a fresh authorized snapshot. Previous-match receipts survive a rematch so an ambiguous final rematch retry cannot create a second match. They are bounded between matches; all live-match receipts remain available.

## Endpoints

| Method | Path | Meaning |
|---|---|---|
| POST | `/api/rooms` | Create room; issue seat 1 credential |
| POST | `/api/rooms/CODE/join` | Claim vacant seat 2 |
| POST | `/api/rooms/CODE/connect` | Authenticate seat; replace old connection |
| GET | `/api/rooms/CODE/state` | Authorized view and heartbeat |
| POST | `/api/rooms/CODE/command` | Submit versioned intent |
| POST | `/api/rooms/CODE/disconnect` | Explicit connection close |
| GET | `/health` | Versioned health response |

Seat tokens travel in the Authorization header, never in URLs. Connection IDs use `X-Connection`. State/command responses use `Cache-Control: no-store`. Browser cross-origin requests are rejected. Tokens are kept in sessionStorage only to reconnect that tab; no game state is stored in browser persistence.

## Transport and disconnects

Clients poll once per second. This deliberately uses ordinary HTTP rather than a WebSocket dependency. The authoritative state is sent only to its authenticated seat. A connection with no successful heartbeat for eight seconds is observed as disconnected. **The frozen 60-second grace begins at that observation**, or immediately on an explicit disconnect; a second disconnect never resets it. Reconnect restores the exact phase, sealed choices, dice and resources. Game commands are rejected while paused; explicitly leaving ends the match without a winner.

At expiry the room becomes ABANDONED with no competitive result. A replacement connection invalidates the previous connection ID. A terminal room is retained 15 minutes; an inactive pre-match room is retained 15 minutes. There is no tactical decision timer and no automatic gameplay action. Service restart recovery is intentionally outside the MVP.

## Capacity and deployment

Default maximum is 200 live/retained rooms. Room creation is limited to 20 per socket IP per minute; reverse-proxy deployments may aggregate this limit. Do not add replicas or use a host that routes requests to independent processes. Managed HTTPS should terminate in front of the one Node instance. No database or disk is used.

The available Sites manifest documents D1/R2 and stateless Worker output, but no shared room process or Durable Object binding. A per-isolate room map would be unreliable across remote requests, so that substitute was rejected. The Node implementation is portable to a suitable single-instance host. No host credentials or runtime secrets are bundled.
