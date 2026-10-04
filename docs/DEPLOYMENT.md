# Deployment handoff — not published

**No public test URL exists for this candidate.** Two requirements still block publication: a supported shared-room host and passing browser/two-device evidence. The provided source can run now on a local Node installation.

## Minimal deployment configuration

Use a managed HTTPS web service with exactly one continuously running instance:

- Runtime: Node 22 or newer, or the supplied Dockerfile.
- Build command: none (there are no application dependencies or generated bundles).
- Start command: `npm start`, equivalent to `node server/http.js`.
- Listen address: `0.0.0.0`.
- Port: platform-supplied `PORT`, otherwise 3000.
- Health path: `/health`.
- Instance count: one; no autoscaling.
- Persistent disk/database: none.
- Required secrets: none.
- Client and `/api`: same origin.

Docker alternative:

```sh
docker build -t underhive-duel-alpha .
docker run --rm -p 3000:3000 -e PORT=3000 underhive-duel-alpha
```

The Docker recipe is supplied but was not executed in this environment. The native Node service was executed by integration tests.

Before public deployment, complete the browser test and two-device checklist. Repeat a create/join/full-match/rematch smoke on the intended HTTPS staging host, confirm it uses one instance, then make the tested alpha publicly reachable. A deployment restarts the service and loses any current rooms; perform it outside live test matches.

## Why Sites was not used for a misleading partial release

The accessible Sites hosting workflow does not document a way to provision this service's shared room authority. Its supported stateless Worker/static paths do not guarantee that two players hit the same room state. No SQL workaround was added, and no unsupported Durable Object binding was invented. Publishing only the static client would fail the requested remote multiplayer deliverable.

Separately, the requested pre-publication browser gate could not be executed: Chromium is absent and its download failed. The managed preview instructions require an unavailable browser-control skill. This is an infrastructure limitation, not evidence that the page passes browser acceptance.
