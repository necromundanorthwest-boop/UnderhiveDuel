# Known issues and deliberate alpha limits

## Release 0.2.0 verification

- 53 automated rules, asset, transport and multiplayer tests pass locally.
- Release gates now pass in GitHub CI on Node 22: 53 tests, all four browser widths, 60 states in both orientations, six browser matches/rematches, reconnection and Docker build/start/health. Local runtime installation blockers were resolved by using CI. Public deployment checks are handled by the Live release verification workflow. See SUBMISSION_RELEASE_REVIEW.md.
- Physical-device, 200% text and wider accessibility testing remain outside the completed evidence.
- Pitjack remains strong in the documented all-Strike policy screen; Ironhaul mirrors have low O.O.A. frequency. See ROSTER_EXPANSION_BALANCE.md. These are explicit limitations, not a claim of optimal-play balance.

## Implemented MVP limits

- Polling introduces up to approximately one second of update latency, plus network delay. Disconnect detection uses an eight-second heartbeat lease, followed by the frozen 60-second grace.
- Browser background-tab throttling or a sleeping phone can trigger that disconnect policy. Reconnection restores state within the grace period; it does not award a timeout victory.
- A process restart/deploy loses live matches. There is no SQL or durable match storage, per scope. Clients display a room-expired/restarted error.
- Exactly one server instance is required. Multiple independent replicas are unsupported.
- The ten atlases and background are image-heavy and currently preload before entry. Slow connections may wait longer on first load. No frozen image bytes were recompressed or replaced.
- Reload restores a seat only in its original sessionStorage context. A room code alone does not recover a lost token. A valid replacement connection invalidates the older one.
- Simultaneous commands can cause an honest stale-version rejection; the refreshed UI lets the player review and resubmit. Ambiguous network failures keep the same action envelope for Retry.
- Maximum 200 rooms; room creation limited to 20 per socket IP per minute. A proxy may aggregate that rate limit across users.
- Same-device local mode intentionally has no persistence and no AI. Its handoff screen protects casual viewing, not a malicious user with browser developer tools; remote secrecy is enforced server-side.

No original-six balance adjustments, new mechanics, accounts, matchmaking, progression, chat, spectators or permanent match history were added. Matchup completion tests are correctness fixtures, not balance evidence.
