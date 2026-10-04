# Known issues and deliberate alpha limits

## Unresolved acceptance blockers

1. No public test URL: a compatible single-instance Node host has not been provisioned.
2. Browser responsive checks and physical two-device smoke are not executed. The supplied browser harness was blocked before launch by the missing Chromium executable; its download failed. UI correctness must not be inferred from passing engine/HTTP tests.
3. Keyboard, touch, 200% text, reduced-motion and real-device sprite presentation remain unverified in a browser. The diagnostic crop sheet and numerical anchor/bounds checks passed.
4. The Docker recipe is supplied but unexecuted; native Node execution passed.

## Implemented MVP limits

- Polling introduces up to approximately one second of update latency, plus network delay. Disconnect detection uses an eight-second heartbeat lease, followed by the frozen 60-second grace.
- Browser background-tab throttling or a sleeping phone can trigger that disconnect policy. Reconnection restores state within the grace period; it does not award a timeout victory.
- A process restart/deploy loses live matches. There is no SQL or durable match storage, per scope. Clients display a room-expired/restarted error.
- Exactly one server instance is required. Multiple independent replicas are unsupported.
- The six unchanged atlases and background total roughly 14 MiB and currently preload before entry. Slow connections may wait longer on first load. No frozen image bytes were recompressed or replaced.
- Reload restores a seat only in its original sessionStorage context. A room code alone does not recover a lost token. A valid replacement connection invalidates the older one.
- Simultaneous commands can cause an honest stale-version rejection; the refreshed UI lets the player review and resubmit. Ambiguous network failures keep the same action envelope for Retry.
- Maximum 200 rooms; room creation limited to 20 per socket IP per minute. A proxy may aggregate that rate limit across users.
- Same-device local mode intentionally has no persistence and no AI. Its handoff screen protects casual viewing, not a malicious user with browser developer tools; remote secrecy is enforced server-side.

No balance adjustments, new mechanics, accounts, matchmaking, progression, chat, spectators or permanent match history were added. Matchup completion tests are correctness fixtures, not balance evidence.
